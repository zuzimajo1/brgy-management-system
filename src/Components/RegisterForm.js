import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addResidentStart,
  addResidentSuccess,
  addResidentsFailed,
} from "../redux/MasterlistRedux";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { publicRequest } from "../RequestMethod";
import { storage } from "../firebase";
import { DatePicker } from "@mantine/dates";

import {
  Container,
  TextInput,
  NativeSelect,
  Button,
  createStyles,
  Text,
  Loader,
} from "@mantine/core";
import { FileUpload } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
  formcontainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputimage: {
    width: "400px",
    height: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textinputs: {
    width: "100%",
    margin: `0 ${theme.spacing.xxs}px`,
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
  },
  hidden: {
    display: "none",
  },
  label: {
    display: "flex",
    cursor: "pointer",
  },
  group: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const RegisterForm = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [ImageNotifyValidator, setImageNotifyValidator] = useState(false);
  const [ImageFile, setImageFile] = useState(null);
  const [Imagename, setImagename] = useState("");
  const [InputValidator, setInputValidator] = useState(false);
  const [Form, setForm] = useState({});
  const [Loadingstate, setLoadingstate] = useState(false);

  const AllFunction = (e) => {
    const names = e.currentTarget.name;
    const values = e.currentTarget.value;
    setForm({ ...Form, [names]: values });
  };

  const [address, setaddress] = useState("Purok 1, Payawan 1");
  const [birthdate, setbirthdate] = useState("");
  const [sex, setsex] = useState("Male");
  const [civilstatus, setcivilstatus] = useState("Single");
  const [PWD, setPWD] = useState("Yes");
  const [fourpsmember, setfourpsmember] = useState("Yes");
  const [registervoter, setregistervoter] = useState("Yes");
  const [occupancystatus, setoccupancystatus] = useState("House Owner");

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
        setImagename("Not an image type!");
        setInputValidator(true);
      }
    }
  };

  const sexdata = ["Male", "Female"];

  const civilStatus = ["Single", "Married", "Divorced", "Widow", "Separated"];

  const selection = ["Yes", "No"];

  const housestatus = ["House Owner", "Renter", "Sharer"];

  const areas = [
    "Purok 1, Payawan 1",
    "Purok 2, Payawan 1",
    "Purok 3, Payawan 1",
    "Purok 4, Payawan 1",
    "Purok 5, Payawan 1",
    "Purok 6, Payawan 2",
    "Purok 7, Payawan 2",
    "Purok 8, Payawan 2",
    "Purok 9 Ilang-Ilang, Payawan 2",
    "Purok 10 Springville A, Payawan 2",
    "Purok 11 Springville B, Payawan 2",
    "Purok 11 Springville C, Payawan 2",
    "Purok 12 Macresia/Greens Homes, Payawan 2",
    "Purok 34 Muslim Community, Payawan 2",
    "Purok 5, Bernadette",
    "Purok 14, Bernadette",
    "Purok 15, Bernadette",
    "Purok 16, Bernadette",
    "Purok 20, Bernadette",
    "Purok 17 Poblacion 2, CentralPoblacion",
    "Purok 18 Rivcor Poblacion, CentralPoblacion",
    "Purok 19 Tuazon Village, CentralPoblacion",
    "Purok 20 Poblacion 3, CentralPoblacion",
    "Purok 21 Airport Riverside, CentralPoblacion",
    "Purok 22 Holy Cross/Nembusco, CentralPoblacion",
    "Purok 23, Looc",
    "Purok 24, Looc",
    "Purok 24-A, Looc",
    "Purok 25 Magbago, Looc",
    "Purok 26 GK/EXIT, Looc",
    "Purok 27, Toril",
    "Purok 27-A, Toril",
    "Purok 28, Toril",
    "Purok 28-A, Toril",
    "Purok 29 Highway Bacud, Bacud",
    "Purok 30 Interior, Bacud",
    "Purok 31 Pangpang Riverside, Bacud",
    "Purok 32 Cortes, Bacud",
    "Purok 33, SanVicente",
    "Purok 33-A, SanVicente",
  ];

  const HandleRegister = () => {
    setLoadingstate(true);
    if (
      (Form,
      address,
      sex,
      civilstatus,
      PWD,
      fourpsmember,
      registervoter,
      birthdate,
      occupancystatus)
    ) {
      if (ImageFile) {
        const storageRef = ref(storage, Imagename);
        const uploadTask = uploadBytesResumable(storageRef, ImageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              const inputs = {
                ...Form,
                image: url,
                birthdate: dayjs(birthdate).format("MMM D, YYYY"),
                address,
                sex,
                civilstatus,
                PWD: PWD === "Yes" ? true : false,
                fourpsmember: fourpsmember === "Yes" ? true : false,
                registervoter: registervoter === "Yes" ? true : false,
                occupancystatus,
              };

              const register = async () => {
                try {
                  const res = await publicRequest.post("resident", inputs);
                  setLoadingstate(false);
                  dispatch(addResidentSuccess(res.data));
                  showNotification({
                    title: "Register Successfully!",
                    message: "The data is registered successfully!",
                  });
                } catch (error) {
                  setLoadingstate(false);
                  showNotification({
                    title: "Error, Please try again",
                    message:
                      "Perhaps you're not connected to the internet or you omit any details",
                  });
                }
              };
              register();
            });
          }
        );
      } else {
        showNotification({
          title: "Input Image",
          message: "You forgot to input image",
        });
        setLoadingstate(false);
      }
    } else {
      setLoadingstate(false);
      showNotification({
        title: "Fill out all details",
        message: "Please don't omit any details",
      });
    }
  };

  return (
    <Container fluid="true" className={classes.formcontainer}>
      <Container className={classes.inputimage}>
        <label htmlFor="profilepic" className={classes.label}>
          <FileUpload size={28} strokeWidth={2} />
          <Text>
            {InputValidator ? `${Imagename}` : "Please select an image"}
          </Text>
        </label>
        <input
          type="file"
          id="profilepic"
          onChange={HandleImage}
          accept="image/jpg"
          className={classes.hidden}
        ></input>
      </Container>
      <div className={classes.group}>
        <TextInput
          className={classes.textinputs}
          label="First Name"
          name="firstname"
          placeholder="Input the firstname"
          radius="sm"
          onChange={AllFunction}
        />
        <TextInput
          className={classes.textinputs}
          label="Middle Name"
          name="middlename"
          placeholder="Input the middlename"
          radius="sm"
          onChange={AllFunction}
        />
      </div>
      <div className={classes.group}>
        <TextInput
          className={classes.textinputs}
          label="Last Name"
          name="lastname"
          placeholder="Input the lastname"
          radius="sm"
          onChange={AllFunction}
        />
        <TextInput
          className={classes.textinputs}
          label="Suffix"
          name="suffix"
          placeholder="Input the suffix"
          radius="sm"
          onChange={AllFunction}
        />
      </div>
      <div className={classes.group}>
        <TextInput
          className={classes.textinputs}
          label="Full Name"
          name="fullname"
          placeholder="Input the fullname"
          radius="sm"
          onChange={AllFunction}
        />
        <NativeSelect
          className={classes.textinputs}
          data={areas}
          value={address}
          radius="sm"
          label="Address"
          onChange={(e) => setaddress(e.currentTarget.value)}
        />
      </div>
      <div className={classes.group}>
        <DatePicker
          className={classes.textinputs}
          placeholder="Input the date of birth"
          label="Date of Birth"
          onChange={setbirthdate}
        />
        <TextInput
          className={classes.textinputs}
          label="Place of Birth"
          name="birthplace"
          placeholder="Input the birthplace"
          radius="sm"
          onChange={AllFunction}
        />
      </div>
      <div className={classes.group}>
        <NativeSelect
          className={classes.textinputs}
          value={sex}
          data={sexdata}
          label="Sex"
          radius="sm"
          onChange={(event) => setsex(event.currentTarget.value)}
        />

        <NativeSelect
          className={classes.textinputs}
          data={civilStatus}
          value={civilstatus}
          radius="sm"
          label="Civil Status"
          onChange={(event) => setcivilstatus(event.currentTarget.value)}
        />
      </div>
      <div className={classes.group}>
        <TextInput
          className={classes.textinputs}
          name="parentsname"
          label="Name of Parents"
          placeholder="Input the name of the parents"
          radius="sm"
          onChange={AllFunction}
        />
        <TextInput
          className={classes.textinputs}
          name="siblingsname"
          label="Name of Siblings"
          placeholder="Input the name of siblings"
          radius="sm"
          onChange={AllFunction}
        />
      </div>
      <div className={classes.group}>
        <TextInput
          className={classes.textinputs}
          name="citizenship"
          label="Citizenship"
          placeholder="Input the citizenship"
          radius="sm"
          onChange={AllFunction}
        />
        <TextInput
          className={classes.textinputs}
          name="occupation"
          label="Occupation"
          placeholder="Input the occupation"
          radius="sm"
          onChange={AllFunction}
        />
      </div>
      <div className={classes.group}>
        <NativeSelect
          className={classes.textinputs}
          data={selection}
          value={PWD}
          radius="sm"
          label="PWD"
          onChange={(event) => setPWD(event.currentTarget.value)}
        />
        <NativeSelect
          className={classes.textinputs}
          data={selection}
          value={fourpsmember}
          radius="sm"
          label="4P's"
          onChange={(event) => setfourpsmember(event.currentTarget.value)}
        />
      </div>
      <div className={classes.group}>
        <NativeSelect
          className={classes.textinputs}
          data={selection}
          value={registervoter}
          radius="sm"
          label="Register Voter"
          onChange={(event) => setregistervoter(event.currentTarget.value)}
        />
        <NativeSelect
          className={classes.textinputs}
          data={housestatus}
          value={occupancystatus}
          radius="sm"
          label="Housing Status"
          onChange={(event) => setoccupancystatus(event.currentTarget.value)}
        />
      </div>
      <Button
        onClick={HandleRegister}
        className={classes.registerbutton}
        variant="filled"
      >
        {Loadingstate ? <Loader size="sm" /> : "Register"}
      </Button>
    </Container>
  );
};

export default RegisterForm;
