import React, { useLayoutEffect } from "react";
import { createStyles, Container, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { MessengerChat } from "react-messenger-chat-plugin";

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
  const [scroll, scrollTo] = useWindowScroll();
  const { classes } = useStyles();
  useLayoutEffect(() => {
    scrollTo({ y: 0 });
  }, []);

  return <div className={classes.container}>
    <MessengerChat
      pageId="110342451737951"
      language="sv_SE"
      themeColor={"#000000"}
      bottomSpacing={300}
      loggedInGreeting="loggedInGreeting"
      loggedOutGreeting="loggedOutGreeting"
      greetingDialogDisplay={"show"}
      debugMode={true}
      onMessengerShow={() => {
        console.log("onMessengerShow");
      }}
      onMessengerHide={() => {
        console.log("onMessengerHide");
      }}
      onMessengerDialogShow={() => {
        console.log("onMessengerDialogShow");
      }}
      onMessengerDialogHide={() => {
        console.log("onMessengerDialogHide");
      }}
      onMessengerMounted={() => {
        console.log("onMessengerMounted");
      }}
      onMessengerLoad={() => {
        console.log("onMessengerLoad");
      }}
    />
  </div>;
};

export default Chat;
