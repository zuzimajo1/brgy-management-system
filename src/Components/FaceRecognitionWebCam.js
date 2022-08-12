import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Container, createStyles, Text, Button } from "@mantine/core";
import * as faceapi from "face-api.js";
import { showNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import { GetFaceRecognitionData } from "../redux/apiCalls";
import { DataDisplayClose } from "../redux/FaceRecognitionRedux";
const useStyles = createStyles((theme) => ({
  cameracontainer: {
    width: "100%",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  displayFlex: {
    display: "flex",
  },
  PositionAbsolute: {
    position: "absolute",
  },
  message: {
    alignSelf: "center",
  },
  openbutton: {
    width: "160px",
    cursor: "pointer",
  },
  cameraclosed: {
    display: "flex",
    width: "400px",
    height: "500px",
    justifyContent: "center",
    alignItems: "center",
  },
  resetbutton: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[8]
        : theme.colors.lighttheme[6],
    color: theme.colors.lighttheme[0],
    width: "130px",
    border: "none",
    transition: `ease-in-out 500ms`,
    cursor: "pointer",

    "&:hover": {
      color: theme.colors.lighttheme[0],
      background:
        theme.colorScheme === "dark"
          ? theme.colors.lighttheme[6]
          : theme.colors.darktheme[8],
      cursor: "pointer",
    },
  },
  hidden: {
    display: "none",
  },
  buttons: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
}));

const FaceRecognitionWebCam = ({ videoRef, CloseWebCam }) => {
  const { classes, cx } = useStyles();
  const [initializing, setInitializing] = useState(false);
  const [OpenCam, setOpenCam] = useState(true);
  const residents = useSelector((state) => state.masterlist.residents);
  const dispatch = useDispatch();
  const { fetchdata } = useSelector((state) => state.facerecog);
  const canvasRef = useRef();
  const videoHeight = 400;
  const videoWidth = 380;

  useLayoutEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(() => {
        startVideo();
      });
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 380, height: 400 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detection = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();

      if (detection.length >= 2) {
        showNotification({
          title: "One person only",
          message: "The camera detects two faces",
        });
      } else {
      }

      const resizeDetections = faceapi.resizeResults(detection, displaySize);
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);

      faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);

      const labeledDescriptors = await loadLabeledImages();

      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
      const results = resizeDetections.map((fd) =>
        faceMatcher.findBestMatch(fd.descriptor)
      );

      const recognizeName = results[0]?._label;

      if (OpenCam) {
        if (recognizeName) {
          recognizeName === "unknown"
            ? showNotification({
                title: "Unrecognized person",
                message: "Please register to recognized the person",
              })
            : GetFaceRecognitionData(dispatch, recognizeName, showNotification);
        } else {
        }
      } else {
        console.log("none");
      }

      results.forEach((bestMatch, i) => {
        const box = resizeDetections[i].detection.box;
        const text = bestMatch.toString();

        const drawBox = new faceapi.draw.DrawBox(box, {
          label: text,
        });
        drawBox.draw(canvasRef.current);
      });
    }, 5000);
  };

  const loadLabeledImages = () => {
    const labels = [
      ...new Set(residents?.map((items) => `${items?.fullname}`)),
    ];

    return Promise.all(
      labels?.map(async (label) => {
        const PIC_URL = process.env.PUBLIC_URL + "/images";

        const imgUrl = `${PIC_URL}/${label}.jpg`;
        const img = await faceapi.fetchImage(imgUrl);

        const faceDescription = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptor();
        const faceDescriptors = [faceDescription.descriptor];
        return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
      })
    );
  };

  const ClosedCamera = () => {
    CloseWebCam();
    setOpenCam(false);
  };

  const OpenedCamera = () => {
    startVideo();
    setOpenCam(true);
  };

  return (
    <Container className={classes.cameracontainer} fluid="true">
      <Text
        size="lg"
        className={cx(classes.displayFlex, { [classes.hidden]: !OpenCam })}
      >
        {initializing ? "Initializing... Please Wait" : "Ready"}
      </Text>
      <div
        className={cx(classes.displayFlex, { [classes.hidden]: !OpenCam })}
        id="container"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          height={videoHeight}
          width={videoWidth}
          onPlay={handleVideoOnPlay}
        />
        <canvas ref={canvasRef} className={classes.PositionAbsolute} />
      </div>
      <div className={cx(classes.cameraclosed, { [classes.hidden]: OpenCam })}>
        <Text>Camera is close</Text>
      </div>
      <div className={classes.buttons}>
        <Button
          className={classes.openbutton}
          variant="filled"
          onClick={OpenCam ? ClosedCamera : OpenedCamera}
        >
          {OpenCam ? "Close Camera" : "Open Camera"}
        </Button>
        <Button
          className={cx(classes.resetbutton, { [classes.hidden]: !fetchdata })}
          variant="filled"
          onClick={() => dispatch(DataDisplayClose())}
        >
          Reset
        </Button>
      </div>
    </Container>
  );
};

export default FaceRecognitionWebCam;
