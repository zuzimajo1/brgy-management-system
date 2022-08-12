import React from 'react'
import { Container, Image, Text, createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85px",
    padding: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.lighttheme[0]
        : theme.colors.lighttheme[4],
    transition: `ease-in-out 500ms`,
  },
  text: {
    fontFamily: "Bold",
    marginLeft: 11,
  },
}));


const Logo = () => {
    const brgyluna = require("../images/BRGY_LUNA - Logo.png");
    const { classes } = useStyles();
  return (
    <Container className={classes.logoContainer}>
      <Image src={brgyluna} alt="BrgyLuna" width={50} height={50}></Image>
      <Text className={classes.text} size="lg" transform="uppercase">
        brgy luna management system with face recognition
      </Text>
    </Container>
  );
}

export default Logo