import { useEffect, useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
  Group,
} from "@mantine/core";
import { useHotkeys, useLocalStorage, useViewportSize } from "@mantine/hooks";
import { Routes, Route, useLocation } from "react-router-dom";
import { NavbarContainer, HeaderContainer } from "./Components";
import { useSelector } from "react-redux";
import Masterlist from "./Pages/Masterlist";
import { Auth, Events, Home, Documents } from "./Pages";

import {
  Abroad,
  BarangayAcceptance,
  BarangayAcceptance2,
  BIRpattern,
  BrgyCertificationMultiPurpose,
  BuildingPermit,
  BurialAssistanceRelatives,
  BusinessClosure,
  BusinessClosurePSA,
  CertificationLowIncome,
  CertificationStranded,
  ChedScholar,
  Clearance,
  ElectricMeter,
  FourPsTransfery,
  JobSeeker,
  Livelihood,
  LowIncomeSubsidized,
  Pabahay,
  PhilHealth,
  TravelCertificate,
  WaterConnection,
  WaterConnectionDiscount,
} from "./BrgyFiles";

import {
  AbroadDirect,
  BarangayAcceptanceDirect,
  BarangayAcceptance2Direct,
  BIRpatternDirect,
  BrgyCertificationMultiPurposeDirect,
  BuildingPermitDirect,
  BurialAssistanceRelativesDirect,
  BusinessClosureDirect,
  BusinessClosurePSADirect,
  CertificationLowIncomeDirect,
  CertificationStrandedDirect,
  ChedScholarDirect,
  ClearanceDirect,
  ElectricMeterDirect,
  FourPsTransferyDirect,
  JobSeekerDirect,
  LivelihoodDirect,
  LowIncomeSubsidizedDirect,
  PabahayDirect,
  PhilHealthDirect,
  TravelCertificateDirect,
  WaterConnectionDirect,
  WaterConnectionDiscountDirect,
  GoodMoralDirect,
  CaapAccessPassDirect,
  BaligyaBaboyDirect,
  BrgyCertification2Direct,
  BrgyCertification3Direct,
  PaihawBaboyDirect,
  DeathCertificateDirect,
<<<<<<< Updated upstream
  MinorVaccinationDirect,
=======
  PhilSysDirect
>>>>>>> Stashed changes
} from "./BrgyFilesDirect/indexDirect";

