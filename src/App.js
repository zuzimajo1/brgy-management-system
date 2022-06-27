import  { useState, useEffect } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
  MediaQuery,
  Container,
  Group
} from "@mantine/core";
import { useHotkeys, useLocalStorage, useViewportSize } from "@mantine/hooks";
import { Routes, Route } from "react-router-dom";
import { Auth, Events, Home, Scheduling, Documents, Search, RegisterAccount, Chat } from "./Pages";
import { NavbarContainer, HeaderContainer, Footer, FooterContainer } from "./Components";
import { useSelector } from "react-redux";

function App() {
  const [User, setUser] = useState(true);
  const { width } = useViewportSize();
  const show = useSelector(state=>state.navbar.show);

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'color-scheme',
    defaultValue: 'dark',
  })

  const toggleColorScheme = () => setColorScheme((current)=> (current === 'dark' ? 'light' : 'dark'));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const theme = {
    colorScheme,
    loader: "oval",
    fontsize: {
      xxs: 12,
      xs: 13,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    spacing: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 64 },
    container: {
      sizes: { xs: 520, sm: 720, md: 960, lg: 1140, xl: 1500 },
    },
    responsive: {
      laptop: 1024,
      tablet: 768,
      tabletS: 640,
      tabletXS: 550,
      mobileL: 480,
      mobileM: 400,
      mobileS: 360,
    },
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


  const RoutesNavigation = [{
    path: "/",
    element: <Home/>,
  },{
    path: "scheduling",
    element: <Scheduling/>,
  },{
    path: "events",
    element: <Events/>,
  },{
    path: "transactions",
    element: <Documents/>,
  },{
    path: "search",
    element: <Search/>
  },{
    path: "chat",
    element: <Chat/>,
  },{
    path: "registeraccount",
    element: <RegisterAccount/>,
  }]

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          {User ? (
            <AppShell
              styles={{
                main: {
                  background:
                    theme.colorScheme === "dark"
                      ? theme.colors.darktheme[2]
                      : theme.colors.lighttheme[1],
                  transition: `ease-in-out 500ms`,
                  
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
                  marginTop:`5.5rem`,
                  width: `${show && width > 765 ? `auto` : `100%`}`,
                  marginLeft: `${show && width > 765 ? `265px` : `none`}`,
                  transition: `ease-in-out 500ms`,
                })}
              >
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
