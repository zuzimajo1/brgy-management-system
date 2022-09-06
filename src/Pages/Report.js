import React, { useState, useLayoutEffect } from 'react'
import {
  createStyles,
  Group,
  Paper,
  Button,
  Tooltip,
  NativeSelect,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import {
  Logs, months,
} from "../config/dummyData";
import { showNotification } from "@mantine/notifications";
import DataTable from "react-data-table-component";
import {
  ArrowNarrowDown
} from "tabler-icons-react";
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { GetAllRecords } from '../redux/apiCalls';

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
const customStyles = {
  header: {
    style: {
      textAlign: "left",
      marginBottom: "25px",
      padding: 0
    },
  },
  table: {
    style: {
      textAlign: "center",
    },
  },
  headCells: {
    style: {
      textAlign: "center",
      border: "0.5px solid black",
      borderWidth: "thin",
    },
  },
  cells: {
    style: {
      textAlign: "center",
      border: "0.5px solid black",
      borderWidth: "thin",
    },
  },
};

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(Logs[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach(item => {
    let ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = `brgy-transaction-records-${dayjs(new Date()).format("MM/DD/YYYY")}.csv`;

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}


const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export Record as CSV</Button>;

const columns = [
  {
    name: "Resident",
    selector: (row) => row.clientname,
    sortable: true,
    center: true,
  },
  {
    name: "Document Type",
    selector: (row) => row.lettername,
    sortable: true,
    center: true,
  },
  {
    name: "Clerk on Duty",
    selector: (row) => row.staffname,
    sortable: true,
    center: true,
  },
  {
    name: "Kagawad on Duty",
    selector: (row) => row.kagawadname,
    sortable: true,
    center: true,
  },

  {
    name: "Payment",
    selector: (row) => row.letterprice,
    sortable: true,
    center: true,
  },
  {
    name: "Issued On",
    selector: (row) => dayjs(row.createdAt).format("MMM D, YYYY"),
    sortable: true,
    center: true,
  },
];

const Report = ({ colorScheme }) => {
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(Logs)} />, []);
  const records = useSelector((state)=> state?.recordData?.records)
  const status = "success";
  const dispatch = useDispatch();
  const { classes } = useStyles();
  // Filter
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByYear, setFilterByYear] = useState("");

  useLayoutEffect(()=>{
    GetAllRecords(dispatch, showNotification);
  },[dispatch])



  const filteredItems = records?.filter((item) => {
    if (filterByDate) {
      return dayjs(item.createdAt).format("MMM D, YYYY").toLowerCase().includes(dayjs(filterByDate).format("MMM D, YYYY").toLowerCase())
    } else if (filterByYear) {
      if (filterByMonth !== "NA" && dayjs(item.createdAt).format("YYYY").toLowerCase() === filterByYear) {
        return dayjs(item.createdAt).format("MMM").toLowerCase().includes(filterByMonth.toLowerCase())
      } else {
        return dayjs(item.createdAt).format("YYYY").toLowerCase().includes(dayjs(filterByYear).format("YYYY").toLowerCase())
      }
    } else if (filterByMonth === "NA") {
      return item
    } else {
      return item
    }
  });

  const totalPayments = filteredItems.reduce((currentTotal, item) => {
    return currentTotal += item.letterprice
  }, 0)

  return (
    <Paper className={classes.container}>
      <Group position="apart" mb="md" mt="md" className={classes.head}>
        <Group position="left" className={classes.head}>
          <Tooltip
            label="Sort Table by Date"
            withArrow
            radius="md"
            position="bottom"
          >
            <DatePicker placeholder="Pick date" label="Sort Date" onChange={setFilterByDate} />
          </Tooltip>
          <Tooltip
            label="Sort Table by Months"
            withArrow
            radius="md"
            position="bottom"
          >
            <NativeSelect
              data={months}
              className={classes.textinputs}
              label="Months"
              onChange={(event) => setFilterByMonth(event.currentTarget.value)}
            />
          </Tooltip>
          <Tooltip
            label="Sort Table by Year"
            withArrow
            radius="md"
            position="bottom"
          >
            <TextInput
              className={classes.textinputs}
              label="Year"
              name="year"
              placeholder="2022"
              radius="sm"
              onChange={(e) => setFilterByYear(e.currentTarget.value)}
            />
          </Tooltip>
        </Group>
        <Title order={4}>Total Payments: ₱ {totalPayments}</Title>
      </Group>
      <DataTable
        title="Transaction Records"
        columns={columns}
        data={filteredItems}
        actions={actionsMemo}
        pagination
        highlightOnHover
        pointerOnHover
        progressPending={status === "loading"}
        sortIcon={<ArrowNarrowDown />}
        theme={colorScheme === "dark" ? "dark" : "light"}
        customStyles={customStyles}
        responsive
        dense />
    </Paper>
  );
};

export default Report