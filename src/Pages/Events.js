import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { createStyles, Container, Group } from "@mantine/core";
import { Document, Page } from "react-pdf";

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
  const [data, setdata] = useState('');
  const { classes } = useStyles();


  return (
    <div className={classes.container}>Event</div>
  );
}

export default Events