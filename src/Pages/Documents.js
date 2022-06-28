import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  createStyles,
  Container,
  Group,
  Button,
  NativeSelect,
  NumberInput,
  TextInput,
  Text,
  Loader
} from "@mantine/core";
import * as faceapi from "face-api.js";

import { useWindowScroll, useViewportSize } from "@mantine/hooks";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { Capture, ArrowBack } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
  root: {
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
  button: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[6]
        : theme.colors.lighttheme[3],
    color: theme.colors.lighttheme[0],
    transition: "ease-in-out 500ms",
    width: "150px",

    "&:hover": {
      background: theme.colors.darktheme[0],
    },
  },
  button2: {
    marginLeft: `${theme.spacing.sm}px`,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[6]
        : theme.colors.lighttheme[3],
    color: theme.colors.lighttheme[0],
    transition: "ease-in-out 500ms",
    width: "180px",

    "&:hover": {
      background: theme.colors.darktheme[0],
    },
  },
  group: {
    padding: `0 ${theme.spacing.sm}px`,
  },
  cameracontainer: {
    width: `420px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cameracontainermargin: {
    margin: `0 5rem`,
    width: `420px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  registercontainer: {
    width: "100%",
    height: "70vh",
    marginTop: `${theme.spacing.md}px`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },
  registercontainerhidden: {
    display: "none",
  },
  buttoncapture: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[7]
        : theme.colors.lighttheme[5],
    color: theme.colors.lighttheme[0],
    width: "130px",
    border: "none",
    transition: `ease-in-out 500ms`,

    "&:hover": {
      color: theme.colors.lighttheme[0],
      background:
        theme.colorScheme === "dark"
          ? theme.colors.lighttheme[5]
          : theme.colors.darktheme[7],
    },
  },
  buttonreset: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[8]
        : theme.colors.lighttheme[6],
    color: theme.colors.lighttheme[0],
    width: "130px",
    border: "none",
    transition: `ease-in-out 500ms`,

    "&:hover": {
      color: theme.colors.lighttheme[0],
      background:
        theme.colorScheme === "dark"
          ? theme.colors.lighttheme[6]
          : theme.colors.darktheme[8],
    },
  },
  buttonscontainer: {
    marginTop: `${theme.spacing.md}px`,
    width: `100%`,
    display: "flex",
    justifyContent: "space-evenly",
  },
  registerform: {
    width: `100%`,
    height: `70vh`,
    marginLeft: `${theme.spacing.md}px`,
  },
  textinputs: {
    width: `100%`,
  },
  formcontainer: {
    width: `80%`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  noimage: {
    width: `150px`,
    height: `150px`,
    border: `1px dashed ${theme.colors.lighttheme[1]}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  app: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appVideo: {
    display: "flex",
    alignItems: "center",
  },
  canvas: {
    position: "absolute",
    top: "100px",
  },
  containernotif: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80vh",
  },
  containernotifhidden: {
    display: "none",
  },
  textnotif: {
    fontFamily: "Bold",
  },
  webcamcontainer: {
    width: "380px",
    height: "360px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: `100px`,
  },
  displayFlex: {
    display: "flex",
  },
  PositionAbsolute: {
    position: "absolute",
  },
}));

const Documents = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const { classes, cx } = useStyles();
  const videoRef = useRef();
  const [Image, setImage] = useState("");
  const ShowNavbar = useSelector((state) => state.navbar.show);
  const [RegisterButtonClick, setRegisterButtonClick] = useState(false);
  const [FaceRecognitionButtonClick, setFaceRecognitionButtonClick] =
    useState(false);

  const CloseWebCam = ()=>{
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
  }

  useLayoutEffect(() => {
    scrollTo({ y: 0 });
  }, []);

  return (
    <div className={classes.root}>
      <Container fluid="true" pt="lg">
        <Buttons
          setRegisterButtonClick={setRegisterButtonClick}
          RegisterButtonClick={RegisterButtonClick}
          FaceRecognitionButtonClick={FaceRecognitionButtonClick}
          setFaceRecognitionButtonClick={setFaceRecognitionButtonClick}
          classes={classes}
          CloseWebCam={CloseWebCam}
        />
      </Container>
      {(RegisterButtonClick && !FaceRecognitionButtonClick) && (
        <Container className={classes.registercontainer} fluid="true">
          <Group direction="column">
            <WebCamera
              ShowNavbar={ShowNavbar}
              cx={cx}
              setImage={setImage}
              Image={Image}
              classes={classes}
            />
          </Group>
          <Group className={classes.registerform}>
            <RegisterForm classes={classes} Image={Image} />
          </Group>
        </Container>
      )}
      {(FaceRecognitionButtonClick && !RegisterButtonClick) && (
        <Container className={classes.registercontainer} fluid="true">
          <Group direction="column">
            <FaceRecognitionWebCam
              ShowNavbar={ShowNavbar}
              cx={cx}
              classes={classes}
              videoRef={videoRef}
            />
          </Group>
        </Container>
      )}
      <Container
        className={cx(classes.containernotif, {
          [classes.containernotifhidden]:
            FaceRecognitionButtonClick || RegisterButtonClick,
        })}
        fluid="true"
      >
        <Text className={classes.textnotif} size="md" transform="capitalize">
          Please Press a Button
        </Text>
      </Container>
    </div>
  );
};

const Buttons = ({
  classes,
  setRegisterButtonClick,
  RegisterButtonClick,
  FaceRecognitionButtonClick,
  setFaceRecognitionButtonClick,
  CloseWebCam,
}) => {
  return (
    <Group className={classes.group} direction="row">
      <Button
        variant="light"
        size="sm"
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? RegisterButtonClick
                ? theme.colors.darktheme[0]
                : theme.colors.darktheme[6]
              : RegisterButtonClick
              ? theme.colors.darktheme[0]
              : theme.colors.lighttheme[3],
        })}
        className={classes.button}
        onClick={() => !FaceRecognitionButtonClick &&  setRegisterButtonClick(!RegisterButtonClick)}
      >
        {RegisterButtonClick ? "Close" : "Register a Person"}
      </Button>
      <Button
        variant="light"
        size="sm"
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? FaceRecognitionButtonClick
                ? theme.colors.darktheme[0]
                : theme.colors.darktheme[6]
              : FaceRecognitionButtonClick
              ? theme.colors.darktheme[0]
              : theme.colors.lighttheme[3],
        })}
        className={classes.button2}
        onClick={() => {
          !RegisterButtonClick && setFaceRecognitionButtonClick(!FaceRecognitionButtonClick);
          FaceRecognitionButtonClick && CloseWebCam();
          }
        }
      >
        {FaceRecognitionButtonClick ? "Close" : "Start Face Recognition"}
      </Button>
    </Group>
  );
};

const WebCamera = ({ Image, setImage, cx, classes, ShowNavbar }) => {
  const { width } = useViewportSize();
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: 380,
    height: 360,
    facingMode: "user",
  };
  return (
    <Container
      className={cx(classes.cameracontainer, {
        [classes.cameracontainermargin]: !ShowNavbar && width > 768,
      })}
      fluid="true"
    >
      {Image ? (
        <Container className={classes.webcamcontainer} fluid="true">
        <Text>Press Reset to Open</Text>
        </Container>
      ) : (
        <Webcam
          audio={false}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={true}
        />
      )}
      <Group direction="row" className={classes.buttonscontainer}>
        <Button
          leftIcon={<Capture size={18} strokeWidth={2} />}
          variant="default"
          onClick={capture}
          className={classes.buttoncapture}
        >
          Capture
        </Button>
        <Button
          leftIcon={<ArrowBack size={18} strokeWidth={2} />}
          variant="default"
          onClick={() => setImage(null)}
          className={classes.buttonreset}
        >
          Reset
        </Button>
      </Group>
    </Container>
  );
};

const RegisterForm = ({ classes, Image }) => {
  const areas = [
    "Sitio Looc",
    "Sitio Bernadette",
    "Sitio Payawan 1",
    "Sitio Payawan 2",
    "Sitio Central Poblacion",
    "Sitio Bacud",
    "Sitio Toril",
    "Sitio San Vicente",
  ];

  return (
    <Container fluid="true" className={classes.formcontainer}>
      {Image ? (
        <img src={Image} alt="screenshotpicture" width="150" height="150"></img>
      ) : (
        <Container className={classes.noimage} fluid="true">
          <Text align="center" size="md">
            No image
          </Text>
        </Container>
      )}

      <TextInput
        className={classes.textinputs}
        label="Name"
        radius="sm"
        required
      />
      <TextInput
        className={classes.textinputs}
        label="MiddleName"
        radius="sm"
        required
      />
      <TextInput
        className={classes.textinputs}
        label="Surname"
        radius="sm"
        required
      />
      <NumberInput
        className={classes.textinputs}
        label="Age"
        radius="sm"
        required
      />
      <NativeSelect
        className={classes.textinputs}
        data={areas}
        placeholder="Select one"
        radius="sm"
        label="Select the area"
        required
      />
      <Button className={classes.registerbutton} variant='filled'>Button</Button>
    </Container>
  );
};

const FaceRecognitionWebCam = ({ classes, ShowNavbar, cx, videoRef }) => {
  const { width } = useViewportSize();
  const [initializing, setInitializing] = useState(false);
  const FacewebcamRef = useRef(null);

  const canvasRef = useRef();
  const videoHeight = 380;
  const videoWidth = 360;

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
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
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
    }, 2000);
  };

  return (
    <Container
      className={cx(classes.cameracontainer, {
        [classes.cameracontainermargin]: !ShowNavbar && width > 768,
      })}
      fluid="true"
    >
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
    </Container>
  );
};

export default Documents;
