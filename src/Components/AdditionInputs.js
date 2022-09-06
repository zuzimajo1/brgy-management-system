import React, { useState } from "react";
import {
  TextInput,
  createStyles,
  Button,
  Divider,
  Container,
  NumberInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { publicRequest } from "../RequestMethod";
import { RecordAdd } from "../redux/RecordRedux";
import { useDispatch } from "react-redux";
const useStyles = createStyles((theme) => ({
  textinputs: {
    width: "90%",
    margin: `0 ${theme.spacing.xxs}px`,
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
  },
  borderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const AdditionInputs = ({ clientname, lettername }) => {
  const [letterprice, setPrice] = useState();
  const [Form, setForm] = useState({});
  // const [kagawad, setKagawad] = useState("samplekagawad1");
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const AllFunction = (e) => {
    const nameForm = e.target.name;
    const valueForm = e.currentTarget.value;
    setForm({ ...Form, [nameForm]: valueForm });
  };

  const HandleButton = () => {
    if (clientname) {
      if (Form && lettername && letterprice) {
        const input = {
          ...Form,
          lettername,
          letterprice,
          clientname,
        };
    
        const recordData = async () => {
          try {
            const res = await publicRequest.post("record", input);
            dispatch(RecordAdd(res.data));
            showNotification({
              title: "Record Successfully!",
              message: "The transaction was recorded in report logs",
            });
          } catch (error) {
            showNotification({
              title: "Error!",
              message: "Posting Error",
            });
          }
        };

        recordData();
      } else {
        showNotification({
          title: "Error!",
          message: "Please don't omit any details",
        });
      }
    } else {
      showNotification({
        title: "No ClientName!",
        message: "You forgot to input clientname",
      });
    }
  };
  return (
    <Container fluid="true" className={classes.borderContainer}>
      <Divider
        my="xs"
        color="blue"
        label="PLEASE FILL THIS ONE BEFORE PRINTING FOR LOGGING PURPOSES"
        labelPosition="center"
        mt={25}
        mb={20}
      />
      <TextInput
        className={classes.textinputs}
        label="Clerk on Duty"
        name="staffname"
        placeholder="Clerk Name"
        radius="sm"
        onChange={AllFunction}
      />
      <NumberInput
        className={classes.textinputs}
        label="Price"
        name="letterprice"
        placeholder="Document Price"
        radius="sm"
        onChange={setPrice}
      />

      <TextInput
        className={classes.textinputs}
        label="Kagawad on Duty"
        name="kagawadname"
        placeholder="Kagawad Name"
        radius="sm"
        onChange={AllFunction}
      />

      <Button
        onClick={HandleButton}
        className={classes.registerbutton}
        variant="filled"
      >
        Record on logs
      </Button>
    </Container>
  );
};

export default AdditionInputs;
