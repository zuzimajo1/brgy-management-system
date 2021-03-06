import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { createStyles, Container, Group, Button, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSelector, useDispatch } from "react-redux";
import { DisplayData, FaceRecognitionWebCam, RegisterForm, WebCamera } from "../Components";
import { DataDisplayClose } from "../redux/FaceRecognitionRedux";


const useStyles = createStyles((theme) => ({
  root: {
    fontFamily: "Regular",
    width: "100%",
    height: "100vh",
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
  registercontainer: {
    width: "100%",
    height: "85vh",
    marginTop: `${theme.spacing.md}px`,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },
  hidden: {
    display: "none",
  },

  noimage: {
    width: "150px",
    height: "150px",
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
  textnotif: {
    fontFamily: "Bold",
  },
}));

const Documents = () => {
  const { classes, cx } = useStyles();
  const videoRef = useRef();
  const [Image, setImage] = useState("");
  const { singlepersondata } = useSelector((state) => state.facerecog);
  const [RegisterButtonClick, setRegisterButtonClick] = useState(false);
  const [FaceRecognitionButtonClick, setFaceRecognitionButtonClick] =
    useState(false);
  const dispatch = useDispatch();

  const CloseWebCam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    dispatch(DataDisplayClose());
  };

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
          dispatch={dispatch}
        />
      </Container>
      {RegisterButtonClick && !FaceRecognitionButtonClick && (
        <Container className={classes.registercontainer} fluid="true">
          <Group direction="column">
            <WebCamera setImage={setImage} Image={Image} />
          </Group>
          <Group direction="column">
            <RegisterForm Image={Image} />
          </Group>
        </Container>
      )}
      {FaceRecognitionButtonClick && !RegisterButtonClick && (
        <Container className={classes.registercontainer} fluid="true">
          <Group direction="column">
            <FaceRecognitionWebCam
              videoRef={videoRef}
              singlepersondata={singlepersondata}
            />
          </Group>
          <Group direction="column">
            <DisplayData />
          </Group>
        </Container>
      )}
      <Container
        className={cx(classes.containernotif, {
          [classes.hidden]: FaceRecognitionButtonClick || RegisterButtonClick,
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
  dispatch,
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
        onClick={() =>
          !FaceRecognitionButtonClick &&
          setRegisterButtonClick(!RegisterButtonClick)
        }
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
          if (!RegisterButtonClick) {
            setFaceRecognitionButtonClick(!FaceRecognitionButtonClick);
            dispatch(DataDisplayClose());
          }
          FaceRecognitionButtonClick && CloseWebCam();
        }}
      >
        {FaceRecognitionButtonClick ? "Close" : "Start Face Recognition"}
      </Button>
    </Group>
  );
};

export default Documents;