function App() {
  // const User = useSelector((state) => state.user.loginStatus);
  const [User, setUser] = useState(true);
  const { width } = useViewportSize();
  const show = useSelector((state) => state.navbar.show);

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  const theme = {
    colorScheme,
    spacing: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 64 },
    colors: {
      darktheme: [
        "#00897B",
        "#05181C",
        "#0E1B23",
        "#060D12",
        "#78919C",
        "#14252F",
        "#587583",
        "#314792",
        "#B64834",
      ],
      lighttheme: [
        "#FFFFFF",
        "#E0F2F1",
        "#ECEFF1",
        "#607D8B",
        "#212121",
        "#6D81C1",
        "#CF8071",
      ],
    },
  };

  const RoutesNavigation = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "events",
      element: <Events />,
    },
    {
      path: "transactions",
      element: <Documents />,
    },
    {
      path: "masterlist",
      element: <Masterlist colorScheme={colorScheme} />,
    },
    {
      path: "transactions/4PsTransfery",
      element: <FourPsTransfery />,
    },
    {
      path: "transactions/BrgyAcceptance",
      element: <BarangayAcceptance />,
    },
    {
      path: "transactions/BrgyAcceptance2",
      element: <BarangayAcceptance2 />,
    },
    {
      path: "transactions/BusinessClosure",
      element: <BusinessClosure />,
    },
    {
      path: "transactions/BusinessClosurePSA",
      element: <BusinessClosurePSA />,
    },
    {
      path: "transactions/BurialAssistanceRelatives",
      element: <BurialAssistanceRelatives />,
    },
    {
      path: "transactions/BuildingPermit",
      element: <BuildingPermit />,
    },
    {
      path: "transactions/TravelCertificate",
      element: <TravelCertificate />,
    },
    {
      path: "transactions/CertificateAbroad",
      element: <Abroad />,
    },
    {
      path: "transactions/CertificateBirPattern",
      element: <BIRpattern />,
    },
    {
      path: "transactions/CertificateWaterConnection",
      element: <WaterConnection />,
    },
    {
      path: "transactions/CertificateStranded",
      element: <CertificationStranded />,
    },
    {
      path: "transactions/JobSeeker",
      element: <JobSeeker />,
    },
    {
      path: "transactions/Clearance",
      element: <Clearance />,
    },
    {
      path: "transactions/CertificateWaterConnectionDiscount",
      element: <WaterConnectionDiscount />,
    },
    {
      path: "transactions/CertificationLowIncome",
      element: <CertificationLowIncome />,
    },
    {
      path: "transactions/PhilHealth",
      element: <PhilHealth />,
    },
    {
      path: "transactions/LowIncomeSubsidized",
      element: <LowIncomeSubsidized />,
    },
    {
      path: "transactions/ChedScholar",
      element: <ChedScholar />,
    },
    {
      path: "transactions/BrgyCertification",
      element: <BrgyCertificationMultiPurpose />,
    },
    {
      path: "transactions/Livelihood",
      element: <Livelihood />,
    },
    {
      path: "transactions/CertificationPabahay",
      element: <Pabahay />,
    },
    {
      path: "transactions/ElectricConnection",
      element: <ElectricMeter />,
    },
    {
      path: "transactions/4PsTransferyDirect",
      element: <FourPsTransferyDirect />,
    },
    {
      path: "transactions/BrgyAcceptanceDirect",
      element: <BarangayAcceptanceDirect />,
    },
    {
      path: "transactions/BrgyAcceptance2Direct",
      element: <BarangayAcceptance2Direct />,
    },
    {
      path: "transactions/BusinessClosureDirect",
      element: <BusinessClosureDirect />,
    },
    {
      path: "transactions/BusinessClosurePSADirect",
      element: <BusinessClosurePSADirect />,
    },
    {
      path: "transactions/BurialAssistanceRelativesDirect",
      element: <BurialAssistanceRelativesDirect />,
    },
    {
      path: "transactions/BuildingPermitDirect",
      element: <BuildingPermitDirect />,
    },
    {
      path: "transactions/TravelCertificateDirect",
      element: <TravelCertificateDirect />,
    },
    {
      path: "transactions/CertificateAbroadDirect",
      element: <AbroadDirect />,
    },
    {
      path: "transactions/CertificateBirPatternDirect",
      element: <BIRpatternDirect />,
    },
    {
      path: "transactions/CertificateWaterConnectionDirect",
      element: <WaterConnectionDirect />,
    },
    {
      path: "transactions/CertificateStrandedDirect",
      element: <CertificationStrandedDirect />,
    },
    {
      path: "transactions/JobSeekerDirect",
      element: <JobSeekerDirect />,
    },
    {
      path: "transactions/ClearanceDirect",
      element: <ClearanceDirect />,
    },
    {
      path: "transactions/CertificateWaterConnectionDiscountDirect",
      element: <WaterConnectionDiscountDirect />,
    },
    {
      path: "transactions/CertificationLowIncomeDirect",
      element: <CertificationLowIncomeDirect />,
    },
    {
      path: "transactions/PhilHealthDirect",
      element: <PhilHealthDirect />,
    },
    {
      path: "transactions/LowIncomeSubsidizedDirect",
      element: <LowIncomeSubsidizedDirect />,
    },
    {
      path: "transactions/ChedScholarDirect",
      element: <ChedScholarDirect />,
    },
    {
      path: "transactions/BrgyCertificationDirect",
      element: <BrgyCertificationMultiPurposeDirect />,
    },
    {
      path: "transactions/LivelihoodDirect",
      element: <LivelihoodDirect />,
    },
    {
      path: "transactions/CertificationPabahayDirect",
      element: <PabahayDirect />,
    },
    {
      path: "transactions/ElectricConnectionDirect",
      element: <ElectricMeterDirect />,
    },
    {
      path: "transactions/GoodMoralDirect",
      element: <GoodMoralDirect />,
    },
    {
      path: "transactions/CaapAccessPassDirect",
      element: <CaapAccessPassDirect />,
    },
    {
      path: "transactions/BaligyaBaboyDirect",
      element: <BaligyaBaboyDirect />,
    },
    {
      path: "transactions/BrgyCertification2Direct",
      element: <BrgyCertification2Direct />,
    },
    {
      path: "transactions/BrgyCertification3Direct",
      element: <BrgyCertification3Direct />,
    },
    {
      path: "transactions/PaihawBaboyDirect",
      element: <PaihawBaboyDirect />,
    },
    {
      path: "transactions/DeathCertificateDirect",
<<<<<<< Updated upstream
      element: <DeathCertificateDirect/>,
    },
    {
      path: "transactions/MinorVaccinationDirect",
      element: <MinorVaccinationDirect/>
=======
      element: <DeathCertificateDirect />,
    },
    {
      path: "transactions/PhilSysDirect",
      element: <PhilSysDirect />,
>>>>>>> Stashed changes
    }

  ];

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="bottom-left">
          {User ? (
            <AppShell
              styles={{
                main: {
                  background:
                    theme.colorScheme === "dark"
                      ? theme.colors.darktheme[2]
                      : theme.colors.lighttheme[1],
                },
              }}
              navbarOffsetBreakpoint="sm"
              navbar={<NavbarContainer />}
              header={<HeaderContainer />}
            >
              <Group
                sx={(theme) => ({
                  background:
                    theme.colorScheme === "dark"
                      ? theme.colors.darktheme[2]
                      : theme.colors.lighttheme[2],
                  padding: `0 0.5rem`,
                  marginTop: `5.5rem`,
                  width: `${show && width > 765 ? `auto` : `100%`}`,
                  marginLeft: `${show && width > 765 ? `265px` : `none`}`,
                })}
              >
                <ScrollToTop />
                <Routes>
                  {RoutesNavigation.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element} />
                  ))}
                </Routes>
              </Group>
            </AppShell>
          ) : (
            <Auth />
          )}
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
