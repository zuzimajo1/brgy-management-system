import React,{useLayoutEffect, useRef, useState, useEffect} from 'react'
import { createStyles, Container, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import * as faceapi from "face-api.js";
const useStyles = createStyles((theme) => ({
  container: {
    fontFamily: "Regular",
    width: "100%",
    height: `100vh`,
    borderRadius: `20px`,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    transition: "ease-in-out 500ms",
  },
}));



const Events = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const { classes } = useStyles();
  useLayoutEffect(() => {
    scrollTo({ y: 0 });
  }, []);


  return <div className={classes.container}>Events</div>;
}

export default Events