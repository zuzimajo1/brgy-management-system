import React, { useRef, useState, useEffect } from "react";
import { Container, createStyles, Text } from "@mantine/core";
import * as faceapi from "face-api.js";
import { showNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import { GetFaceRecognitionData } from "../redux/apiCalls";
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
}));

const FaceRecognitionWebCam = ({ videoRef, singlepersondata }) => {
  const { classes } = useStyles();
  const [initializing, setInitializing] = useState(false);
  const residents = useSelector((state) => state.masterlist.residents);
  console.log(singlepersondata);
  const dispatch = useDispatch();

  const canvasRef = useRef();
  const videoHeight = 360;
  const videoWidth = 420;

  useEffect(() => {
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
        video: true,
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
      results.forEach((bestMatch, i) => {
        const box = resizeDetections[i].detection.box;
        const text = bestMatch.toString();
        console.log(text);

        const firstname = text && text.split(" ")[0];
        const lastname = text && text.split(" ")[1];

        firstname === "unknown"
          ? showNotification({
              title: "Unrecognized person",
              message: "Please register to recognized the person",
            })
          : GetFaceRecognitionData(
              dispatch,
              firstname,
              lastname,
              showNotification
            );

        const drawBox = new faceapi.draw.DrawBox(box, {
          label: text,
        });
        drawBox.draw(canvasRef.current);
      });
    }, 5000);
  };

  const loadLabeledImages = () => {
    const labels = [
      ...new Set(
        residents.map((items) => `${items.firstname} ${items.lastname}`)
      ),
    ];

    return Promise.all(
      labels.map(async (label) => {
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

  return (
    <Container className={classes.cameracontainer} fluid="true">
      <Text size="lg">
        {initializing ? "Initializing... Please Wait" : "Ready"}
      </Text>
      <div className={classes.displayFlex} id="container">
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
    </Container>
  );
};

export default FaceRecognitionWebCam;
