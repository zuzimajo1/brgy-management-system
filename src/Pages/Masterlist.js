import React, { useState, useLayoutEffect } from "react";
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
  Loader
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

const customStyles = {
  header: {
    style: {
      textAlign: "center",
      marginBottom: "25px",
    },
  },
  table: {
    style: {
      textAlign: "center",
    },
  },
  headCells: {
    style: {
      border: "0.5px solid black",
      borderWidth: "thin",
    },
  },
  cells: {
    style: {
      border: "0.5px solid black",
      borderWidth: "thin",
    },
  },
};

const Masterlist = ({ colorScheme }) => {
  const status = "success";
  // Style and Filter States
  const [focused, setFocused] = useState(false);
  const [filterByName, setFilterByName] = useState("");
  const [filterBySitio, setFilterBySitio] = useState("");
  const [filterByPurok, setFilterByPurok] = useState("");
  const dispatch = useDispatch();
  const populace = useSelector((state) => state.masterlist.residents);

  useLayoutEffect(() => {
    GetAllDataResident(dispatch);
  }, [dispatch]);

  const sitio = [
    "ALL",
    "PAYAWAN 1",
    "PAYAWAN 2",
    "CENTRAL POBLACION",
    "BACUD",
    "SAN VICENTE",
    "LOOC",
    "BERNADETTE",
    "TORIL",
  ];

  const { classes } = useStyles({
    floating: filterByName.trim().length !== 0 || focused,
  });
  // Modal States
  const [viewUserOpened, setViewUserOpened] = useState(false);
  const [editProfileOpened, setEditProfileOpened] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  // Selected Row Resident State
  const [selectedResidentData, setSelectedResidentData] = useState(null);
  const [residentIdToDelete, setResidentIdToDelete] = useState(null);
  const [selectedResidentUpdate, setselectedResidentUpdate] = useState(null);

  //Data for Update State
  const [updateAddress, setupdateAddress] = useState("");
  const [updateBirthplace, setupdateBirthplace] = useState("");
  const [updateBirthdate, setupdateBirthdate] = useState("");
  const [updateSex, setupdateSex] = useState("");
  const [updateCivilStatus, setupdateCivilStatus] = useState("");
  const [updateParentsname, setupdateParentsname] = useState("");
  const [updateSiblingsname, setupdateSiblingsname] = useState("");
  const [updateCitizenship, setupdateCitizenship] = useState("");
  const [updateOccupation, setupdateOccupation] = useState("");
  const [updatePWD, setupdatePWD] = useState("");
  const [updatefourpsmember, setupdatefourpsmember] = useState("");
  const [updateregistervoter, setupdateregistervoter] = useState("");
  const [updateoccupancystatus, setupdateoccupancystatus] = useState("");
  const [UpdateStatus, setUpdateStatus] = useState(false);

  // Handlers
  const handleUserViewButtonClick = (resident) => {
    setViewUserOpened(true);
    setSelectedResidentData(resident);
  };

  const handleUserUpdateButtonClick = (resident) => {
    setEditProfileOpened(true);
    setselectedResidentUpdate(resident);
    setupdatePWD(resident?.PWD);
    setupdatefourpsmember(resident?.fourpsmember);
    setupdateregistervoter(resident?.registervoter)
  };

  const handleUserDeleteButtonClick = (id) => {
    setResidentIdToDelete(id);
    setDeleteUserModal(true);
  };

  const handleUserDelete = () => {
    DeleteDataResident(
      dispatch,
      residentIdToDelete,
      showNotification,
      setDeleteUserModal
    )
  };


  //Update Function

  const handleUserUpdate = () => {
    setUpdateStatus(true);

    const updatedValues = {
      id: selectedResidentUpdate?.id,
      image: selectedResidentUpdate?.image,
      firstname: selectedResidentUpdate?.firstname,
      middlename: selectedResidentUpdate?.middlename,
      lastname: selectedResidentUpdate?.lastname,
      suffix: selectedResidentUpdate?.suffix && selectedResidentUpdate?.suffix,
      address: updateAddress || selectedResidentUpdate?.address,
      birthdate: updateBirthdate || selectedResidentUpdate?.birthdate,
      birthplace: updateBirthplace || selectedResidentUpdate?.birthplace,
      sex: updateSex || selectedResidentUpdate?.sex,
      civilstatus: updateCivilStatus || selectedResidentUpdate?.civilstatus,
      parentsname: updateParentsname || selectedResidentUpdate?.parentsname,
      siblingsname: updateSiblingsname || selectedResidentUpdate?.siblingsname,
      citizenship: updateCitizenship || selectedResidentUpdate?.citizenship,
      occupation: updateOccupation || selectedResidentUpdate?.occupation,
      PWD: updatePWD === "Yes" ? true : false,
      fourpsmember: updatefourpsmember === "Yes" ? true : false,
      registervoter: updateregistervoter === "Yes" ? true : false,
      occupancystatus: updateoccupancystatus || selectedResidentUpdate?.occupancystatus,
    };


    UpdateDataResident(
      dispatch,
      selectedResidentUpdate?.id,
      showNotification,
      setUpdateStatus,
      updatedValues,
      setEditProfileOpened
    );


  }

  // Table Configs
  const usersColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Image",
      wrap: true,
      cell: (row) => <Image height={80} width={80} src={row.image} />,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstname,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Middle Name",
      selector: (row) => row.middlename,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Suffix",
      selector: (row) => (row.suffix ? row.suffix : ""),
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Purok",
      selector: (row) => row.address.split(", ")[0],
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sitio",
      selector: (row) => row.address.split(", ")[1],
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date of Birth",
      selector: (row) => row.birthdate,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Place of Birth",
      selector: (row) => row.birthplace,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Civil Status",
      selector: (row) => row.civilstatus,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Parent's Name",
      selector: (row) => row.parentsname,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sibling's Name/s",
      selector: (row) => row.siblingsname,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Citizenship",
      selector: (row) => row.citizenship,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Occupation",
      selector: (row) => row.occupation,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "PWD",
      selector: (row) => (row.PWD ? "Yes" : "No"),
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "4P's",
      selector: (row) => (row.fourpsmember ? "Yes" : "No"),
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Reg. Voter",
      selector: (row) => (row.registervoter ? "Yes" : "No"),
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Housing Status",
      selector: (row) => row.occupancystatus,
      center: true,
      compact: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions",
      minWidth: "200px",
      cell: (row) => (
        <>
          <Tooltip label="View Resident's Data" withArrow radius="md">
            <Button radius="md" size="xxs" color="green">
              <Eye
                size={14}
                strokeWidth={2}
                onClick={() => handleUserViewButtonClick(row)}
              />
            </Button>
          </Tooltip>
          <Tooltip label="Edit Resident" withArrow radius="md">
            <Button
              radius="md"
              ml="sm"
              size="xxs"
              color="blue"
              onClick={() => handleUserUpdateButtonClick(row)}
            >
              <Edit size={14} strokeWidth={2} />
            </Button>
          </Tooltip>
          <Tooltip label="Delete Resident" withArrow radius="md">
            <Button
              radius="md"
              ml="sm"
              size="xxs"
              color="red"
              onClick={() => handleUserDeleteButtonClick(row.id)}
            >
              <Trash size={14} strokeWidth={2} />
            </Button>
          </Tooltip>
        </>
      ),
      button: true,
    },
    {
      name: "Document",
      cell: (row) => (
        <>
          <Link to="/createdocument">
            <Button radius="sm" size="xs" color="green" onClick={() => dispatch(CreateDocument(row))} >
              <FileDescription
                size={14}
                strokeWidth={2}
              />
              Create
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const filteredItems = populace?.filter((item) => {
    if (filterByName) {
      if (filterBySitio === "ALL") {
        return (
          item.lastname.toLowerCase().includes(filterByName.toLowerCase()) ||
          item.firstname.toLowerCase().includes(filterByName.toLowerCase()) ||
          item.middlename.toLowerCase().includes(filterByName.toLowerCase())
        );
      } else {
        if (filterByPurok === "ALL") {
          return (
            item.address
              .split(", ")[1]
              .toLowerCase()
              .includes(filterBySitio.toLowerCase()) &&
            (item.lastname.toLowerCase().includes(filterByName.toLowerCase()) ||
              item.firstname
                .toLowerCase()
                .includes(filterByName.toLowerCase()) ||
              item.middlename
                .toLowerCase()
                .includes(filterByName.toLowerCase()))
          );
        } else {
          return (
            item.address
              .split(", ")[0]
              .toLowerCase()
              .includes(filterByPurok.toLowerCase()) &&
            item.address
              .split(", ")[1]
              .toLowerCase()
              .includes(filterBySitio.toLowerCase()) &&
            (item.lastname.toLowerCase().includes(filterByName.toLowerCase()) ||
              item.firstname
                .toLowerCase()
                .includes(filterByName.toLowerCase()) ||
              item.middlename
                .toLowerCase()
                .includes(filterByName.toLowerCase()))
          );
        }
      }
    } else if (!filterByName && filterBySitio !== "ALL" && filterByPurok) {
      if (filterByPurok === "ALL") {
        return item.address
          .split(", ")[1]
          .toLowerCase()
          .includes(filterBySitio.toLowerCase());
      } else {
        return (
          item.address
            .split(", ")[1]
            .toLowerCase()
            .includes(filterBySitio.toLowerCase()) &&
          item.address
            .split(", ")[0]
            .toLowerCase()
            .includes(filterByPurok.toLowerCase())
        );
      }
    } else if (!filterByName && filterBySitio === "ALL") {
      return item;
    } else {
      return item;
    }
  });

  return (
    <Paper className={classes.container}>
      <Group position="left" mb="md" mt="md" className={classes.head}>
        <Tooltip
          label="Enter Resident's Name"
          withArrow
          radius="md"
          position="bottom"
        >
          <TextInput
            label="Filter by Name"
            placeholder="Search Name"
            classNames={classes}
            value={filterByName}
            onChange={(event) => setFilterByName(event.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="nope"
          />
        </Tooltip>
        <NativeSelect
          data={sitio}
          placeholder="Pick one"
          label="Select by Sitio"
          onChange={(event) => setFilterBySitio(event.currentTarget.value)}
        />
        {filterBySitio && (
          <NativeSelect
            data={
              filterBySitio === "PAYAWAN 1"
                ? Payawan1
                : filterBySitio === "PAYAWAN 2"
                  ? Payawan2
                  : filterBySitio === "CENTRAL POBLACION"
                    ? CentralPoblacion
                    : filterBySitio === "BACUD"
                      ? Bacud
                      : filterBySitio === "SAN VICENTE"
                        ? SanVicente
                        : filterBySitio === "LOOC"
                          ? Looc
                          : filterBySitio === "BERNADETTE"
                            ? Bernadette
                            : filterBySitio === "TORIL"
                              ? Toril
                              : filterBySitio === "ALL"
                                ? ["Select a Sitio"]
                                : "N/A"
            }
            placeholder="Pick one"
            label="Select by Purok"
            onChange={(event) => setFilterByPurok(event.currentTarget.value)}
          />
        )}
      </Group>

      <Space height="md" />

      <DataTable
        title="Resident's Records"
        columns={usersColumns}
        data={filteredItems}
        pagination
        highlightOnHover
        pointerOnHover
        progressPending={status === "loading"}
        sortIcon={<ArrowNarrowDown />}
        theme={colorScheme === "dark" ? "dark" : "light"}
        customStyles={customStyles}
        responsive
        dense
      />

      {/* View User Modals */}
      <Modal
        opened={viewUserOpened}
        onClose={() => setViewUserOpened(false)}
        title={`Resident's Profile #${selectedResidentData?.id}`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Image
            width={230}
            height={230}
            src={selectedResidentData?.image}
            alt="Resident's image"
            fit="contain"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Name :</Text>
          <Space w="sm" />
          <Text size="md">
            {selectedResidentData?.firstname}{" "}
            {`${selectedResidentData?.middlename?.slice(0, 1)}.`}{" "}
            {selectedResidentData?.lastname}{" "}
            {`${selectedResidentData?.suffix ? selectedResidentData?.suffix : ""
              }`}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Sex :</Text>
          <Space w="sm" />
          <Text size="md">{selectedResidentData?.sex}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Birth :</Text>
          <Space w="sm" />
          <Text size="md">
            On {selectedResidentData?.birthdate} at{" "}
            {selectedResidentData?.birthplace}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Address :</Text>
          <Space w="sm" />
          <Text size="md">
            {selectedResidentData?.address?.split(", ")[0]},{" "}
            {selectedResidentData?.address?.split(", ")[1]}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Name of Parents :</Text>
          <Space w="sm" />
          <Text size="md">
            {selectedResidentData?.parentsname
              ? selectedResidentData?.parentsname
              : "None"}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Name of Siblings :</Text>
          <Space w="sm" />
          <Text size="md">
            {selectedResidentData?.siblingsname
              ? selectedResidentData?.siblingsname
              : "None"}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Occupation :</Text>
          <Space w="sm" />
          <Text size="md">{selectedResidentData?.occupation}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Civil Status :</Text>
          <Space w="sm" />
          <Text size="md">{selectedResidentData?.civilstatus}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Citizenship :</Text>
          <Space w="sm" />
          <Text size="md">{selectedResidentData?.citizenship}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">PWD :</Text>
          <Space w="sm" />
          <Text size="md">{selectedResidentData?.PWD ? "Yes" : "No"}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">4P's :</Text>
          <Space w="sm" />
          <Text size="md">
            {selectedResidentData?.fourpsmember ? "Yes" : "No"}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Reg. Voter :</Text>
          <Space w="sm" />
          <Text size="md">
            {selectedResidentData?.registervoter ? "Yes" : "No"}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Text size="sm">Occupancy Status :</Text>
          <Space w="sm" />
          <Text size="md">{selectedResidentData?.occupancystatus}</Text>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        opened={editProfileOpened}
        onClose={() => setEditProfileOpened(false)}
        title="Update Resident's profile"
      >
        <div className={classes.group}>
          <TextInput
            className={classes.textinputs}
            label="First Name"
            name="firstname"
            value={selectedResidentUpdate?.firstname}
            radius="sm"
            disabled
          />
          <TextInput
            className={classes.textinputs}
            label="Middle Name"
            name="middlename"
            value={selectedResidentUpdate?.middlename}
            placeholder="Input the middlename"
            radius="sm"
            disabled
          />
        </div>
        <div className={classes.group}>
          <TextInput
            className={classes.textinputs}
            label="lastname"
            name="lastname"
            value={selectedResidentUpdate?.lastname}
            radius="sm"
            disabled
          />
          <TextInput
            className={classes.textinputs}
            label="Suffix"
            name="suffix"
            value={selectedResidentUpdate?.suffix || ''}
            radius="sm"
            disabled
          />
        </div>
        <div className={classes.group}>
          <NativeSelect
            className={classes.textinputs}
            data={areas}
            // value={updateAddress}
            placeholder={selectedResidentUpdate?.address}
            radius="sm"
            label="Select the area"
            onChange={(e) => setupdateAddress(e.currentTarget.value)}
          />

          <TextInput
            className={classes.textinputs}
            label="Date of Birth"
            radius="sm"
            placeholder={selectedResidentUpdate?.birthdate}
            name="birthdate"
            onChange={(e) => setupdateBirthdate(e.currentTarget.value)}
          />
        </div>
        <div className={classes.group}>
          <TextInput
            className={classes.textinputs}
            label="Place of Birth"
            placeholder={selectedResidentUpdate?.birthplace}
            name="birthplace"
            radius="sm"
            onChange={(e) => setupdateBirthplace(e.currentTarget.value)}
          />
          <NativeSelect
            className={classes.textinputs}
            placeholder={selectedResidentUpdate?.sex}
            data={sexdata}
            label="Sex"
            radius="sm"
            onChange={(e) => setupdateSex(e.currentTarget.value)}
          />
        </div>
        <div className={classes.group}>
          <NativeSelect
            className={classes.textinputs}
            data={civilStatus}
            placeholder={selectedResidentUpdate?.civilstatus}
            radius="sm"
            label="Civil Status"
            onChange={(e) => setupdateCivilStatus(e.currentTarget.value)}
          />
          <TextInput
            className={classes.textinputs}
            name="parentsname"
            label="Name of Parents"
            placeholder={selectedResidentUpdate?.parentsname}
            radius="sm"
            onChange={(e) => setupdateParentsname(e.currentTarget.value)}
          />
        </div>
        <div className={classes.group}>
          <TextInput
            className={classes.textinputs}
            name="siblingsname"
            label="Name of Siblings"
            placeholder={selectedResidentUpdate?.siblingsname}
            radius="sm"
            onChange={(e) => setupdateSiblingsname(e.currentTarget.value)}
          />
          <TextInput
            className={classes.textinputs}
            name="citizenship"
            label="Citizenship"
            placeholder={selectedResidentUpdate?.citizenship}
            radius="sm"
            onChange={(e) => setupdateCitizenship(e.currentTarget.value)}
          />
        </div>
        <div className={classes.group}>
          <TextInput
            className={classes.textinputs}
            name="occupation"
            label="Occupation"
            placeholder={selectedResidentUpdate?.occupation}
            radius="sm"
            onChange={(e) => setupdateOccupation(e.currentTarget.value)}
          />
          <NativeSelect
            className={classes.textinputs}
            data={selection}
            value={updatePWD}
            placeholder={selectedResidentUpdate?.PWD}
            radius="sm"
            label="PWD"
            onChange={(e) => setupdatePWD(e.currentTarget.value)}
          />
        </div>
        <div className={classes.group}>
          <NativeSelect
            className={classes.textinputs}
            data={selection}
            value={updatefourpsmember}
            placeholder={selectedResidentUpdate?.fourpsmember}
            radius="sm"
            label="4P's"
            onChange={(e) => setupdatefourpsmember(e.currentTarget.value)}
          />
          <NativeSelect
            className={classes.textinputs}
            data={selection}
            value={updateregistervoter}
            placeholder={selectedResidentUpdate?.registervoter}
            radius="sm"
            label="Register Voter"
            onChange={(e) => setupdateregistervoter(e.currentTarget.value)}
          />
          <NativeSelect
            className={classes.textinputs}
            data={housestatus}
            placeholder={selectedResidentUpdate?.occupancystatus}
            radius="sm"
            label="Housing Status"
            onChange={(e) => setupdateoccupancystatus(e.currentTarget.value)}
          />
        </div>
        <Button
          style={{ width: "100%" }}
          size="xs"
          type="submit"
          mt="lg"
          onClick={handleUserUpdate}
        >
          {UpdateStatus ? <Loader color="white" size="sm" /> : "Update"}
        </Button>{" "}
      </Modal>

      {/* Delete User Modal */}
      <Modal
        opened={deleteUserModal}
        onClose={() => setDeleteUserModal(false)}
        title="Are you sure to delete this resident?"
        centered
      >
        <Text align="center" color="yellow" size="sm">
          You won't be able to recover any of these data. Careful now.
        </Text>
        <Group position="apart" mt="md">
          <Button
            radius="md"
            style={{ width: "100%", flex: 6 }}
            color="red"
            onClick={() => handleUserDelete()}
          >
            Yes
          </Button>
          <Button
            radius="md"
            style={{ width: "100%", flex: 6 }}
            color="blue"
            onClick={() => setDeleteUserModal(false)}
          >
            No
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
};

export default Masterlist;
