import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import {
  Container,
  TextInput,
  NumberInput,
  NativeSelect,
  Button,
  createStyles,
  Text
} from "@mantine/core";
import { FileUpload } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
  formcontainer: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputimage: {
    width: "400px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textinputs: {
    width: "100%",
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
  },
  hidden:{
    display: 'none',
  },
  label:{
    display: 'flex',
    cursor: 'pointer',
  },
}));

const RegisterForm = ({ Image }) => {
  const { classes } = useStyles();
  const [ImageNotifyValidator, setImageNotifyValidator] = useState(false);
  const [ImageFile, setImageFile] = useState(null);
  const [Imagename, setImagename] = useState('');
  const [InputValidator, setInputValidator] = useState(false);

  const HandleImage = (e) => {
    if (!e.target.files[0]) {
      ImageNotifyValidator && setImageNotifyValidator(true);
      ImageFile && setImageFile(ImageFile);
    } else {
      if (e.target.files[0].type === "image/jpeg") {
        
        setImageFile(e.target.files[0]);
        setImagename(e.target.files[0].name);
        setImageNotifyValidator(false);
        setInputValidator(true);
      } else {
        showNotification({
          title: "Not Image Type",
          message: "You inputted a non-image type! 🤥",
        });
        
        setImageFile(null);
        setImageNotifyValidator(true);
        setImagename('Not an image type!')
         setInputValidator(true);
      }
    }
  };

  const areas = [
    "Sitio Looc",
    "Sitio Bernadette",
    "Sitio Payawan 1",
    "Sitio Payawan 2",
    "Sitio Central Poblacion",
    "Sitio Bacud",
    "Sitio Toril",
    "Sitio San Vicente",
  ];

  return (
    <Container fluid="true" className={classes.formcontainer}>
      <Container className={classes.inputimage}>
        <label htmlFor="profilepic" className={classes.label}>
          <FileUpload size={28} strokeWidth={2} />
          <Text>{InputValidator ? `${Imagename}` : 'Please select an image'}</Text>
        </label>
        <input
          type="file"
          id="profilepic"
          onChange={HandleImage}
          accept="image/jpg"
          className={classes.hidden}
        ></input>
      </Container>

      <TextInput
        className={classes.textinputs}
        label="Name"
        radius="sm"
        required
      />
      <TextInput
        className={classes.textinputs}
        label="MiddleName"
        radius="sm"
        required
      />
      <TextInput
        className={classes.textinputs}
        label="Surname"
        radius="sm"
        required
      />
      <NumberInput
        className={classes.textinputs}
        label="Age"
        radius="sm"
        required
      />
      <NativeSelect
        className={classes.textinputs}
        data={areas}
        placeholder="Select one"
        radius="sm"
        label="Select the area"
        required
      />
      <Button className={classes.registerbutton} variant="filled">
        Button
      </Button>
    </Container>
  );
};

export default RegisterForm;
