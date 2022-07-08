import React, { useLayoutEffect } from "react";
import { createStyles, Container, Group } from "@mantine/core";


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

const Chat = () => {
  const { classes } = useStyles();

  return <div className={classes.container}>
    Chat
  </div>;
};

export default Chat;
