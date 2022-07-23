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
import {
  Auth,
  Events,
  Home,
  Documents,
} from "./Pages";
import {
  Abroad,
  BarangayAcceptance,
  BIRpattern,
  BrgyCertificationMultiPurpose,
  BuildingPermit,
  BurialAssistance,
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
import BarangayAcceptance2 from "./BrgyFiles/BarangayAcceptance2";

function App() {
  const User = useSelector((state) => state.user.loginStatus);
  // const [User, setUser] = useState(false);
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
