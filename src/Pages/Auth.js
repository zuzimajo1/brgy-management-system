import React, {useState} from 'react'
import { Container, createStyles, Group, Text, TextInput, ActionIcon, Button} from "@mantine/core"
import { Logo } from '../Components';
import { EyeOff, Eye } from "tabler-icons-react";


const useStyles = createStyles((theme) => ({
  root: {
    height: `100vh`,
    width: `100%`,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[3]
        : theme.colors.lighttheme[2],
    transition: `ease-in-out 500ms`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    transition: `ease-in-out 500ms`,
    height: `440px`,
    width: "475px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: `0 ${theme.spacing.lg}px`,

    [theme.fn.smallerThan("sm")]: {
      width: "445px",
      padding: `0 ${theme.spacing.md}px`,
      height: `420px`,
    },

    [theme.fn.smallerThan("xs")]: {
      width: "415px",
      padding: `0 ${theme.spacing.md}px`,
      height: `410px`,
    },

  },
  logoContainer: {
    width: "100%",
  },
  text: {
    fontSize: `${theme.spacing.lg}px`,
    fontFamily: "Bold",
    color: theme.colors.darktheme[0],

    [theme.fn.smallerThan("xs")]: {
      fontFamily: "Regular",
      fontSize: "19px",
    },
  },
  text2: {
    fontSize: `${theme.spacing.md}px`,
    fontFamily: "Regular",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.lighttheme[0]
        : theme.colors.lighttheme[3],
    transition: `ease-in-out 500ms`,

  },
  inputs: {
    width: "100%",
    padding: `0 ${theme.spacing.md}px`,
    borderRadius: "20px",
    border:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.darktheme[2]}`
        : `1px solid ${theme.colors.lighttheme[2]}`,
    transition: `ease-in-out 500ms`,

    "&:hover": {
      border:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.darktheme[4]}`
          : `1px solid ${theme.colors.lighttheme[3]}`,
    },
  },
  button: {
    background: theme.colors.darktheme[0],
    color: theme.colors.lighttheme[0],
    marginTop: `${theme.spacing.xs}px`,
    "&:hover": {
      background: `rgba(0, 137, 123, 0.7)`,
    },
  },
}));



const Auth = () => {
  const { classes } = useStyles();
  const [showPassword, setshowPassword] = useState(false);
   
  return (
    <Container className={classes.root} fluid="true">
      <Group className={classes.form} direction="column">
        <Container fluid="true" className={classes.logoContainer}>
          <Logo />
        </Container>
        <Text className={classes.text} transform="capitalize">
          hi, welcome
        </Text>
        <Text className={classes.text2}>
          Enter your credentials to continue
        </Text>
        <TextInput
          className={classes.inputs}
          variant="unstyled"
          label="Username"
          size="xs"
        />
        <TextInput
          className={classes.inputs}
          rightSection={
            <ActionIcon onClick={() => setshowPassword(!showPassword)}>
              {showPassword ? (
                <Eye size={18} strokeWidth={2} />
              ) : (
                <EyeOff size={18} strokeWidth={2} />
              )}
            </ActionIcon>
          }
          type={showPassword ? "text" : "password"}
          variant="unstyled"
          label="Password"
          size="xs"
        />
        <Button  size="md" radius='md' className={classes.button} fullWidth="true">
          Sign In
        </Button>
      </Group>
    </Container>
  );
}

export default Auth