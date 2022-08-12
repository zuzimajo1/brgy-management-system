import { Container, NativeSelect, createStyles, Button } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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

const DirectAccess = () => {
  const [DirectAccessDocument, setDirectAccessDocument] =
    useState("4P'sTransfery");
  const { classes } = useStyles();
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
    "TravelCertificate",
    "WaterConnection",
    "WaterConnectionDiscount",
  ];

  return (
    <Container fluid="true" className={classes.formcontainer}>
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
            ? "4PsTransferyDirect"
            : DirectAccessDocument === "BrgyAcceptance"
<<<<<<< Updated upstream
            ? "BrgyAcceptanceDirect"
            : DirectAccessDocument === "BrgyAcceptance2"
            ? "BrgyAcceptance2Direct"
            : DirectAccessDocument === "BusinessClosure"
            ? "BusinessClosureDirect"
            : DirectAccessDocument === "BusinessClosurePSA"
            ? "BusinessClosurePSADirect"
            : DirectAccessDocument === "BurialAssistanceRelatives"
            ? "BurialAssistanceRelativesDirect"
            : DirectAccessDocument === "BuildingPermit"
            ? "BuildingPermitDirect"
            : DirectAccessDocument === "TravelCertificate"
            ? "TravelCertificateDirect"
            : DirectAccessDocument === "Certification-Abroad"
            ? "CertificateAbroadDirect"
            : DirectAccessDocument === "BirPattern/Assitance"
            ? "CertificateBirPatternDirect"
            : DirectAccessDocument === "WaterConnection"
            ? "CertificateWaterConnectionDirect"
            : DirectAccessDocument === "Certification-Stranded"
            ? "CertificateStrandedDirect"
            : DirectAccessDocument === "JobSeeker"
            ? "JobSeekerDirect"
            : DirectAccessDocument === "Clearance"
            ? "ClearanceDirect"
            : DirectAccessDocument === "WaterConnectionDiscount"
            ? "CertificateWaterConnectionDiscountDirect"
            : DirectAccessDocument === "LowIncome"
            ? "CertificationLowIncomeDirect"
            : DirectAccessDocument === "PhilHealth"
            ? "PhilHealthDirect"
            : DirectAccessDocument === "LowIncomeSubsidized"
            ? "LowIncomeSubsidizedDirect"
            : DirectAccessDocument === "CHEDScholar"
            ? "ChedScholarDirect"
            : DirectAccessDocument === "BrgyCertification"
            ? "BrgyCertificationDirect"
            : DirectAccessDocument === "Livelihood"
            ? "LivelihoodDirect"
            : DirectAccessDocument === "Certification-Pabahay"
            ? "CertificationPabahayDirect"
            : DirectAccessDocument === "ElectricConnection"
            ? "ElectricConnectionDirect"
            : DirectAccessDocument === "GoodMoral"
            ? "GoodMoralDirect"
            : DirectAccessDocument === "CaapAccessPass"
            ? "CaapAccessPassDirect"
            : DirectAccessDocument === "BaligyaBaboy"
            ? "BaligyaBaboyDirect"
            : DirectAccessDocument === "BrgyCertification2"
            ? "BrgyCertification2Direct"
            : DirectAccessDocument === "BrgyCertification3"
            ? "BrgyCertification3Direct" 
            : DirectAccessDocument === "PaihawBaboy"
            ? "PaihawBaboyDirect"
            : DirectAccessDocument === "DeathCertificate"
            ? "DeathCertificateDirect"
            : DirectAccessDocument === "MinorVaccination"
            ? "MinorVaccinationDirect" : "N/A"
=======
              ? "BrgyAcceptanceDirect"
              : DirectAccessDocument === "BrgyAcceptance2"
                ? "BrgyAcceptance2Direct"
                : DirectAccessDocument === "BusinessClosure"
                  ? "BusinessClosureDirect"
                  : DirectAccessDocument === "BusinessClosurePSA"
                    ? "BusinessClosurePSADirect"
                    : DirectAccessDocument === "BurialAssistanceRelatives"
                      ? "BurialAssistanceRelativesDirect"
                      : DirectAccessDocument === "BuildingPermit"
                        ? "BuildingPermitDirect"
                        : DirectAccessDocument === "TravelCertificate"
                          ? "TravelCertificateDirect"
                          : DirectAccessDocument === "Certification-Abroad"
                            ? "CertificateAbroadDirect"
                            : DirectAccessDocument === "BirPattern/Assitance"
                              ? "CertificateBirPatternDirect"
                              : DirectAccessDocument === "WaterConnection"
                                ? "CertificateWaterConnectionDirect"
                                : DirectAccessDocument === "Certification-Stranded"
                                  ? "CertificateStrandedDirect"
                                  : DirectAccessDocument === "JobSeeker"
                                    ? "JobSeekerDirect"
                                    : DirectAccessDocument === "Clearance"
                                      ? "ClearanceDirect"
                                      : DirectAccessDocument === "WaterConnectionDiscount"
                                        ? "CertificateWaterConnectionDiscountDirect"
                                        : DirectAccessDocument === "LowIncome"
                                          ? "CertificationLowIncomeDirect"
                                          : DirectAccessDocument === "PhilHealth"
                                            ? "PhilHealthDirect"
                                            : DirectAccessDocument === "LowIncomeSubsidized"
                                              ? "LowIncomeSubsidizedDirect"
                                              : DirectAccessDocument === "CHEDScholar"
                                                ? "ChedScholarDirect"
                                                : DirectAccessDocument === "BrgyCertification"
                                                  ? "BrgyCertificationDirect"
                                                  : DirectAccessDocument === "Livelihood"
                                                    ? "LivelihoodDirect"
                                                    : DirectAccessDocument === "Certification-Pabahay"
                                                      ? "CertificationPabahayDirect"
                                                      : DirectAccessDocument === "ElectricConnection"
                                                        ? "ElectricConnectionDirect"
                                                        : DirectAccessDocument === "GoodMoral"
                                                          ? "GoodMoralDirect"
                                                          : DirectAccessDocument === "CaapAccessPass"
                                                            ? "CaapAccessPassDirect"
                                                            : DirectAccessDocument === "BaligyaBaboy"
                                                              ? "BaligyaBaboyDirect"
                                                              : DirectAccessDocument === "BrgyCertification2"
                                                                ? "BrgyCertification2Direct"
                                                                : DirectAccessDocument === "BrgyCertification3"
                                                                  ? "BrgyCertification3Direct"
                                                                  : DirectAccessDocument === "PaihawBaboy"
                                                                    ? "PaihawBaboyDirect"
                                                                    : DirectAccessDocument === "DeathCertificate"
                                                                      ? "DeathCertificateDirect"
                                                                      : DirectAccessDocument === "PhilSys-Step-2"
                                                                        ? "PhilSysDirect" : "N/A"
>>>>>>> Stashed changes
        }
      >
        <Button variant="filled" size="sm" className={classes.button}>
          Apply
        </Button>
      </Link>
    </Container>
  );
};

export default DirectAccess;
