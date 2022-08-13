import { Container, NativeSelect, createStyles, Button, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 

const useStyles = createStyles((theme) => ({
  formcontainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  group: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  textmargin: {
    marginRight: `${theme.spacing.xs}px`,
    fontFamily: "Bold",
  },
  textinputs: {
    marginTop: '5rem',
    width: 400,
    padding: `${theme.spacing.sm}px`,
  },
  button: {
    width: "110px",
    cursor: "pointer",
  },
  maintitle: {
    alignSelf: "center",
    fontSize: 32,
    marginTop: 24,
  },
}));

const CreateDocument = () => {
  const [DirectAccessDocument, setDirectAccessDocument] =
    useState("4P'sTransfery");
  const { classes } = useStyles();
  const { singlepersondata } = useSelector(state=>state.facerecog)
  const documentsdata = [
    "4P'sTransfery",
    "BaligyaBaboy",
    "BrgyAcceptance",
    "BrgyAcceptance2",
    "BusinessClosure",
    "BusinessClosurePSA",
    "BurialAssistanceRelatives",
    "BuildingPermit",
    "BirPattern/Assitance",
    "BrgyCertification",
    "BrgyCertification2",
    "BrgyCertification3",
    "CaapAccessPass",
    "Certification-Abroad",
    "Certification-Stranded",
    "Clearance",
    "CHEDScholar",
    "Certification-Pabahay",
    "DeathCertificate",
    "ElectricConnection",
    "GoodMoral",
    "LowIncomeSubsidized",
    "Livelihood",
    "LowIncome",
    "JobSeeker",
    "MinorVaccination",
    "PaihawBaboy",
    "PhilHealth",
    "PhilSys-Step-2",
    "SoloParent",
    "TravelCertificate",
    "WaterConnection",
    "WaterConnectionDiscount",
  ];

  return (
    <Container fluid="true" className={classes.formcontainer}>
      <Text className={classes.maintitle}>
        Create Document for {singlepersondata.fullname}
      </Text>
      <NativeSelect
        className={classes.textinputs}
        data={documentsdata}
        value={DirectAccessDocument}
        radius="sm"
        label="Select a document"
        onChange={(event) => setDirectAccessDocument(event.currentTarget.value)}
      ></NativeSelect>
      <Link
        to={
          DirectAccessDocument === "4P'sTransfery"
            ? "/4PsTransfery"
            : DirectAccessDocument === "BrgyAcceptance"
            ? "/BrgyAcceptance"
            : DirectAccessDocument === "BrgyAcceptance2"
            ? "/BrgyAcceptance2"
            : DirectAccessDocument === "BusinessClosure"
            ? "/BusinessClosure"
            : DirectAccessDocument === "BusinessClosurePSA"
            ? "/BusinessClosurePSA"
            : DirectAccessDocument === "BurialAssistanceRelatives"
            ? "/BurialAssistanceRelatives"
            : DirectAccessDocument === "BuildingPermit"
            ? "/BuildingPermit"
            : DirectAccessDocument === "TravelCertificate"
            ? "/TravelCertificate"
            : DirectAccessDocument === "Certification-Abroad"
            ? "/CertificateAbroad"
            : DirectAccessDocument === "BirPattern/Assitance"
            ? "/CertificateBirPattern"
            : DirectAccessDocument === "WaterConnection"
            ? "/CertificateWaterConnection"
            : DirectAccessDocument === "Certification-Stranded"
            ? "/CertificateStranded"
            : DirectAccessDocument === "JobSeeker"
            ? "/JobSeeker"
            : DirectAccessDocument === "Clearance"
            ? "/Clearance"
            : DirectAccessDocument === "WaterConnectionDiscount"
            ? "/CertificateWaterConnectionDiscount"
            : DirectAccessDocument === "LowIncome"
            ? "/CertificationLowIncome"
            : DirectAccessDocument === "PhilHealth"
            ? "/PhilHealth"
            : DirectAccessDocument === "LowIncomeSubsidized"
            ? "/LowIncomeSubsidized"
            : DirectAccessDocument === "CHEDScholar"
            ? "/ChedScholar"
            : DirectAccessDocument === "BrgyCertification"
            ? "/BrgyCertification"
            : DirectAccessDocument === "Livelihood"
            ? "/Livelihood"
            : DirectAccessDocument === "Certification-Pabahay"
            ? "/CertificationPabahay"
            : DirectAccessDocument === "ElectricConnection"
            ? "/ElectricConnection"
            : DirectAccessDocument === "GoodMoral"
            ? "/GoodMoral"
            : DirectAccessDocument === "CaapAccessPass"
            ? "/CaapAccessPass"
            : DirectAccessDocument === "BaligyaBaboy"
            ? "/BaligyaBaboy"
            : DirectAccessDocument === "BrgyCertification2"
            ? "/BrgyCertification2"
            : DirectAccessDocument === "BrgyCertification3"
            ? "/BrgyCertification3"
            : DirectAccessDocument === "PaihawBaboy"
            ? "/PaihawBaboy"
            : DirectAccessDocument === "DeathCertificate"
            ? "/DeathCertificate"
            : DirectAccessDocument === "MinorVaccination"
            ? "/MinorVaccination"
            : DirectAccessDocument === "PhilSys-Step-2"
            ? "/PhilSys"
            : DirectAccessDocument === "SoloParent"
            ? "/SoloParent"
            : "N/A"
        }
      >
        <Button variant="filled" size="sm" className={classes.button}>
          Apply
        </Button>
      </Link>
    </Container>
  );
};

export default CreateDocument;
