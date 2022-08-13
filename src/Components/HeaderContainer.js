import React from "react";
import {
  Header,
  Container,
  Avatar,
  MediaQuery,
  createStyles,
  Group,
  useMantineTheme,
  ActionIcon,
  Input,
  Button,
  Menu,
} from "@mantine/core";
import {
  Menu2,
  Search,
  AdjustmentsHorizontal,
  Settings,
  Logout,
  User,
} from "tabler-icons-react";
import { useFocusWithin, useDisclosure, useViewportSize } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { ShowNavbar, HideNavbar } from "../redux/NavbarRedux";
import ColorScheme from "./ColorScheme";
import Logo from "./Logo";
import { LogoutUser } from "../redux/UserRedux";

const useStyles = createStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 90,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[3]
        : theme.colors.lighttheme[0],
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    padding: `0 ${theme.spacing.md}px`,
    transition: `ease-in-out 500ms`,
  },
  text: {
    fontFamily: "Bold",
    marginLeft: 11,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85px",
    padding: "0",
    marginRight: `${theme.spacing.xl}px`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.lighttheme[0]
        : theme.colors.lighttheme[4],
    transition: `ease-in-out 500ms`,
  },
  container: {
    display: "flex",
    height: "85px",
    alignItems: "center",
    justifyContent: "space-between",
    border: `1px solid red`,
  },
  menuToggle: {
    marginLeft: "12rem",
    color: theme.colors.darktheme[0],
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[2]
        : theme.colors.lighttheme[1],
    border: "none",
    transition: `ease-in-out 500ms`,

    "&:hover": {
      background: theme.colors.darktheme[0],
      color: theme.colors.lighttheme[0],
    },
  },
  menuToggle2: {
    color: theme.colors.darktheme[0],
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[2]
        : theme.colors.lighttheme[1],
    border: "none",
    marginRight: "1rem",
    transition: `ease-in-out 500ms`,

    "&:hover": {
      background: theme.colors.darktheme[0],
      color: theme.colors.lighttheme[0],
    },
  },
  searchbar: {
    "&:hover": {
      border:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.darktheme[4]}`
          : `1px solid ${theme.colors.lighttheme[3]}`,
    },

    [theme.fn.smallerThan("md")]: {
      width: "20rem",
    },
  },
  hide: {
    display: "none",
  },
  paper: {
    height: "40px",
    marginTop: `${theme.spacing.xs}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  menuItem: {
    textTransform: "capitalize",
    padding: `${theme.spacing.xxs}px ${theme.spacing.xs}px`,

    "&:hover": {
      backgroundColor: theme.colors.darktheme[1],
    },
  },
  divider: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[0]
        : theme.colors.lighttheme[1],
  },
}));

const HeaderContainer = () => {
  const { classes, cx } = useStyles();
  const show = useSelector((state) => state.navbar.show);
  const { width } = useViewportSize();
  const dispatch = useDispatch();

  const ShowNavbarFunction = (condition) =>
    condition ? dispatch(ShowNavbar()) : dispatch(HideNavbar());

  return (
    <Header height={85} fixed={true} zIndex={90} className={classes.root}>
      <Group direction="row" position="left" className={classes.group}>
        <ActionIcon
          size="lg"
          variant="default"
          radius="md"
          className={cx(classes.menuToggle, {
            [classes.hide]: show && width <= 768,
          })}
          onClick={() => ShowNavbarFunction(!show)}
        >
          <Menu2 size={20} strokeWidth={2} />
        </ActionIcon>
        <Logo />
      </Group>
      <Group>
        <ColorScheme />
        <UserContainer classes={classes} dispatch={dispatch} />
      </Group>
    </Header>
  );
};

const SearchContainer = ({ classes }) => {
  const { ref, focused } = useFocusWithin();

  return (
    <MediaQuery smallerThan="sm" styles={classes.hide}>
      <Input
        icon={<Search size={14} />}
        ref={ref}
        placeholder="Search"
        sx={(theme) => ({
          border:
            theme.colorScheme === "dark"
              ? focused
                ? `1px solid ${theme.colors.darktheme[4]}`
                : `1px solid ${theme.colors.darktheme[2]}`
              : focused
              ? `1px solid ${theme.colors.lighttheme[3]}`
              : `1px solid ${theme.colors.lighttheme[1]}`,
          paddingRight: "3rem",
          width: "25rem",
          borderRadius: "10px",
        })}
        size="md"
        variant="unstyled"
        className={classes.searchbar}
        rightSection={
          <ActionIcon
            size="lg"
            radius="md"
            variant="default"
            className={classes.menuToggle2}
          >
            <AdjustmentsHorizontal size={20} strokeWidth={2} />
          </ActionIcon>
        }
      />
    </MediaQuery>
  );
};

const UserContainer = ({ classes, dispatch }) => {
  const admin = require("../images/admin.png");
  const [opened, handlers] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Menu
      opened={opened}
      onOpen={handlers.open}
      onClose={handlers.close}
      control={
        <Button
          variant="default"
          sx={(theme) => ({
            background:
              theme.colorScheme === "dark"
                ? opened
                  ? theme.colors.darktheme[0]
                  : theme.colors.darktheme[2]
                : opened
                ? theme.colors.darktheme[0]
                : theme.colors.lighttheme[1],
            color: opened
              ? theme.colors.lighttheme[0]
              : theme.colors.darktheme[0],
            width: "100px",
            border: "none",
            transition: `ease-in-out 500ms`,

            "&:hover": {
              color: theme.colors.lighttheme[0],
              background: theme.colors.darktheme[0],
            },
          })}
          radius="xl"
          size="md"
          leftIcon={<Avatar src={admin} alt="admin" radius="xl" />}
          rightIcon={<Settings size={25} strokeWidth={2} />}
        ></Button>
      }
    >
      <Container className={classes.paper}>
        <Menu.Item
          className={classes.menuItem}
          icon={<Logout size={25} strokeWidth={2} />}
          onClick={() => {
            dispatch(LogoutUser());
          }}
        >
          logout
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default HeaderContainer;
