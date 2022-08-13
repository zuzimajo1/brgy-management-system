import React, { useState } from "react";
import {
  Container,
  TextInput,
  NumberInput,
  NativeSelect,
  Button,
  createStyles,
  Text,
  Space,
  Image,
  Loader,
} from "@mantine/core";
// import { samplepopulace } from "../config/dummyData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  formcontainer: {
    width: "35vw",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    width: "80%",
    padding: `${theme.spacing.sm}px`,
  },
  button: {
    width: "110px",
    cursor: "pointer",
  },
}));

const DisplayData = () => {
  const { classes } = useStyles();
  const {fetchdata , status, singlepersondata } = useSelector(
    (state) => state.facerecog
  );
  return (
    <>
      {fetchdata ? (
        <DisplayContainer
          classes={classes}
          status={status}
          singlepersondata={singlepersondata}
        />
      ) : (
        <NoContentContainer />
      )}
    </>
  );
};

const DisplayContainer = ({ classes, status, singlepersondata }) => {
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

  const [DocumentNavigate, setDocumentNavigate] = useState("4P'sTransfery");

  if (status==='loading') {
    return (
      <Container fluid="true" className={classes.formcontainer}>
        <Loader size="xl" />
      </Container>
    );
  } else if (status==='success') {
    return (
      <Container fluid="true" className={classes.formcontainer}>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Image
          </Text>
          <Image
            width="80px"
            height="80px"
            src={singlepersondata?.image}
          ></Image>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Firstname:
          </Text>
          <Text size="sm">{singlepersondata?.firstname}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Middlename:
          </Text>
          <Text size="sm">{singlepersondata?.middlename}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Lastname:
          </Text>
          <Text size="sm">{singlepersondata?.lastname}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Suffix:
          </Text>
          <Text size="sm">
            {singlepersondata?.suffix ? singlepersondata?.suffix : "None"}
          </Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Address:
          </Text>
          <Text size="sm">{singlepersondata?.address}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Date of Birth:
          </Text>
          <Text size="sm">{singlepersondata?.birthdate}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Place of Birth:
          </Text>
          <Text size="sm">{singlepersondata?.birthplace}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Sex:
          </Text>
          <Text size="sm">{singlepersondata?.sex}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Civil Status:
          </Text>
          <Text size="sm">{singlepersondata?.civilstatus}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Name of Parents:
          </Text>
          <Text size="sm">{singlepersondata?.parentsname}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Name of Siblings:
          </Text>
          <Text size="sm">{singlepersondata?.siblingsname}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Citizenship:
          </Text>
          <Text size="sm">{singlepersondata?.citizenship}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Occupation:
          </Text>
          <Text size="sm">{singlepersondata?.occupation}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            PWD:
          </Text>
          <Text size="sm">{singlepersondata?.PWD ? "Yes" : "No"}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Member of 4P's:
          </Text>
          <Text size="sm">{singlepersondata?.fourpsmember ? "Yes" : "No"}</Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Registered Voter:
          </Text>
          <Text size="sm">
            {singlepersondata?.registervoter ? "Yes" : "No"}
          </Text>
        </Container>
        <Container fluid="true" className={classes.group}>
          <Text className={classes.textmargin} size="sm">
            Occupancy Status:
          </Text>
          <Text size="sm">{singlepersondata?.occupancystatus}</Text>
        </Container>
        <NativeSelect
          className={classes.textinputs}
          data={documentsdata}
          value={DocumentNavigate}
          radius="sm"
          label="Select a document"
          onChange={(event) => setDocumentNavigate(event.currentTarget.value)}
        ></NativeSelect>
        <Link
          to={
            DocumentNavigate === "4P'sTransfery"
              ? "/4PsTransfery"
              : DocumentNavigate === "BrgyAcceptance"
              ? "/BrgyAcceptance"
              : DocumentNavigate === "BrgyAcceptance2"
              ? "/BrgyAcceptance2"
              : DocumentNavigate === "BusinessClosure"
              ? "/BusinessClosure"
              : DocumentNavigate === "BusinessClosurePSA"
              ? "/BusinessClosurePSA"
              : DocumentNavigate === "BurialAssistanceRelatives"
              ? "/BurialAssistanceRelatives"
              : DocumentNavigate === "BuildingPermit"
              ? "/BuildingPermit"
              : DocumentNavigate === "TravelCertificate"
              ? "/TravelCertificate"
              : DocumentNavigate === "Certification-Abroad"
              ? "/CertificateAbroad"
              : DocumentNavigate === "BirPattern/Assitance"
              ? "/CertificateBirPattern"
              : DocumentNavigate === "WaterConnection"
              ? "/CertificateWaterConnection"
              : DocumentNavigate === "Certification-Stranded"
              ? "/CertificateStranded"
              : DocumentNavigate === "JobSeeker"
              ? "/JobSeeker"
              : DocumentNavigate === "Clearance"
              ? "/Clearance"
              : DocumentNavigate === "WaterConnectionDiscount"
              ? "/CertificateWaterConnectionDiscount"
              : DocumentNavigate === "LowIncome"
              ? "/CertificationLowIncome"
              : DocumentNavigate === "PhilHealth"
              ? "/PhilHealth"
              : DocumentNavigate === "LowIncomeSubsidized"
              ? "/LowIncomeSubsidized"
              : DocumentNavigate === "CHEDScholar"
              ? "/ChedScholar"
              : DocumentNavigate === "BrgyCertification"
              ? "/BrgyCertification"
              : DocumentNavigate === "Livelihood"
              ? "/Livelihood"
              : DocumentNavigate === "Certification-Pabahay"
              ? "/CertificationPabahay"
              : DocumentNavigate === "ElectricConnection"
              ? "/ElectricConnection"
              : DocumentNavigate === "GoodMoral"
              ? "/GoodMoral"
              : DocumentNavigate === "CaapAccessPass"
              ? "/CaapAccessPass"
              : DocumentNavigate === "BaligyaBaboy"
              ? "/BaligyaBaboy"
              : DocumentNavigate === "BrgyCertification2"
              ? "/BrgyCertification2"
              : DocumentNavigate === "BrgyCertification3"
              ? "/BrgyCertification3"
              : DocumentNavigate === "PaihawBaboy"
              ? "/PaihawBaboy"
              : DocumentNavigate === "DeathCertificate"
              ? "/DeathCertificate"
              : DocumentNavigate === "MinorVaccination"
              ? "/MinorVaccination"
              : DocumentNavigate === "PhilSys-Step-2"
              ? "/PhilSys"
              : DocumentNavigate === "SoloParent"
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
  }
};

const NoContentContainer = () => {
  const { classes } = useStyles();
  return (
    <Container fluid="true" className={classes.formcontainer}>
      <Text side="md">No face detected</Text>
    </Container>
  );
};

export default DisplayData;
