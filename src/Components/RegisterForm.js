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
    "Purok 1 Payawan 1",
    "Purok 2 Payawan 2",
    "Purok 3 Payawan 1",
    "Purok 4 Payawan 1",
    "Purok 5 Payawan 1",
    "Purok 6 Payawan 2",
    "Purok 7 Payawan 2",
    "Purok 8 Payawan 2",
    "Purok 9 Ilang-Ilang",
    "Purok 10 Springville A",
    "Purok 11 Springville B",
    "Purok 12  Springville C",
    "Purok 13 Macresia/Greens Homes",
    "Purok 14 Love Bernadette Village",
    "Purok 15 Faith Bernadette Village",
    "Purok 16 Peace Bernadette Village",
    "Purok 16 Upper Malico",
    "Purok 18 Poblacion 2",
    "Purok 19 Rivcor Poblacion",
    "Purok 20 Tuazon Village",
    "Purok 21 Poblacion 3",
    "Purok 22 Airport Riverside",
    "Purok 23 Holy Cross Village Nembusco",
    "Purok 24 Sitio Looc",
    "Purok 25-A Sitio Looc",
    "Purok 25-B Sitio Looc",
    "Purok 26 Magbago Sitio Looc",
    "Purok 27 GK/EXIT Sitio Looc",
    "Purok 28-A Sitio Toril",
    "Purok 28-B Sitio Toril",
    "Purok 29-A Sitio Toril",
    "Purok 29-B Sitio Toril",
    "Purok 30 Highway Bacud",
    "Purok 31 Interior Sitio Bacud",
    "Purok 32 Pangpang Riverside Sitio Bacud",
    "Purok 33 Cortes Sitio Bacud",
    "Purok 34-A Sitio San Vicente",
    "Purok 34-B Sitio San Vicente",
    "Purok 35 Muslim Community",
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
