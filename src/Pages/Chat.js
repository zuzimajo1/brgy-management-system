import React, { useLayoutEffect } from "react";
import { createStyles, Container, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import MessengerCustomerChat from 'react-messenger-customer-chat';

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
    <MessengerCustomerChat
      pageId="110342451737951"
      appId="721124622521891"
    />
  </div>;
};

export default Chat;
