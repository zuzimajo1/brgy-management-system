import React, { useState, useCallback, useRef } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import date from "date-and-time";
import { Container, TextInput, createStyles, Button } from "@mantine/core";
import OpenSansRegular from "../fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../fonts/OpenSans-Bold.ttf";
import LucidaCalligraphy from "../fonts/Lucida Calligraphy Font.ttf";
import Logo from "../images/BRGY_LUNA - Logo.png";
import Webcam from "react-webcam";
import { Capture, ArrowBack } from "tabler-icons-react";
import { useSelector } from "react-redux";
import { AdditionInputs } from "../Components";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    height: "1000px",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    borderRadius: `20px`,
    display: "flex",
    flexDirection: "column",
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
  buttoncapture: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[7]
        : theme.colors.lighttheme[5],
    color: theme.colors.lighttheme[0],
    width: "130px",
    paddingTop: 5,
    paddingBottom: 5,
    border: "none",
    transition: `ease-in-out 500ms`,
    marginTop: 20,

    "&:hover": {
      color: theme.colors.lighttheme[0],
      background:
        theme.colorScheme === "dark"
          ? theme.colors.lighttheme[5]
          : theme.colors.darktheme[7],
    },
  },
}));

const styles = StyleSheet.create({
  maintitle: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "OpenSans",
    marginTop: 24,
  },
  body: {
    width: "2500px",
    height: "3300px",
    paddingRight: 35,
    background: "transparent",
  },
  title: {
    fontSize: 29,
    fontFamily: "OpenSans",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "ultrabold",
    marginTop: 9,
  },

  text: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
  },

  textregular: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
  },
  clientname: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  container: {
    fontFamily: "Regular",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: `150vh`,
    borderRadius: 20,
  },
  pdfviewer: {
    height: "90vh",
    width: "35vw",
  },
  containerwrapper: {
    marginTop: 60,
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
  },
  leftcontainer: {
    width: 170,
    paddingTop: 100,
    position: "relative",
  },
  rightcontainer: {
    width: 600,
    paddingTop: 70,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 18,
  },
  mainheader: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  containertext: {
    background: Logo,
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    width: "100%",
    marginTop: 40,
    height: 500,
  },
  receipenttext: {
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    fontWeight: 900,
    paddingBottom: 10,
  },
  textfirstparag: {
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    width: "auto",
    lineHeight: 2,
    textAlign: "justify",
    letterSpacing: "-0.1px",
  },
  textsecondparag: {
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    lineHeight: 2,
    textAlign: "left",
  },
  deets: {
    marginTop: 12,
    flexDirection: "column",
    textAlign: "justify",
    flexWrap: "wrap",
  },
  firstcontainer: {
    flexDirection: "row",
    textAlign: "justify",
  },
  marginTopContainer: {
    marginTop: 12,
    flexDirection: "row",
    textAlign: "justify",
    flexWrap: "wrap",
  },
  marginspacing: {
    color: "white",
  },
  formcontainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textinputs: {
    width: "80%",
  },
  textlowercase: {
    fontSize: 10,
    fontFamily: "OpenSans",
    textTransform: "lowercase",
  },
  textCapitalize: {
    fontSize: 10,
    fontFamily: "OpenSans",
    textTransform: "capitalize",
  },
  textuppercase: {
    fontSize: 10,
    fontFamily: "OpenSans",
    textTransform: "uppercase",
  },
  image: {
    width: 100,
    height: 105,
  },
  marginBottomContainer: {
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 10,
    fontFamily: "OpenSans",
    bottom: 0,
    alignSelf: "left",
  },
  textbold: {
    fontFamily: "OpenSans",
    fontWeight: 900,
    fontSize: 10,
    textTransform: "uppercase",
  },
  hidden: {
    display: "none",
  },
  label: {
    display: "flex",
    cursor: "pointer",
  },
  webcamcontainer: {
    width: 80,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttoncapture: {
    marginTop: 12,
  },
  ornumber: {
    bottom: 35,
    left: 20,
    position: "absolute",
    fontSize: 8,
    fontFamily: "OpenSans",
  },
});

Font.register({
  family: "OpenSans",
  fonts: [
    { src: OpenSansRegular },
    { src: OpenSansBold, fontWeight: 900 },
    { src: LucidaCalligraphy, fontStyle: "italic", fontWeight: "ultrabold" },
  ],
});

const PhilSys = () => {
  const { classes } = useStyles();
  const [CaptureImage, setCaptureImage] = useState("");
  const [ClientPurpose, setClientPurpose] = useState("");
  const webcamRef = useRef(null);
  const singleperson = useSelector((state) => state.facerecog.singlepersondata);
  const {fullname} = useSelector((state) => state.facerecog.singlepersondata);
    const [ORNo, setORNo] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setCaptureImage(imageSrc);
  }, [webcamRef]);

  return (
    <Container fluid="true" className={classes.root}>
      <Text style={styles.maintitle}>PhilSys Step 2</Text>
      <div style={styles.container}>
        <Container style={styles.containerwrapper}>
          <PDFViewer style={styles.pdfviewer}>
            <MyDocuments
              singleperson={singleperson}
              CaptureImage={CaptureImage}
              ClientPurpose={ClientPurpose}
              ORNo={ORNo}
            />
          </PDFViewer>
        </Container>
        <Container style={styles.containerwrapper}>
          <DataFillOut
            capture={capture}
            setClientPurpose={setClientPurpose}
            Webcam={Webcam}
            webcamRef={webcamRef}
            CaptureImage={CaptureImage}
            setCaptureImage={setCaptureImage}
            setORNo={setORNo}
            Clientfullname={fullname}
          />
        </Container>
      </div>
    </Container>
  );
};

