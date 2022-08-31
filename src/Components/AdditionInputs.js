import React, { useState } from "react";
import { NativeSelect, TextInput, createStyles, Button } from "@mantine/core";
import { KagawadNames } from "../config/dummyData";
import {} from "@mantine/core";
const useStyles = createStyles((theme) => ({
  textinputs: {
    width: "100%",
    margin: `0 ${theme.spacing.xxs}px`,
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
  },
}));

export const AdditionalInputs = () => {
  const [Price, setPrice] = useState("");
  const [Kagawad, setKagawad] = useState("samplekagawad1");
  const { classes } = useStyles();
  const HandleButton = () => {
    console.log("sample");
  };
  return (
    <>
      <TextInput
        className={classes.textinputs}
        label="Price"
        name="price"
        placeholder="Document Price"
        radius="sm"
        onChange={(e) => setPrice(e.currentTarget.value)}
      >
        DocumentPrice
      </TextInput>
      <NativeSelect
        className={classes.textinputs}
        data={KagawadNames}
        value={Kagawad}
        radius="sm"
        label="PWD"
        onChange={(event) => setKagawad(event.currentTarget.value)}
      >
        NativeSelectComponent
      </NativeSelect>
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
