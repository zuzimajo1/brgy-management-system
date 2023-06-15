import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import {
  Button,
  Modal,
  Text,
  TextInput,
  createStyles,
  Container,
} from "@mantine/core";
import { DeleteSingleEvent } from "../redux/apiCalls";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { CreateBrgyEvent } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { eventsReset } from "../redux/EventRedux";

const useStyles = createStyles((theme) => ({
  textinputs: {
    width: "100%",
    margin: `0 ${theme.spacing.xxs}px`,
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
    alignContent: "center",
  },
  deletebutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
    alignContent: "center",
    backgroundColor: "#D5786B",
    color: "white",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

const CalendarView = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [dateData, setDateData] = useState({});
  const [eventData, setEventData] = useState(null);
  const [eventAboutData, setEventAboutData] = useState("");
  const [createEventModal, setcreateEventModal] = useState(false);
  const [eventDataEnd, seteventDataEnd] = useState("");
  const [eventID, seteventID] = useState(null);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  const handleDateSelect = (selectInfo) => {
    setcreateEventModal(true);
    setDateData(selectInfo.startStr);
  };

  const handleDateClick = (e) => {
    setEventData(e.event.title);
    setDateData(e.event.start);
    setEventAboutData(e.event.extendedProps.about);
    seteventDataEnd(e.event.end);
    seteventID(e.event.id);
    setOpened(true);
  };

  const handlecreateevent = () => {
    const input = {
      title: eventData,
      about: eventAboutData,
      start: dateData,
      end: dayjs(eventDataEnd).add(1, 'day').format('YYYY-MM-DD'),
    };

    CreateBrgyEvent(dispatch, input, showNotification, setcreateEventModal);
  };

 

  return (
    <div>
      <FullCalendar
        events={events}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={650}
        eventClick={(e) => handleDateClick(e)} // For user to view the details of the event
        // eventClick={handleDeleteEvent} // For Admin to delete the event
        selectable={true}
        select={handleDateSelect}
      />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Event Details"
        centered
      >
        <Text>What: {eventData}</Text>
        <Text>About: {eventAboutData || "none"}</Text>
        <Text>Start of event: {dayjs(dateData).format("dddd, MMMM D")}</Text>
        <Text>End of event: {dayjs(eventDataEnd).subtract(1, 'day').format("dddd, MMM D ")}</Text>
        <Container fluid="true" className={classes.modal}>
          <Button
            className={classes.deletebutton}
            variant="unstyled"
            onClick={()=>{
              DeleteSingleEvent(
                dispatch,
                eventID,
                showNotification,
                setOpened,
                eventData
              );
            }}
          >
            Delete
          </Button>
        </Container>
      </Modal>
      <Modal
        opened={createEventModal}
        onClose={() => setcreateEventModal(false)}
        title="Create Events"
        centered
      >
        <Container fluid="true" className={classes.modal}>
          <TextInput
            className={classes.textinputs}
            name="eventname"
            label="Name of Event"
            placeholder="Input the name of event"
            radius="sm"
            onChange={(e) => setEventData(e.currentTarget.value)}
          ></TextInput>
          <TextInput
            className={classes.textinputs}
            name="eventdescription"
            label="Description of Event (optional)"
            placeholder="Input the description of the event"
            radius="sm"
            onChange={(e) => setEventAboutData(e.currentTarget.value)}
          ></TextInput>
          <TextInput
            className={classes.textinputs}
            value={dayjs(dateData).format("MMMM D, YYYY")}
            label="Start of the Event"
            disabled
          ></TextInput>
          <DatePicker
            className={classes.textinputs}
            placeholder="Input the end day of event"
            label="End of the Event"
            onChange={seteventDataEnd}
          />
          <Button
            className={classes.registerbutton}
            variant="filled"
            onClick={handlecreateevent}
          >
            Create
          </Button>
        </Container>
      </Modal>
    </div>
  );
};

export default CalendarView;
