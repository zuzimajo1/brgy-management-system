import React, { useState } from 'react'
import { Navbar, Text, Container, Divider, Group, createStyles, ScrollArea } from "@mantine/core";
import {
  Home,
  ClipboardList,
  CalendarEvent,
  Folder,
  Checklist,
} from "tabler-icons-react";
import { useViewportSize, useClickOutside } from "@mantine/hooks";
import { useDispatch, useSelector } from 'react-redux';
import { HideNavbar } from '../redux/NavbarRedux';
import { Link } from 'react-router-dom';
import { Logo } from './HeaderContainer';


const useStyles = createStyles((theme) => ({
  root: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[3]
        : theme.colors.lighttheme[0],
    border: "none",
    left: 0,
    transition: "ease-in-out 500ms",
    padding: 0,
  },
  container: {
    padding: `0 ${theme.spacing.md}px`,
    width: `100%`,
    height: `100vh`,
  },
  textTitle: {
    fontFamily: "Bold",
  },
  navbarsections: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: `100%`,
    padding: `10px 22px`,
    borderRadius: "18px",
    marginBottom: `-${theme.spacing.xs}px`,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.lighttheme[2]
        : theme.colors.darktheme[1],

    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.darktheme[1]
          : theme.colors.lighttheme[1],
      color: theme.colors.darktheme[0],
      cursor: "pointer",
      transition: "ease-in-out 250ms",
    },
  },
  navbarsectionsfocused: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[1]
        : theme.colors.lighttheme[1],
    color: theme.colors.darktheme[0],
    transition: `ease-in-out 500ms`,
  },
  text: {
    marginLeft: `${theme.spacing.md}px`,
    fontFamily: "Regular",
    fontSize: `15px`,
  },
  hide: {
    left: -1000,
    transition: "ease-in-out 500ms",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    border: `1px solid red`,
    padding: "0",
    marginRight: `${theme.spacing.xl}px`,
    width: "100%",
  },
  textlogo: {
    fontFamily: "Bold",
    marginLeft: 11,
  },
  hidden: {
    display: 'none',
  }
}));


const NavbarContainer = () => {
  const { classes, cx } = useStyles();
  const [Active, setActive] = useState(0);
  const ShowNavbar = useSelector(state => state.navbar.show);
  const { width } = useViewportSize();
  const dispatch = useDispatch();


  return (
    <>
      <MediaQueryNavbar width={width} Active={Active} setActive={setActive} dispatch={dispatch} classes={classes} cx={cx} ShowNavbar={ShowNavbar} />
    </>
  );
}


const MediaQueryNavbar = ({ width, Active, setActive, classes, dispatch, cx, ShowNavbar }) => {
  const ref = useClickOutside(() => dispatch(HideNavbar()));
  return (
    <Navbar
      hiddenBreakpoint="sm"
      height={`100vh`}
      ref={width <= 768 ? ref : null}
      p="xs"
      fixed
      position={{ top: 0, left: 0 }}
      width={{ base: 265 }}
      className={cx(classes.root, { [classes.hide]: ShowNavbar === false })}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs" pb="4rem">
        <Container className={classes.container}>
          <Group direction="column">
            <Text className={classes.textTitle} size="sm">
              Dashboard
            </Text>
            <Navbar.Section
              className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 0,
              })}
              onClick={() => {
                setActive(0);
                if (width <= 768) {
                  dispatch(HideNavbar());
                }
              }}
              component={Link}
              to="/"
            >
              <Home size={19} />
              <Text className={classes.text}>Home</Text>
            </Navbar.Section>
            <Navbar.Section
              className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 1,
              })}
              onClick={() => {
                setActive(1);
                if (width <= 768) {
                  dispatch(HideNavbar());
                }
              }}
              component={Link}
              to="masterlist"
            >
              <ClipboardList size={19} />
              <Text className={classes.text}>Masterlist</Text>
            </Navbar.Section>
          </Group>
          <Divider my="md" />
          <Group direction="column">
            <Text className={classes.textTitle} size="sm">
              Appointments
            </Text>
            <Navbar.Section
              className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 2,
              })}
              onClick={() => {
                setActive(2);
                if (width <= 768) {
                  dispatch(HideNavbar());
                }
              }}
              component={Link}
              to="events"
            >
              <CalendarEvent size={19} />
              <Text className={classes.text}>Events</Text>
            </Navbar.Section>
          </Group>
          <Divider my="md" />
          <Group direction="column">
            <Text className={classes.textTitle} size="sm">
              Transactions
            </Text>
            <Navbar.Section
              className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 3,
              })}
              onClick={() => {
                setActive(3);
                if (width <= 768) {
                  dispatch(HideNavbar());
                }
              }}
              component={Link}
              to="transactions"
            >
              <Folder size={19} />
              <Text className={classes.text}>Documents</Text>
            </Navbar.Section>
            <Navbar.Section
              className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 4,
              })}
              onClick={() => {
                setActive(4);
                if (width <= 768) {
                  dispatch(HideNavbar());
                }
              }}
              component={Link}
              to="report"
            >
              <Checklist size={19} />
              <Text className={classes.text}>Reports</Text>
            </Navbar.Section>
          </Group>
        </Container>
      </Navbar.Section>
    </Navbar>
  );
}



export default NavbarContainer