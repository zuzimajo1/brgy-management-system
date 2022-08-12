import React, { useState } from "react";
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
import { Container, TextInput, createStyles } from "@mantine/core";
import OpenSansRegular from "../fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../fonts/OpenSans-Bold.ttf";
import LucidaCalligraphy from "../fonts/Lucida Calligraphy Font.ttf";
import Logo from "../images/BRGY_LUNA - Logo.png";

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
        letterSpacing: "-0.1px"
    },
    textsecondparag: {
        fontSize: 10,
        alignSelf: "left",
        fontFamily: "OpenSans",
        // width: "auto",
        lineHeight: 2,
        textAlign: "left",
        // letterSpacing: "-0.1px"
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
        maxWidth: "100px",
        maxHeight: "100px"
    },
    marginBottomContainer: {
        marginTop: 12,
        flexDirection: "row",
        textAlign: "justify",
        flexWrap: "wrap",
        position: "absolute",
        bottom: "0",
        border: "red 1px solid"
    },
    bottom: {
        display: "flex",
        flexDirection: "column !important",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 10,
        alignSelf: "left",
        fontFamily: "OpenSans",
        width: "auto",
        lineHeight: 2,
        textAlign: "justify",
    }
});

Font.register({
    family: "OpenSans",
    fonts: [
        { src: OpenSansRegular },
        { src: OpenSansBold, fontWeight: 900 },
        { src: LucidaCalligraphy, fontStyle: "italic", fontWeight: "ultrabold" },
    ],
});

const PhilSysDirect = () => {
    const { classes } = useStyles();
    const [ClientName, setClientName] = useState("");
    const [ClientCivilStatus, setClientCivilStatus] = useState("");
    const [ClientSex, setClientSex] = useState("");
    const [ClientDateOfBirth, setClientDateOfBirth] = useState("");
    const [ClientPlaceOfBirth, setClientPlaceOfBirth] = useState("");
    const [ClientAddress, setClientAddress] = useState("");

    return (
        <Container fluid="true" className={classes.root}>
            <Text style={styles.maintitle}>PhilSys Step 2</Text>
            <div style={styles.container}>
                <Container style={styles.containerwrapper}>
                    <PDFViewer style={styles.pdfviewer}>
                        <MyDocuments
                            ClientName={ClientName}
                            ClientSex={ClientSex}
                            ClientCivilStatus={ClientCivilStatus}
                            ClientDateOfBirth={ClientDateOfBirth}
                            ClientPlaceOfBirth={ClientPlaceOfBirth}
                            ClientAddress={ClientAddress}
                        />
                    </PDFViewer>
                </Container>
                <Container style={styles.containerwrapper}>
                    <DataFillOut
                        setClientName={setClientName}
                        setClientSex={setClientSex}
                        setClientCivilStatus={setClientCivilStatus}
                        setClientDateOfBirth={setClientDateOfBirth}
                        setClientPlaceOfBirth={setClientPlaceOfBirth}
                        setClientAddress={setClientAddress}
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
    ClientSex,
    ClientName,
    ClientCivilStatus,
    ClientAddress,
    ClientDateOfBirth,
    ClientPlaceOfBirth,
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
                                    This is to certify that the person whose signature appear herein is a bonafide resident of this Barangay. He/She has never been charged in any kind of offense and has no pending case(s) filed before the Lupong Tagapamayapa in this Barangay either civil or criminal case up to date.
                                </Text>
                            </View>
                            <View style={styles.deets} wrap={true}>
                                <Text style={styles.textfirstparag} wrap={true}>
                                    <Text style={styles.marginspacing}>...............</Text>
                                    FULLNAME:
                                    <Text style={styles.marginspacing}>...........</Text>
                                    <Text style={styles.clientname}>{ClientName}</Text>
                                </Text>
                                <Text style={styles.textfirstparag} wrap={true}>
                                    <Text style={styles.marginspacing}>...............</Text>
                                    ADDRESS:
                                    <Text style={styles.marginspacing}>..............</Text>
                                    <Text style={styles.clientname}>{ClientAddress}</Text>
                                </Text>
                                <Text style={styles.textfirstparag} wrap={true}>
                                    <Text style={styles.marginspacing}>...............</Text>
                                    DATE OF BIRTH:
                                    <Text style={styles.marginspacing}>...</Text>
                                    <Text style={styles.clientname}>{ClientDateOfBirth}</Text>
                                </Text>
                                <Text style={styles.textfirstparag} wrap={true}>
                                    <Text style={styles.marginspacing}>...............</Text>
                                    PLACE OF BIRTH:
                                    <Text style={styles.marginspacing}>.</Text>
                                    <Text style={styles.clientname}>{ClientPlaceOfBirth}</Text>
                                </Text>
                                <Text style={styles.textfirstparag} wrap={true}>
                                    <Text style={styles.marginspacing}>...............</Text>
                                    CIVIL STATUS:
                                    <Text style={styles.marginspacing}>.......</Text>
                                    <Text style={styles.clientname}>{ClientCivilStatus}</Text>
                                </Text>
                                <Text style={styles.textfirstparag} wrap={true}>
                                    <Text style={styles.marginspacing}>...............</Text>
                                    GENDER:
                                    <Text style={styles.marginspacing}>...............</Text>
                                    <Text style={styles.clientname}>{ClientSex}</Text>
                                </Text>
                            </View>
                            <View style={styles.marginTopContainer}>
                                <Text style={styles.textsecondparag}>
                                    <Text style={styles.marginspacing}>...............</Text>
                                    This certification is issued upon the request of the above-mentioned person as a requirement for <Text style={styles.textregular}>PHILSYS STEP 2 REGISTRATION</Text>.
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
                            <View style={styles.marginTopContainer}>
                                <Image source={Logo} style={styles.image} />
                            </View>
                            <View style={styles.marginBottomContainer} >
                                <Text style={styles.bottom}>
                                    <Text style={styles.clientname}>{ClientName}</Text>
                                    <Text>Requesting Party</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const DataFillOut = ({
    setClientSex,
    setClientName,
    setClientAddress,
    setClientCivilStatus,
    setClientDateOfBirth,
    setClientPlaceOfBirth,
}) => {
    return (
        <Container fluid="true" style={styles.formcontainer}>
            <TextInput
                style={styles.textinputs}
                label="Name"
                radius="sm"
                placeholder="ex. Juan dela Cruz"
                onChange={(e) => setClientName(e.target.value)}
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
                label="Date of Birth"
                radius="sm"
                placeholder="ex. January 1, 2022"
                onChange={(e) => setClientDateOfBirth(e.target.value)}
            />
            <TextInput
                style={styles.textinputs}
                label="Place of Birth"
                radius="sm"
                placeholder="ex. Surigao City"
                onChange={(e) => setClientPlaceOfBirth(e.target.value)}
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
                label="Sex"
                radius="sm"
                placeholder="ex. Male"
                onChange={(e) => setClientSex(e.target.value)}
            />
        </Container>
    );
};


export default PhilSysDirect;