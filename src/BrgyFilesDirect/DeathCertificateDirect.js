import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import date from "date-and-time";
import { Container, TextInput, createStyles } from "@mantine/core";
import OpenSansRegular from "../fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../fonts/OpenSans-Bold.ttf";
import LucidaCalligraphy from "../fonts/Lucida Calligraphy Font.ttf";
import Logo from "../images/BRGY_LUNA - Logo.png";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    borderRadius: `20px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    alignSelf: "left",
    textAlign: "left",
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
    height: `100vh`,
    borderRadius: 20,
  },
  pdfviewer: {
    height: "90vh",
    width: "35vw",
  },
  containerwrapper: {
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
    marginTop: 14,
    height: 380,
  },
  receipenttext: {
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    fontWeight: 900,
    paddingBottom: 38,
  },
  textfirstparag: {
    fontSize: 9,
    alignSelf: "left",
    fontFamily: "OpenSans",
    width: "auto",
    lineHeight: 2,
    textAlign: "justify",
  },
  firstcontainer: {
    flexDirection: "row",
    textAlign: "justify",
    marginLeft: 15,
    borderBottom: `2px solid black`,
  },
  wrapper: {
    width: `100%`,
    marginLeft: 50,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 5,
  },
  wrapper2: {
    marginTop: 12,
    width: "100%",
    marginLeft: 63,
    display: "flex",
    flexDirection: "column",
  },
  wrapper3: {
    width: "100%",
    marginLeft: 63,
    display: "flex",
    flexDirection: "column",
  },
  marginTopContainer: {
    marginTop: 10,
    textAlign: "justify",
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
  contenttext: {
    display: "flex",
    fontFamily: "OpenSans",
    fontSize: 9,
    flexDirection: "row",
    marginTop: 10,
  },
  contentmain: {
    textAlign: "left",
    width: 100,
  },
  columntext: {
    paddingRight: 20,
  },
  contentaside: {
    marginLeft: 12,
    marginTop: 15,
    alignSelf: "left",
    textAlign: "left",
    display: "flex",
    fontFamily: "OpenSans",
    fontSize: 9,
    flexDirection: "column",
  },
  contentasidemain: {
    textDecoration: "underline",
    fontFamily: "OpenSans",
    fontSize: 9,
    fontWeight: 900,
    textTransform: "uppercase",
  },
  contentasidemain2: {
    fontFamily: "OpenSans",
    fontSize: 9,
    fontWeight: 900,
    textTransform: "uppercase",
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


const DeathCertificateDirect = () => {
  const { classes } = useStyles();
  const singleperson = useSelector((state) => state.facerecog.singlepersondata);
  const [ClientAge, setClientAge] = useState("");
  const [ClientPurpose, setClientPurpose] = useState("");
  const [ClientName, setClientName] = useState("");
  const [ClientSex, setClientSex] = useState("");
  const [ClientCivilStatus, setClientCivilStatus] = useState("");
  const [ClientCitizenship, setClientCitizenship] = useState("");
  const [ClientAddress, setClientAddress] = useState("");

  return (
    <Container fluid="true" className={classes.root}>
      <Text style={styles.maintitle}>Death Certificate</Text>
      <div style={styles.container}>
        <Container style={styles.containerwrapper}>
          <PDFViewer style={styles.pdfviewer}>
            <MyDocuments
              singleperson={singleperson}
              ClientAge={ClientAge}
              ClientPurpose={ClientPurpose}
              ClientName={ClientName}
              ClientSex={ClientSex}
              ClientCivilStatus={ClientCivilStatus}
              ClientCitizenship={ClientCitizenship}
              ClientAddress={ClientAddress}
            />
          </PDFViewer>
        </Container>
        <Container style={styles.containerwrapper}>
          <DataFillOut
            setClientAge={setClientAge}
            setClientPurpose={setClientPurpose}
            setClientName={setClientName}
            setClientSex={setClientSex}
            setClientCivilStatus={setClientCivilStatus}
            setClientCitizenship={setClientCitizenship}
            setClientAddress={setClientAddress}
          />
        </Container>
      </div>
    </Container>
  );
}

const DayMoment = (n) => {
  return (
    ["st", "nd", "rd"][(((((n < 0 ? -n : n) + 90) % 100) - 10) % 10) - 1] ||
    "th"
  );
};

const MyDocuments = ({
  singleperson,
  ClientAge,
  ClientPurpose,
  ClientName,
  ClientSex,
  ClientCivilStatus,
  ClientCitizenship,
  ClientAddress,
}) => {
  const now = new Date();
  const day = date.format(now, "D");
  const MonthAndDate = date.format(now, "MMMM, YYYY");
  return (
    <Document>
      <Page size="LETTER" wrap style={styles.body}>
        <View style={styles.row}>
          <View style={styles.leftcontainer}></View>
          <View style={styles.rightcontainer}>
            <View style={styles.mainheader}></View>
            <Text style={styles.title}>DEATH CERTIFICATION</Text>
            <View style={styles.containertext}>
              <View style={styles.firstcontainer}>
                <View style={styles.wrapper}>
                  <Text style={styles.textregular}>
                    This is to certify that:
                  </Text>
                  <View style={styles.contenttext}>
                    <Text style={styles.contentmain}>NAME</Text>
                    <Text style={styles.columntext}>:</Text>
                    <Text>{ClientName}</Text>
                  </View>
                  <View style={styles.contenttext}>
                    <Text style={styles.contentmain}>AGE</Text>
                    <Text style={styles.columntext}>:</Text>
                    <Text>33 YEARS OLD</Text>
                  </View>
                  <View style={styles.contenttext}>
                    <Text style={styles.contentmain}>DATE/TIME OF DEATH</Text>
                    <Text style={styles.columntext}>:</Text>
                    <Text></Text>
                  </View>
                  <View style={styles.contenttext}>
                    <Text style={styles.contentmain}>PLACE OF DEATH</Text>
                    <Text style={styles.columntext}>:</Text>
                    <Text>{ClientName}</Text>
                  </View>
                  <View style={styles.contenttext}>
                    <Text style={styles.contentmain}>CAUSE OF DEATH</Text>
                    <Text style={styles.columntext}>:</Text>
                    <Text>{ClientName}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapper2}>
                <Text style={styles.textfirstparag}>
                  Has been reported and validated to dead person whose signature
                  apperas below.
                </Text>
              </View>
              <View style={styles.wrapper3}>
                <Text style={styles.textfirstparag}>
                  Issued this{" "}
                  <Text>
                    {day}
                    {DayMoment(day)}
                  </Text>{" "}
                  day of <Text>{MonthAndDate}</Text> at Barangay Luna, Surigao
                  City, Philippines.{" "}
                </Text>
              </View>
              <View style={styles.contentaside}>
                <Text style={styles.contentasidemain}>NHIZA S. MAGPATOC</Text>
                <Text>Niece</Text>
              </View>
              <View style={styles.contentaside}>
                <Text style={styles.contentasidemain}>FE R. JUMAMOY</Text>
                <Text>Sanitation Inspection/Midwife</Text>
              </View>
              <View style={styles.contentaside}>
                <Text style={styles.contentasidemain}>FE R. JUMAMOY</Text>
                <Text>Brgy. Health Worker</Text>
              </View>
              <View style={styles.contentaside}>
                <Text style={styles.contentasidemain2}>MARCH 04, 2021 @ 3:00PM</Text>
                <Text>{"Date & Time Reported"}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const DataFillOut = ({
  setClientAge,
  setClientPurpose,
  setClientName,
  setClientCitizenship,
  setClientCivilStatus,
  setClientSex,
  setClientAddress,
}) => {
  return (
    <Container fluid="true" style={styles.formcontainer}>
      <TextInput
        style={styles.textinputs}
        label="Name"
        radius="sm"
        placeholder="ex. "
        onChange={(e) => setClientName(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Sex"
        radius="sm"
        placeholder="ex. Male"
        onChange={(e) => setClientSex(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Citizenship"
        radius="sm"
        placeholder="ex. Filipino"
        onChange={(e) => setClientCitizenship(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Civil Status"
        radius="sm"
        placeholder="ex. Single"
        onChange={(e) => setClientCivilStatus(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Address"
        radius="sm"
        placeholder="ex. Purok 1, Payawan 2"
        onChange={(e) => setClientAddress(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Age"
        radius="sm"
        placeholder="ex. 28"
        onChange={(e) => setClientAge(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Clearance Purpose"
        radius="sm"
        placeholder="ex. ASA for loan PURPOSES"
        onChange={(e) => setClientPurpose(e.currentTarget.value)}
      />
    </Container>
  );
};




export default DeathCertificateDirect