import React,{useLayoutEffect, useRef, useState, useEffect} from 'react'
import { createStyles, Container, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import * as faceapi from "face-api.js";
const useStyles = createStyles((theme) => ({
  container: {
    fontFamily: "Regular",
    width: "100%",
    height: `100vh`,
    borderRadius: `20px`,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    transition: "ease-in-out 500ms",
  },
  displayFlex:{
    display: 'flex',

  },
  justifyContentCenter:{
    justifyContent: 'center',
  },
  PositionAbsolute:{
    position: 'absolute',
  }
}));



const Events = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const { classes } = useStyles();
  useLayoutEffect(() => {
    scrollTo({ y: 0 });
  }, []);

    const videoRef = useRef();
    const canvasRef = useRef();
    const videoHeight = 380;
    const videoWidth = 360;

    const [initializing, setInitializing] = useState(false);

    useEffect(() => {
      const loadModels = async () => {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        setInitializing(true);
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]).then(() => {
          startVideo();
          console.log(faceapi.nets);
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
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizeDetections = faceapi.resizeResults(detection, displaySize);
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, videoWidth, videoHeight);
        faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);
        console.log(detection);
      }, 180);
    };
  return (
    <div className={classes.container}>
      <span>{initializing ? "Initializing" : "Ready"}</span>
      <div className={classes.displayFlex}>
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
    </div>
  );
}

export default Events