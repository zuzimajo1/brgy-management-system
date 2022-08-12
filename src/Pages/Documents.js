import React, { useState, useEffect, useCallback, useRef } from "react";
import { createStyles, Container, Group, Button, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSelector, useDispatch } from "react-redux";
import {
  DirectAccess,
  DisplayData,
  FaceRecognitionWebCam,
  RegisterForm,
  WebCamera,
} from "../Components";
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
  const { singlepersondata } = useSelector((state) => state.facerecog);
  const [RegisterButtonClick, setRegisterButtonClick] = useState(false);
  const [FaceRecognitionButtonClick, setFaceRecognitionButtonClick] =
    useState(false);
  const [AccessDocuments, setAccessDocuments] = useState(false);
  const dispatch = useDispatch();

  const CloseWebCam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
  };

  return (
    <div className={classes.root}>
      <Container fluid="true" pt="lg">
        <Buttons
          setRegisterButtonClick={setRegisterButtonClick}
          RegisterButtonClick={RegisterButtonClick}
          FaceRecognitionButtonClick={FaceRecognitionButtonClick}
          setFaceRecognitionButtonClick={setFaceRecognitionButtonClick}
          AccessDocuments={AccessDocuments}
          setAccessDocuments={setAccessDocuments}
          classes={classes}
          CloseWebCam={CloseWebCam}
          dispatch={dispatch}
        />
      </Container>
      {RegisterButtonClick && !FaceRecognitionButtonClick && !AccessDocuments && (
        <Container className={classes.registercontainer} fluid="true">
          <Group direction="column">
            <WebCamera videoRef={videoRef} />
          </Group>
          <Group direction="column">
            <RegisterForm />
          </Group>
        </Container>
      )}
      {FaceRecognitionButtonClick && !RegisterButtonClick && !AccessDocuments && (
        <Container className={classes.registercontainer} fluid="true">
          <Group direction="column">
            <FaceRecognitionWebCam
              videoRef={videoRef}
              singlepersondata={singlepersondata}
              CloseWebCam={CloseWebCam}
            />
          </Group>
          <Group direction="column">
            <DisplayData />
          </Group>
        </Container>
      )}
      {AccessDocuments && !RegisterButtonClick && !FaceRecognitionButtonClick && (
        <Container className={classes.registercontainer} fluid="true">
          <DirectAccess />
        </Container>
      )}
      <Container
        className={cx(classes.containernotif, {
          [classes.hidden]:
            FaceRecognitionButtonClick ||
            RegisterButtonClick ||
            AccessDocuments,
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
  AccessDocuments,
  setAccessDocuments,
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
        onClick={() => {
          if (!FaceRecognitionButtonClick && !AccessDocuments) {
            setRegisterButtonClick(!RegisterButtonClick);
          }
          RegisterButtonClick && CloseWebCam();
        }}
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
          if (!RegisterButtonClick && !AccessDocuments) {
            setFaceRecognitionButtonClick(!FaceRecognitionButtonClick);
          }
          FaceRecognitionButtonClick && CloseWebCam();
        }}
      >
        {FaceRecognitionButtonClick ? "Close" : "Apply for Documents"}
      </Button>
      <Button
        variant="light"
        size="sm"
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? AccessDocuments
                ? theme.colors.darktheme[0]
                : theme.colors.darktheme[6]
              : AccessDocuments
              ? theme.colors.darktheme[0]
              : theme.colors.lighttheme[3],
        })}
        className={classes.button}
        onClick={() => {
          if (!RegisterButtonClick && !FaceRecognitionButtonClick) {
            setAccessDocuments(!AccessDocuments);
          }
        }}
      >
        {AccessDocuments ? "Close" : "Direct Access"}
      </Button>
    </Group>
  );
};

export default Documents;