const DayMoment = (n) => {
  return (
    ["st", "nd", "rd"][(((((n < 0 ? -n : n) + 90) % 100) - 10) % 10) - 1] ||
    "th"
  );
};

const MyDocuments = ({ singleperson, CaptureImage, ClientPurpose, ORNo }) => {
  const now = new Date();
  const day = date.format(now, "D");
  const MonthAndDate = date.format(now, "MMMM, YYYY");
  return (
    <Document>
      <Page size="LETTER" wrap style={styles.body}>
        <View style={styles.row}>
          <View style={styles.leftcontainer}>
            <Text style={styles.ornumber}>
              OR NO.:       <Text>{ORNo}</Text>
            </Text>
          </View>
          <View style={styles.rightcontainer}>
            <View style={styles.mainheader}></View>
            <Text style={styles.title}>BARANGAY CERTIFICATION</Text>
            <View style={styles.containertext}>
              <Text style={styles.receipenttext}>TO WHOM IT MAY CONCERN:</Text>
              <View style={styles.firstcontainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is to certify that the person whose signature appear
                  herein is a bonafide resident of this Barangay. He/She has
                  never been charged in any kind of offense and has no pending
                  case(s) filed before the Lupong Tagapamayapa in this Barangay
                  either civil or criminal case up to date.
                </Text>
              </View>
              <View style={styles.deets} wrap={true}>
                <Text style={styles.textfirstparag} wrap={true}>
                  <Text style={styles.marginspacing}>...............</Text>
                  FULLNAME:
                  <Text style={styles.marginspacing}>...........</Text>
                  <Text
                    style={styles.clientname}
                  >{`${singleperson?.firstname} ${singleperson?.middlename} ${singleperson?.lastname}`}</Text>
                </Text>
                <Text style={styles.textfirstparag} wrap={true}>
                  <Text style={styles.marginspacing}>...............</Text>
                  ADDRESS:
                  <Text style={styles.marginspacing}>..............</Text>
                  <Text style={styles.clientname}>{singleperson?.address}</Text>
                </Text>
                <Text style={styles.textfirstparag} wrap={true}>
                  <Text style={styles.marginspacing}>...............</Text>
                  DATE OF BIRTH:
                  <Text style={styles.marginspacing}>...</Text>
                  <Text style={styles.clientname}>
                    {singleperson?.birthdate}
                  </Text>
                </Text>
                <Text style={styles.textfirstparag} wrap={true}>
                  <Text style={styles.marginspacing}>...............</Text>
                  PLACE OF BIRTH:
                  <Text style={styles.marginspacing}>.</Text>
                  <Text style={styles.clientname}>
                    {singleperson?.birthplace}
                  </Text>
                </Text>
                <Text style={styles.textfirstparag} wrap={true}>
                  <Text style={styles.marginspacing}>...............</Text>
                  CIVIL STATUS:
                  <Text style={styles.marginspacing}>.......</Text>
                  <Text style={styles.clientname}>
                    {singleperson?.civilstatus}
                  </Text>
                </Text>
                <Text style={styles.textfirstparag} wrap={true}>
                  <Text style={styles.marginspacing}>...............</Text>
                  GENDER:
                  <Text style={styles.marginspacing}>...............</Text>
                  <Text style={styles.clientname}>{singleperson?.sex}</Text>
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textsecondparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This certification is issued upon the request of the
                  above-mentioned person as a requirement for{" "}
                  <Text style={styles.textregular}>{ClientPurpose}</Text>.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  Issued this{" "}
                  <Text>
                    {day}
                    {DayMoment(day)}
                  </Text>{" "}
                  day of <Text>{MonthAndDate}</Text> at Barangay Luna, Surigao
                  City, Philippines.{" "}
                </Text>
              </View>
              {CaptureImage && (
                <View style={styles.marginTopContainer}>
                  <Image
                    src={CaptureImage || null}
                    alt="picture"
                    style={styles.image}
                  ></Image>
                </View>
              )}
              <View style={styles.marginBottomContainer}>
                <Text
                  style={styles.textbold}
                >{`${singleperson?.firstname} ${singleperson?.middlename} ${singleperson?.lastname}`}</Text>
                <Text>Requesting Party</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const DataFillOut = ({
  setClientPurpose,
  Webcam,
  webcamRef,
  CaptureImage,
  capture,
  setCaptureImage,
  setORNo,
  Clientfullname,
}) => {
  const { classes } = useStyles();
  return (
    <Container fluid="true" style={styles.formcontainer}>
      {CaptureImage ? (
        <Container style={styles.webcamcontainer} fluid="true">
          <Button
            onClick={() => setCaptureImage("")}
            className={classes.buttonreset}
          >
            Reset
          </Button>
        </Container>
      ) : (
        <>
          <Webcam
            audio={false}
            height={330}
            width={330}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <Button
            leftIcon={<Capture size={18} strokeWidth={2} />}
            variant="filled"
            onClick={capture}
            className={classes.buttoncapture}
          >
            Capture
          </Button>
        </>
      )}
      <TextInput
        style={styles.textinputs}
        label="Client Purpose"
        radius="sm"
        placeholder="ex. PHILSYS STEP 2 REGISTRATION"
        onChange={(e) => setClientPurpose(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="OR Number"
        radius="sm"
        placeholder="ex. "
        onChange={(e) => setORNo(e.target.value)}
      />
      <AdditionInputs clientname={Clientfullname} lettername="PhilSys" />
    </Container>
  );
};

export default PhilSys;
