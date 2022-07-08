import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Container } from "@mantine/core";
import OpenSansRegular from "../fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../fonts/OpenSans-Bold.ttf";
import LucidaCalligraphy from "../fonts/Lucida Calligraphy Font.ttf";
import Logo from "../images/BRGY_LUNA - Logo.png";

// Create styles
const styles = StyleSheet.create({
  body: {
    width: "2500px",
    height: "3300px",
    paddingRight: 35,
  },
  title: {
    fontSize: 29,
    fontFamily: "OpenSans",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "ultrabold",
    marginTop: 9,
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },

  text: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
  },
  textsentence: {
    fontSize: 9,
    alignSelf: "center",
    fontFamily: "OpenSans",
    marginTop: 3,
  },
  textregular: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
  },
  textbold: {
    fontSize: 9,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  container: {
    fontFamily: "Regular",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: `100vh`,
    borderRadius: 20,
    transition: "ease-in-out 500ms",
  },
  pdfviewer: {
    height: "90vh",
    width: "40vw",
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
  headers: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "auto",
    height: "auto",
    paddingHorizontal: 4,
  },
  logo: {
    marginTop: 4,
    width: 75,
    height: 75,
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
  },
  marginTopContainer: {
    marginTop: 12,
    textAlign: "justify",
  },
  firstspacing: {
    width: 40,
  },
  marginspacing: {
    color: "white",
  },
  captaincontainer: {
    height: 30,
    marginTop: 98,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  captaincontainer2: {
    height: 'auto',
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  captainwrapper: {
    marginRight: 48,
    width: 150,
    height: 'auto',
    flexDirection: "column",
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

const BrgyCertificate = () => {
  return (
    <div style={styles.container}>
      <Container style={styles.containerwrapper}>
        <PDFViewer style={styles.pdfviewer}>
          <MyDocuments />
        </PDFViewer>
      </Container>
      <Container style={styles.containerwrapper}>
        <PDFDownloadLink document={<MyDocuments />} fileName="sample.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </Container>
    </div>
  );
};

const MyDocuments = () => {
  return (
    <Document>
      <Page size="LETTER" wrap style={styles.body}>
        <View style={styles.row}>
          <View style={styles.leftcontainer}></View>
          <View style={styles.rightcontainer}>
            <View style={styles.mainheader}>
              {/* <Image
                style={styles.logo}
                src={require("../images/BRGY_LUNA - Logo.png")}
                alt="BRGYLUNALOGO"
              ></Image>
              <View style={styles.headers}>
                <Text style={styles.text}>Republic of the Philippines</Text>
                <Text style={styles.text}>CARAGA Region XIII</Text>
                <Text style={styles.text}>Province of Surigao Del Norte</Text>
                <Text style={styles.text}>City of Surigao</Text>
                <Text style={styles.text}>BARANGAY LUNA</Text>
                <Text style={styles.textregular}>
                  OFFICE OF THE PUNONG BARANGAY
                </Text>
              </View>
              <Image
                style={styles.logo}
                src={require("../images/DILG.png")}
                alt="DILGLOGO"
              ></Image> */}
            </View>
            <Text style={styles.title}>BARANGAY CERTIFICATION</Text>
            <View style={styles.containertext}>
              <Text style={styles.receipenttext}>TO WHOM IT MAY CONCERN:</Text>
              <View style={styles.firstcontainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is to certify that {""}
                  <Text style={styles.textregular}>MARILYN H. ESCOBAL</Text>
                  , of legal age, married, and a Filipino Citizen is a
                  beneficiary of PANTAWID PAMILYANG PILIPINO PROGRAM (4P's) I.D
                  NO.
                  <Text>166724048-0128-00049</Text>.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is also to certify that the above-mentioned persion is
                  transferring her residency from <Text>Payawan 1</Text>,
                  Barangay Luna, Surigao City, Surigao del Norte to Barangay{" "}
                  <Text>Cagdianao, Claver, Surigao del Norte</Text>.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  Issued upon request of the above mentioned person in
                  connection with her application to transfer her benefits for
                  the{" "}
                  <Text style={styles.textregular}>
                    PANTAWID PAMILYANG PILIPINO PROGRAM (4P's) of DSWD
                  </Text>
                  .
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  Issued this 7<sup>th</sup> day of October, 2016 at Barangay
                  Luna, Surigao City, Philippines.{" "}
                </Text>
              </View>
              {/* <View style={styles.captaincontainer}>
                <View style={styles.captainwrapper}>
                  <Text style={styles.textbold}>HON. RICO A. NAGAS</Text>
                  <Text style={styles.textsentence}>Punong Barangay</Text>
                </View>
              </View>
              <View style={styles.captaincontainer2}>
                <View style={styles.captainwrapper}>
                  <Text style={styles.textbold}></Text>
                  <Text style={styles.textsentence}>Barangay Kagawad</Text>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BrgyCertificate;
