import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import { Container, Group, Button, createStyles, Input } from "@mantine/core";
import Webcam from "react-webcam";
import { Capture, ArrowBack } from "tabler-icons-react";
import FileSaver from "file-saver";
import { useViewportSize } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
const useStyles = createStyles((theme) => ({
  cameracontainer: {
    width: "450px",
    display: "flex",
    height: "100%",

    flexDirection: "column",
    alignItems: "flex-start",
  },
  webcamcontainer: {
    width: "380px",
    height: "360px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonscontainer: {
    marginTop: `${theme.spacing.md}px`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
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
  hidden: {
    display: "none",
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
  savercontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "2rem",
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
  },
}));

const WebCamera = ({ videoRef }) => {
  const { classes, cx } = useStyles();
  const { width } = useViewportSize();
  const [Image, setImage] = useState("");
  const webcamRef = useRef(null);
  const photoRef = useRef({
    width: 300,
    height: 300
  });
  const [Picname, setPicname] = useState("");
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImage(imageSrc);
  }, [webcamRef]);

 
  const SaveImage = () => {
    if (!Image) {
      showNotification({
        title: "Capture image",
        message: "You forgot to capture image! 🤥",
      });
    } else if (!Picname) {
      showNotification({
        title: "Enter the name",
        message: "You forgot to enter the name! 🤥",
      });
    } else if (Image && Picname) {
      showNotification({
        title: "Saved Successfully!",
        message: "Your photo has been saved successfully!",
      });
      FileSaver.saveAs(Image, `${Picname}.jpg`);
    }
  };
  return (
    <Container className={classes.cameracontainer} fluid="true">
      {Image ? (
        <Container className={classes.webcamcontainer} fluid="true">
          <img src={Image} width="420px" height="360" alt="capturedImage"></img>
        </Container>
      ) : (
        <Webcam
          audio={false}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}
      <Group direction="row" className={classes.buttonscontainer}>
        <Button
          leftIcon={<Capture size={18} strokeWidth={2} />}
          variant="default"
          className={cx(classes.buttoncapture, { [classes.hidden]: Image })}
          onClick={capture}
        >
          Capture
        </Button>
        <Button
          leftIcon={<ArrowBack size={18} strokeWidth={2} />}
          variant="default"
          onClick={() => setImage(null)}
          className={cx(classes.buttonreset, { [classes.hidden]: !Image })}
        >
          Reset
        </Button>
      </Group>
      <Container fluid="true" className={classes.savercontainer}>
        <Group direction="row">
          <Input
            value={Picname}
            placeholder="Please enter the full name"
            variant="default"
            onChange={(e) => setPicname(e.target.value)}
          ></Input>
        </Group>
        <Button className={classes.registerbutton} onClick={SaveImage}>
          Save
        </Button>
      </Container>
    </Container>
  );
};

export default WebCamera;
