import React, { useState } from 'react'
import { createStyles, Group, Paper, TextInput, Button, Space, Modal, Tooltip, Image, NativeSelect, Text } from "@mantine/core";
import { Bacud, Bernadette, CentralPoblacion, Looc, Payawan1, Payawan2, populace, SanVicente, Toril } from '../config/dummyData';
import DataTable from 'react-data-table-component';
import { ArrowNarrowDown, Edit, Eye, Trash } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  container: {
    fontFamily: "Regular",
    width: "100%",
    height: "fit-content",
    padding: 15,
    background:
      theme.colorScheme === "dark"
        ? '#424242'
        : theme.colors.lighttheme[0],
  },
  paper: {
    borderRadius: 15,
    backgroundColor: theme.colorScheme === 'dark' ? '#424242' : theme.colors.gray[0],

    width: '100%'
  },
}));

const customStyles = {
  header: {
    style: {
      textAlign: 'center',
      marginBottom: '25px'
    },

  },
  table: {
    style: {
      textAlign: 'center',
    },
  },
  headCells: {
    style: {
      border: '0.5px solid black',
      borderWidth: 'thin',
    },
  },
  cells: {
    style: {
      border: '0.5px solid black',
      borderWidth: 'thin'
    },
  },

}

const Masterlist = ({ colorScheme }) => {
  const status = 'success';
  // Style and Filter States
  const [focused, setFocused] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [filterBySitio, setFilterBySitio] = useState('');
  const [filterByPurok, setFilterByPurok] = useState('');

  const sitio = ['ALL', 'PAYAWAN 1', 'PAYAWAN 2', 'CENTRAL POBLACION', 'BACUD', 'SAN VICENTE', 'LOOC', 'BERNADETTE', 'TORIL']

  const { classes } = useStyles({ floating: filterByName.trim().length !== 0 || focused });
  // Modal States
  const [viewUserOpened, setViewUserOpened] = useState(false);
  const [editProfileOpened, setEditProfileOpened] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  // Selected Row Resident State
  const [selectedResidentData, setSelectedResidentData] = useState();
  const [residentIdToDelete, setResidentIdToDelete] = useState();

  // Handlers
  const handleUserViewButtonClick = (resident) => {
    setViewUserOpened(true)
    setSelectedResidentData(resident)
  }
  const handleUserUpdateButtonClick = (resident) => {
    setEditProfileOpened(true)
  }
  const handleUserDeleteButtonClick = (id) => {
    setResidentIdToDelete(id)
    setDeleteUserModal(true)
  }

  const handleUserDelete = () => {
    populace.splice(residentIdToDelete - 1, 1);
    console.log(residentIdToDelete);
    setDeleteUserModal(false)
  }

  // Table Configs
  const usersColumns = [
    {
      name: 'ID', selector: row => row.id, sortable: true, center: true,
      wrap: true
    },
    {
      name: 'Image',
      wrap: true,
      cell: (row) => (
        <Image
          height={80}
          width={80}
          src={row.image}
        />
      )
    },
    {
      name: 'Last Name', selector: row => row.lastName, sortable: true, center: true, wrap: true,
    },
    {
      name: 'First Name', selector: row => row.firstName, sortable: true, center: true, wrap: true,
    },
    {
      name: 'Middle Name', selector: row => row.middleName, sortable: true, center: true, wrap: true,
    },
    {
      name: 'Purok', selector: row => row.address.purok, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'Sitio', selector: row => row.address.sitio, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'Place of Birth', selector: row => row.placeOfBirth, sortable: true, center: true, wrap: true,
    },
    {
      name: 'Date of Birth', selector: row => row.dateOfBirth, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'Sex', selector: row => row.sex, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'Civil Status', selector: row => row.civilStatus, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'Citizenship', selector: row => row.citizenship, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'Occupation', selector: row => row.occupation, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'PWD', selector: row => row.isPWD ? 'Yes' : 'No', center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: "4P's", selector: row => row.is4ps ? 'Yes' : 'No', center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: "Reg. Voter", selector: row => row.isRegVoter ? 'Yes' : 'No', center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: "Housing Status", selector: row => row.occupancyStatus, center: true, compact: true, sortable: true, wrap: true,
    },
    {
      name: 'Actions',
      minWidth: '200px',
      cell: (row) => (
        <>
          <Tooltip label="View Resident's Data" withArrow radius="md">
            <Button radius="md" size="xxs" color='green'>
              <Eye size={14} strokeWidth={2} onClick={() => handleUserViewButtonClick(row)} />
            </Button>
          </Tooltip>
          <Tooltip label="Edit Resident" withArrow radius="md">
            <Button radius="md" ml="sm" size="xxs" color='blue' onClick={() => handleUserUpdateButtonClick(row)}>
              <Edit size={14} strokeWidth={2} />
            </Button>
          </Tooltip>
          <Tooltip label="Delete Resident" withArrow radius="md">
            <Button radius="md" ml="sm" size="xxs" color='red' onClick={() => handleUserDeleteButtonClick(row.id)}>
              <Trash size={14} strokeWidth={2} />
            </Button>
          </Tooltip>
        </>
      ),
      button: true,
    },
  ];

  const filteredItems = populace?.filter(
    item => {
      if (filterByName) {
        if (filterBySitio === 'ALL') {
          return (item.lastName.toLowerCase().includes(filterByName.toLowerCase())) || item.firstName.toLowerCase().includes(filterByName.toLowerCase()) || item.middleName.toLowerCase().includes(filterByName.toLowerCase())
        } else {
          if (filterByPurok === 'ALL') {
            return (item.address.sitio.toLowerCase().includes(filterBySitio.toLowerCase())) && (item.lastName.toLowerCase().includes(filterByName.toLowerCase()) || item.firstName.toLowerCase().includes(filterByName.toLowerCase()) || item.middleName.toLowerCase().includes(filterByName.toLowerCase()))
          } else {
            return item.address.purok.toLowerCase().includes(filterByPurok.toLowerCase()) && (item.address.sitio.toLowerCase().includes(filterBySitio.toLowerCase())) && (item.lastName.toLowerCase().includes(filterByName.toLowerCase()) || item.firstName.toLowerCase().includes(filterByName.toLowerCase()) || item.middleName.toLowerCase().includes(filterByName.toLowerCase()))
          }
        }
      } else if (!filterByName && filterBySitio !== 'ALL' && filterByPurok) {
        if (filterByPurok === 'ALL') {
          return item.address.sitio.toLowerCase().includes(filterBySitio.toLowerCase())
        } else {
          return item.address.sitio.toLowerCase().includes(filterBySitio.toLowerCase()) && item.address.purok.toLowerCase().includes(filterByPurok.toLowerCase())
        }
      } else if (!filterByName && filterBySitio === 'ALL') {
        return item
      } else {
        return item
      }
    }
  );

  return (
    <Paper className={classes.container}>
      <Group position="left" mb='md' mt='md' className={classes.head}>
        <Tooltip label="Enter Resident's Name" withArrow radius="md" position="bottom">
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
        {filterBySitio && <NativeSelect
          data={filterBySitio === 'PAYAWAN 1' ? Payawan1 : filterBySitio === 'PAYAWAN 2' ? Payawan2 : filterBySitio === 'CENTRAL POBLACION' ? CentralPoblacion : filterBySitio === 'BACUD' ? Bacud : filterBySitio === 'SAN VICENTE' ? SanVicente : filterBySitio === 'LOOC' ? Looc : filterBySitio === 'BERNADETTE' ? Bernadette : filterBySitio === 'TORIL' ? Toril : filterBySitio === 'ALL' ? ['Select a Sitio'] : 'N/A'}
          placeholder="Pick one"
          label="Select by Purok"
          onChange={(event) => setFilterByPurok(event.currentTarget.value)}
        />}

      </Group>

      <Space height='md' />

      <DataTable
        title="Resident's Records"
        columns={usersColumns}
        data={filteredItems}
        pagination
        highlightOnHover
        pointerOnHover
        progressPending={status === 'loading'}
        sortIcon={<ArrowNarrowDown />}
        theme={colorScheme === 'dark' ? 'dark' : 'light'}
        customStyles={customStyles}
        responsive
        dense
      />

      {/* View User Modals */}
      <Modal opened={viewUserOpened} onClose={() => setViewUserOpened(false)} title={`Resident's Profile #${selectedResidentData?.id}`} >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
          <Image
            width={250}
            height={250}
            src={selectedResidentData?.image}
            alt="Resident's image"
            fit='contain'
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Name: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.lastName}, {selectedResidentData?.firstName} {selectedResidentData?.middleName}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Sex: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.sex}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Birth: </Text>
          <Space w='md' />
          <Text size="lg">On {selectedResidentData?.dateOfBirth} at {selectedResidentData?.placeOfBirth}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Address: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.address?.purok}, {selectedResidentData?.address?.sitio}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Occupation: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.occupation}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Civil Status: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.civilStatus}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Citizenship: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.citizenship}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">PWD: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.isPWD ? 'Yes' : 'No'}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">4P's: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.is4ps ? 'Yes' : 'No'}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '15px' }}>
          <Text size="sm">Reg. Voter: </Text>
          <Space w='md' />
          <Text size="lg">{selectedResidentData?.isRegVoter ? 'Yes' : 'No'}</Text>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal opened={editProfileOpened} onClose={() => setEditProfileOpened(false)} title="Update Resident's profile" >
        {/* <Text className={classes.userInfo}>Created on: {dayjs(selectedUserData?.createdAt).format('DD/MMM/YYYY')}</Text>
        <Text className={classes.userInfo}>User RFID: {selectedUserData?.RFID}</Text>

        <TextInput label="RFID" placeholder={selectedUserData?.RFID} ref={rfid} />
        <TextInput placeholder={selectedUserData?.name} label="Name" ref={name} />
        <TextInput label="Email" placeholder={selectedUserData?.email} ref={email} />
        <PasswordInput placeholder='password143' required label="Password" ref={password} />
        <NumberInput ref={phone} maxLength={10} hideControls label="Phone" placeholder={selectedUserData?.phone} />
        <NumberInput ref={level} maxLength={2} hideControls label="Grade Level" placeholder={selectedUserData?.grade_level} /> */}

        {/* <Button style={{ width: '100%' }} size="xs" type="submit" mt='lg' onClick={handleUserUpdate}>{status === 'loading' ? <Loader color="white" size="sm" /> : "Update"}</Button> */}
      </Modal>

      {/* Delete User Modal */}
      <Modal opened={deleteUserModal} onClose={() => setDeleteUserModal(false)} title="Are you sure to delete this resident?" centered >
        <Text align='center' color='yellow' size='sm'>You won't be able to recover any of these data. Careful now.</Text>
        <Group position="apart" mt='md'>
          <Button radius="md" style={{ width: "100%", flex: 6 }} color="red" onClick={() => handleUserDelete()}>Yes</Button>
          <Button radius="md" style={{ width: "100%", flex: 6 }} color="blue" onClick={() => setDeleteUserModal(false)}>No</Button>
        </Group>
      </Modal>
    </Paper >
  )
}

export default Masterlist