import React, { useLayoutEffect, useState, useEffect, useCallback, useRef } from "react";
import {
  createStyles,
  Container,
  Group,
  Button,
  Input,
  NativeSelect,
  NumberInput,
  TextInput,
  Text,
} from "@mantine/core";

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

    "&:hover": {
      background: theme.colors.darktheme[4],
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
    "&:hover": {
      background: theme.colors.darktheme[4],
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
   

    [theme.fn.smallerThan('md')]:{
      flexDirection: 'column',
    }
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
    marginTop: `${theme.spacing.xs}px`,
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
  },
  app:{
    display: 'flex',
    width: '100vw',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  appVideo:{
    display: 'flex',
    alignItems: 'center',
  },
  canvas:{
    position: 'absolute',
    top: '100px',
  }
}));

const Documents = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const { classes, cx } = useStyles();
  const [Image, setImage] = useState("");
  const ShowNavbar = useSelector((state) => state.navbar.show);
  const [RegisterButtonClick, setRegisterButtonClick] = useState(false);
  const [FaceRecognitionButtonClick, setFaceRecognitionButtonClick] = useState(false);
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
        />
      </Container>
      {RegisterButtonClick && (
        <Container className={classes.registercontainer} fluid="true">
          <Group direction="column">
            <WebCamera
              ShowNavbar={ShowNavbar}
              cx={cx}
              setImage={setImage}
              classes={classes}
            />
          </Group>
          <Group className={classes.registerform}>
            <RegisterForm classes={classes} Image={Image} />
          </Group>
        </Container>
      )}
      {FaceRecognitionButtonClick &&(
        <Container className={classes.registercontainer} fluid="true">
          <Group direction='column'>
            <FaceRecognitionWebCam ShowNavbar={ShowNavbar} cx={cx} classes={classes}/>
          </Group>
        </Container>
      )}
    </div>
  );
};

const Buttons = ({
  classes,
  setRegisterButtonClick,
  RegisterButtonClick,
  FaceRecognitionButtonClick,
  setFaceRecognitionButtonClick,
}) => {
  return (
    <Group className={classes.group} direction="row">
      <Button
        variant="light"
        size="sm"
        className={classes.button}
        onClick={() => setRegisterButtonClick(!RegisterButtonClick)}
      >
        {RegisterButtonClick ? "Close" : "Register a Person"}
      </Button>
      <Button
        variant="light"
        size="sm"
        className={classes.button2}
        onClick={() => setFaceRecognitionButtonClick(!FaceRecognitionButtonClick)}
      >
        Start Face Recognition
      </Button>
    </Group>
  );
};

const WebCamera = ({ setImage, cx, classes, ShowNavbar }) => {
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
      <Webcam
        audio={false}
        height={360}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
      />
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
        <Container classes={classes.noimage} fluid="true">
          <Text>No image</Text>
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
        radius="sm"
        label="Select the area"
        required
      />
    </Container>
  );
};

const FaceRecognitionWebCam = ({ classes, ShowNavbar,cx }) => {
  const { width } = useViewportSize();
  const FacewebcamRef = useRef(null);
  const canvasRef = useRef();
  const videoRef = useRef();
   const FacevideoConstraints = {
     width: 380,
     height: 360,
     facingMode: "user",
   };

  //  useEffect(()=>{    
  //    const loadModels = async ()=>{
  //     Promise.all([
  //       faceapi.nets.tinyFaceDetector.loadFromUri("../../public/models"),
  //       faceapi.nets.faceLandmark68Net.loadFromUri("../../public/models"),
  //       faceapi.nets.faceRecognitionNet.loadFromUri("../../public/models"),
  //       faceapi.nets.faceExpressionNet.loadFromUri("../../public/models"),
  //     ]).then(startVideo);
  //    }
  //    loadModels();
  //  },[])
   


  //  const startVideo = () => {
  //    navigator.mediaDevices
  //      .getUserMedia({ video: true })
  //      .then((currentStream) => {
  //        videoRef.current.srcObject = currentStream;
  //      })
  //      .catch((err) => console.log(err));
  //  };

  //  const handleVideoOnplay = async ()=>{
  //   const detections = await faceapi
  //       .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceExpressions();
  //       console.log(detections);
  //  }


  //  const FaceDetection = async ()=>{
  //   setInterval(async ()=>{
     
  //     console.log(detections);

  //     canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
  //       videoRef.current
  //     );
  //     faceapi.matchDimensions(canvasRef.current, { width: 940, height: 650 });

  //     const resized = faceapi.resizeResults(detections, {
  //       width: 940,
  //       height: 650,
  //     });
  //     // to draw the detection onto the detected face i.e the box
  //     faceapi.draw.drawDetections(canvasRef.current, resized);

  //     //to draw the the points onto the detected face
  //     faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

  //     //to analyze and output the current expression by the detected face
  //     faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
  //   },1000);
  //  }






  




  // const Facecapture = useCallback(() => {
  //   const FaceimageSrc = webcamRef.current.getScreenshot();
  //   setImage(imageSrc);
  // }, [FacewebcamRef]);
  return (
    <Container
      className={cx(classes.cameracontainer, {
        [classes.cameracontainermargin]: !ShowNavbar && width > 768,
      })}
      fluid="true"
    >
     
      <div className={classes.app}>
      <div className={classes.appVideo}>
      <video crossOrigin="anonymous" ref={videoRef} autoPlay muted height="200" width="200"></video>
      </div>
      <canvas  className={classes.canvas} ref={canvasRef} width="940" height="650"/>
      </div>
    </Container>
  );
};

export default Documents;
