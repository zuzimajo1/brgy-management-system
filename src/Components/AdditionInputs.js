
import React, { useState } from "react";
import { NativeSelect, TextInput, createStyles, Button, Divider } from "@mantine/core";
import { KagawadNames } from "../config/dummyData";
const useStyles = createStyles((theme) => ({
  textinputs: {
    width: "80%",
    margin: `0 ${theme.spacing.xxs}px`,
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
  },
}));

const AdditionInputs = ({ issuer, documentName }) => {
  const [price, setPrice] = useState("");
  const [kagawad, setKagawad] = useState("samplekagawad1");
  const { classes } = useStyles();
  const HandleButton = () => {
    console.log({ issuer, documentName, price, kagawad })
  };
  return (
    <>
      <Divider my="xs" color="red " label="PLEASE FILL THIS ONE BEFORE PRINTING FOR LOGGING PURPOSES" labelPosition="center" mt={25} mb={20} />
      <TextInput
        className={classes.textinputs}
        label="Price"
        name="price"
        placeholder="Document Price"
        radius="sm"
        onChange={(e) => setPrice(e.currentTarget.value)}
      />

      <NativeSelect
        data={KagawadNames}
        className={classes.textinputs}
        label="Kagawad on Duty"
        onChange={(event) => setKagawad(event.currentTarget.value)}
      />

      <Button
        onClick={HandleButton}
        className={classes.registerbutton}
        variant="filled"
      >
        Record on logs
      </Button>
    </>
  );
};

export default AdditionInputs
