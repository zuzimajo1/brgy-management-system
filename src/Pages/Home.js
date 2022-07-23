import React, { useLayoutEffect, useState } from "react";
import {
  createStyles,
  Container,
  Text,
  ActionIcon,
  Image,
} from "@mantine/core";
import { User } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { GetEventToday, GetAllDataResident } from "../redux/apiCalls";
import { showNotification } from "@mantine/notifications";
import {
  FaceGetInfoFailed,
} from "../redux/FaceRecognitionRedux";
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
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 180,
    padding: `${theme.spacing.md}px`,
    justifyContent: "space-between",
  },
  containerwrapper: {
    margin: `0 ${theme.spacing.xs}px`,
    width: "100%",
    borderRadius: 15,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[2]
        : theme.colors.lighttheme[2],
  },
  text: {
    margin: `${theme.spacing.lg}px 0`,
    fontFamily: "Regular",
  },
  residentcount: {
    fontFamily: "Bold",
    marginLeft: 10,
  },
  textBold:{
    fontFamily: "Bold",
  },
  icon: {
    color: theme.colorScheme === "dark" ? "white" : "black",
  },
  actionIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  countwrapper: {
    display: "flex",
  },
  eventWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  noeventwrapper:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  eventcontainer:{
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Home = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const TodayEvent = useSelector(state=>state.eventtoday?.eventtoday)
  const Resident = useSelector(state=>state.masterlist?.residents)

  useLayoutEffect(()=>{
    GetEventToday(dispatch, showNotification);
    GetAllDataResident(dispatch);
    // dispatch(FaceGetInfoFailed());
  },[dispatch])


  return (
    <div className={classes.container}>
      <div className={classes.wrapper} fluid="true">
        <Container className={classes.containerwrapper}>
          <EventContainer classes={classes} TodayEvent={TodayEvent} />
        </Container>
        <Container className={classes.containerwrapper}>
          <ResidentContainer classes={classes} Resident={Resident} />
        </Container>
      </div>
    </div>
  );
};

const EventContainer = ({ classes,TodayEvent }) => {
  if(!TodayEvent){
    return <div className={classes.noeventwrapper}>
      <Text>No Event Today</Text>
    </div>;
  }

  
  return (
    <div className={classes.eventWrapper}>
      <Image
        src={require("../images/confetti-bottomleft.png")}
        alt="confetti2"
        width="110px"
        height="100%"
      ></Image>
      <div className={classes.eventcontainer}>
        <Text size="lg">Event Today</Text>
        <Text size="lg" className={classes.textBold}>
          {TodayEvent.title}
        </Text>
      </div>
      <Image
        src={require("../images/confetti-bottomright.png")}
        alt="confetti2"
        width="110px"
        height="100%"
      ></Image>
    </div>
  );
};

const ResidentContainer = ({ classes, Resident }) => {
  return (
    <div>
      <Text size="lg" className={classes.text}>
        {Resident.length <= 1
          ? "Total of registered resident"
          : "Total of registered residents"}
      </Text>
      <div className={classes.countwrapper}>
        <ActionIcon variant="default" className={classes.actionIcon}>
          <User className={classes.icon} size={25} strokeWidth={2} />
        </ActionIcon>
        <Text size="xl" className={classes.residentcount}>
          {Resident.length}
        </Text>
      </div>
    </div>
  );
};

export default Home;
