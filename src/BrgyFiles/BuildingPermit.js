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
    marginTop: 40,
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
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    width: "auto",
    lineHeight: 2,
    textAlign: "justify",
  },
  firstcontainer: {
    flexDirection: "row",
    textAlign: "justify",
  },
  marginTopContainer: {
    marginTop: 12,
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
});

Font.register({
  family: "OpenSans",
  fonts: [
    { src: OpenSansRegular },
    { src: OpenSansBold, fontWeight: 900 },
    { src: LucidaCalligraphy, fontStyle: "italic", fontWeight: "ultrabold" },
  ],
});

const BuildingPermit = () => {
  const { classes } = useStyles();
  const [ParcelLotNo, setParcelLotNo] = useState("");
  const [PlanNo, setPlanNo] = useState("");
  const [PortionLot, setPortionLot] = useState("");
  const [Location, setLocation] = useState("");
  const [TCTNo, setTCTNo] = useState("");
   const singleperson = useSelector(
     (state) => state.facerecog.singlepersondata
   );

  return (
    <Container fluid="true" className={classes.root}>
      <Text style={styles.maintitle}>Building Permit</Text>
      <div style={styles.container}>
        <Container style={styles.containerwrapper}>
          <PDFViewer style={styles.pdfviewer}>
            <MyDocuments
              ParcelLotNo={ParcelLotNo}
              PlanNo={PlanNo}
              PortionLot={PortionLot}
              Location={Location}
              TCTNo={TCTNo}
              singleperson={singleperson}
            />
          </PDFViewer>
        </Container>
        <Container style={styles.containerwrapper}>
          <DataFillOut
            setParcelLotNo={setParcelLotNo}
            setPlanNo={setPlanNo}
            setPortionLot={setPortionLot}
            setLocation={setLocation}
            setTCTNo={setTCTNo}
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

const MyDocuments = ({
  ParcelLotNo,
  PlanNo,
  PortionLot,
  Location,
  TCTNo,
  singleperson,
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
            <Text style={styles.title}>BARANGAY CERTIFICATION</Text>
            <View style={styles.containertext}>
              <Text style={styles.receipenttext}>TO WHOM IT MAY CONCERN:</Text>
              <View style={styles.firstcontainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is to certify that{" "}
                  <Text style={styles.clientname}>{`${
                    singleperson?.firstname
                  } ${singleperson?.middlename.slice(0, 1)}. ${
                    singleperson?.lastname
                  }`}</Text>
                  , of legal age,{" "}
                  <Text style={styles.textlowercase}>{singleperson?.sex}</Text>,{" "}
                  <Text style={styles.textCapitalize}>
                    {singleperson?.citizenship}
                  </Text>{" "}
                  Citizen, a resident of <Text>{singleperson?.address}</Text>,
                  Barangay Luna, Surigao City.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is also to certify that the above-mentioned has a parcel
                  of land Lot No. <Text>{ParcelLotNo}</Text>, Plan No.{" "}
                  <Text>{PlanNo}</Text>, being a portion of Lot{" "}
                  <Text>{PortionLot}</Text>, situated in the{" "}
                  <Text>{Location}</Text> under TCT No. <Text>{TCTNo}</Text>.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This certification is issued upon the request of the
                  above-mentioned person, to support the transaction to the{" "}
                  <Text style={styles.textregular}>
                    CITY ENGINEERING OFFICE (CEO) for the purpose of BUILDING
                    PERMIT (PERIMETER FENCE)
                  </Text>{" "}
                  at <Text>{singleperson?.address}</Text>, Brgy. Luna, Surigao
                  City.
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
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const DataFillOut = ({ setParcelLotNo, setPlanNo, setPortionLot, setLocation, setTCTNo }) => {
  return (
    <Container fluid="true" style={styles.formcontainer}>
      <TextInput
        style={styles.textinputs}
        label="Parcel of Land Lot No."
        radius="sm"
        placeholder="ex 874-C-2-A-4"
        onChange={(e) => setParcelLotNo(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Plan No."
        radius="sm"
        placeholder="ex PSD-106724-017083"
        onChange={(e) => setPlanNo(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Portion of Lot"
        radius="sm"
        placeholder="ex 874-C-2-A, PSD-106724-016928"
        onChange={(e) => setPortionLot(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Location"
        radius="sm"
        placeholder="ex Barrio of Luna, City of Surigao, Island of Mindanao"
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="TCT No."
        radius="sm"
        placeholder="ex 162-2016000600"
        onChange={(e) => setTCTNo(e.target.value)}
      />
    </Container>
  );
};



export default BuildingPermit;
