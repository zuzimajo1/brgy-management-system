import React from 'react'
import {
  createStyles,
  Group,
  Paper,
  TextInput,
  Button,
  Space,
  Modal,
  Tooltip,
  Image,
  NativeSelect,
  Text,
  Container,
  Loader,
} from "@mantine/core";
import {
  Bacud,
  Bernadette,
  CentralPoblacion,
  Looc,
  Payawan1,
  Payawan2,
  SanVicente,
  Toril,
} from "../config/dummyData";

import DataTable from "react-data-table-component";
import {
  ArrowNarrowDown,
  Edit,
  Eye,
  Trash,
  FileDescription,
} from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllDataResident,
  UpdateDataResident,
  DeleteDataResident,
} from "../redux/apiCalls";

import {
  areas,
  sexdata,
  civilStatus,
  selection,
  housestatus,
} from "../Components/Data";

import { CreateDocument } from "../redux/FaceRecognitionRedux";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    fontFamily: "Regular",
    width: "100%",
    height: "fit-content",
    padding: 15,
    background:
      theme.colorScheme === "dark" ? "#424242" : theme.colors.lighttheme[0],
  },
  paper: {
    borderRadius: 15,
    backgroundColor:
      theme.colorScheme === "dark" ? "#424242" : theme.colors.gray[0],

    width: "100%",
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
  containermodalupdate: {
    width: 430,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Report = () => {
    const { classes } = useStyles();
  return <Paper className={classes.container}>Report</Paper>;
}

export default Report