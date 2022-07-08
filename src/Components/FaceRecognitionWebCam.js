import React, { useRef, useState, useEffect } from "react";
import { Container, createStyles } from "@mantine/core";
import * as faceapi from "face-api.js";

const useStyles = createStyles((theme) => ({
  cameracontainer: {
    width: "450px",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  displayFlex: {
    display: "flex",
  },
  PositionAbsolute: {
    position: "absolute",
  },
}));

const FaceRecognitionWebCam = ({ videoRef }) => {
  const { classes } = useStyles();
  const [initializing, setInitializing] = useState(false);


  const canvasRef = useRef();
  const videoHeight = 320;
  const videoWidth = 320;

  const FacevideoConstraints = {
    width: 380,
    height: 360,
    facingMode: "user",
  };

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

      const resizeDetections = faceapi.resizeResults(detection, displaySize);
      console.log(resizeDetections);
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
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: text,
        });
        drawBox.draw(canvasRef.current);
      });
    }, 5000);
  };

  const loadLabeledImages = () => {
    const labels = ["Zuzim Ajo", "Dandy Pandili"];
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
      <span>{initializing ? "Initializing" : "Ready"}</span>
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
