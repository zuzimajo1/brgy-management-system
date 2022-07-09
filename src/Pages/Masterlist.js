import React, { useEffect, useState } from 'react'
import { createStyles, Group, Paper, TextInput, Button, Space, Modal, Tooltip, Image, NativeSelect, Text, Loader, Select } from "@mantine/core";
import { DatePicker } from '@mantine/dates'
import DataTable from 'react-data-table-component';
import { ArrowNarrowDown, Edit, Eye, Trash } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { Bacud, Bernadette, CentralPoblacion, Looc, Payawan1, Payawan2, populace, SanVicente, Toril } from '../config/dummyData';
import { residentsReset, fetchResidents, updateResident, deleteResident } from '../redux/MasterlistRedux'
import { useRef } from 'react';

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
  const { residents } = useSelector(state => state.masterlist);
  const dispatch = useDispatch();
  const status = 'success';
  // Style and Filter States
  const [focused, setFocused] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [filterBySitio, setFilterBySitio] = useState('');
  const [filterByPurok, setFilterByPurok] = useState('');

  // Update Resident States
  const [sitioValue, setSitioValue] = useState('');
  const [purokValue, setPurokValue] = useState('');
  const [isPWD, setIsPWD] = useState(null);
  const [is4Ps, setIs4Ps] = useState(null);
  const [isVoter, setIsVoter] = useState(null);
  // Input Refs
  const idRef = useRef("")
  const lastNameRef = useRef("")
  const firstNameRef = useRef("")
  const middleNameRef = useRef("")
  const sexRef = useRef("")
  const birthDateRef = useRef("")
  const placeOfBirthRef = useRef("")
  const civilStatusRef = useRef("")
  const citizenshipRef = useRef("")
  const occupationRef = useRef("")
  const isPWDRef = useRef("")
  const is4PsRef = useRef("")
  const isVoterRef = useRef("")
  const housingRef = useRef("")


  const sitio = ['ALL', 'PAYAWAN 1', 'PAYAWAN 2', 'CENTRAL POBLACION', 'BACUD', 'SAN VICENTE', 'LOOC', 'BERNADETTE', 'TORIL']
  const updateSitio = ['PAYAWAN 1', 'PAYAWAN 2', 'CENTRAL POBLACION', 'BACUD', 'SAN VICENTE', 'LOOC', 'BERNADETTE', 'TORIL']

  const { classes } = useStyles({ floating: filterByName.trim().length !== 0 || focused });
  // Modal States
  const [viewUserOpened, setViewUserOpened] = useState(false);
  const [editProfileOpened, setEditProfileOpened] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  const closeUpdateModal = () => {
    setSitioValue('')
    setPurokValue('')
    setIsPWD(null)
    setIs4Ps(null)
    setIsVoter(null)
    setEditProfileOpened(false)
  }

  // Selected Row Resident State
  const [selectedResidentData, setSelectedResidentData] = useState();
  const [residentIdToDelete, setResidentIdToDelete] = useState();

  // Handlers
  const handleUserViewButtonClick = (resident) => {
    setViewUserOpened(true)
    setSelectedResidentData(resident)
  }
  const handleUserUpdateButtonClick = (resident) => {
    setSelectedResidentData(resident)
    setEditProfileOpened(true)
  }
  const handleUserDeleteButtonClick = (id) => {
    setResidentIdToDelete(id)
    setDeleteUserModal(true)
  }

  const handleResidentUpdate = (id) => {
    const updateData = {
      id: id,
      lastName: lastNameRef.current.value.trim(),
      firstName: firstNameRef.current.value.trim(),
      middleName: middleNameRef.current.value.trim(),
      sex: sexRef.current.value.trim(),
      birthDate: birthDateRef.current.value.trim(),
      placeOfBirth: placeOfBirthRef.current.value.trim(),
      sitio: sitioValue.trim(),
      purok: purokValue.trim(),
      civilStatus: civilStatusRef.current.value.trim(),
      citizenship: citizenshipRef.current.value.trim(),
      occupation: occupationRef.current.value.trim(),
      isPWD: isPWDRef.current.value.trim() === 'Yes' ? true : false,
      is4Ps: is4PsRef.current.value.trim() === 'Yes' ? true : false,
      isVoter: isVoterRef.current.value.trim() === 'Yes' ? true : false,
      housing: housingRef.current.value.trim(),
    }
    populace.map((resident) =>
      resident.id === updateData.id ? updateData : resident
    );
    console.log(populace);
    setEditProfileOpened(false)
  }

  const handleUserDelete = () => {
    populace.splice(residentIdToDelete - 1, 1);
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
      <Modal opened={editProfileOpened} onClose={closeUpdateModal} title={`Update Resident's Profile #${selectedResidentData?.id}`} >
        <TextInput placeholder={selectedResidentData?.lastName} label="Last Name" ref={lastNameRef} />
        <TextInput placeholder={selectedResidentData?.firstName} label="First Name" ref={firstNameRef} />
        <TextInput placeholder={selectedResidentData?.middleName} label="Middle Name" ref={middleNameRef} />
        <Select
          label="Sex"
          placeholder={selectedResidentData?.sex}
          data={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
          ]}
          ref={sexRef}
        />
        <DatePicker
          placeholder={selectedResidentData?.dateOfBirth}
          label="Birthdate"
          ref={birthDateRef}
        />
        <TextInput placeholder={selectedResidentData?.placeOfBirth} label="Place of Birth" ref={placeOfBirthRef} />
        <NativeSelect
          data={updateSitio}
          value={sitioValue ? sitioValue : selectedResidentData?.address?.sitio}
          label="Update Sitio"
          onChange={(event) => setSitioValue(event.target.value)}
        />
        <NativeSelect
          data={
            sitioValue ?
              sitioValue === 'PAYAWAN 1' ? Payawan1.slice(1) : sitioValue === 'PAYAWAN 2' ? Payawan2.slice(1) : sitioValue === 'CENTRAL POBLACION' ? CentralPoblacion.slice(1) : sitioValue === 'BACUD' ? Bacud.slice(1) : sitioValue === 'SAN VICENTE' ? SanVicente.slice(1) : sitioValue === 'LOOC' ? Looc.slice(1) : sitioValue === 'BERNADETTE' ? Bernadette.slice(1) : sitioValue === 'TORIL' ? Toril.slice(1) : sitioValue === 'ALL' ? ['Select a Sitio'] : 'N/A'
              :
              selectedResidentData?.address?.sitio === 'PAYAWAN 1' ? Payawan1.slice(1) : selectedResidentData?.address?.sitio === 'PAYAWAN 2' ? Payawan2.slice(1) : selectedResidentData?.address?.sitio === 'CENTRAL POBLACION' ? CentralPoblacion.slice(1) : selectedResidentData?.address?.sitio === 'BACUD' ? Bacud.slice(1) : selectedResidentData?.address?.sitio === 'SAN VICENTE' ? SanVicente.slice(1) : selectedResidentData?.address?.sitio === 'LOOC' ? Looc.slice(1) : selectedResidentData?.address?.sitio === 'BERNADETTE' ? Bernadette.slice(1) : selectedResidentData?.address?.sitio === 'TORIL' ? Toril.slice(1) : selectedResidentData?.address?.sitio === 'ALL' ? ['Select a Sitio'] : 'N/A'
          }
          value={purokValue ? purokValue : selectedResidentData?.address?.purok}
          label="Update Purok"
          onChange={(event) => setPurokValue(event.currentTarget.value)}
        />

        <TextInput placeholder={selectedResidentData?.civilStatus} label="Civil Status" ref={civilStatusRef} />
        <TextInput placeholder={selectedResidentData?.citizenship} label="Citizenship" ref={citizenshipRef} />
        <TextInput placeholder={selectedResidentData?.occupation} label="Occupation" ref={occupationRef} />
        <NativeSelect
          data={['Yes', 'No']}
          value={isPWD === null ? selectedResidentData?.isPWD ? 'Yes' : 'No' : isPWD}
          label="PWD"
          onChange={(event) => setIsPWD(event.target.value)}
          ref={isPWDRef}
        />
        <NativeSelect
          data={['Yes', 'No']}
          value={is4Ps === null ? selectedResidentData?.is4ps ? 'Yes' : 'No' : is4Ps}
          label="4P's"
          onChange={(event) => setIs4Ps(event.target.value)}
          ref={is4PsRef}
        />
        <NativeSelect
          data={['Yes', 'No']}
          value={isVoter === null ? selectedResidentData?.isRegVoter ? 'Yes' : 'No' : isVoter}
          label="Reg. Voter"
          onChange={(event) => setIsVoter(event.target.value)}
          ref={isVoterRef}
        />
        <TextInput placeholder={selectedResidentData?.occupancyStatus} label="Housing Status" ref={housingRef} />


        <Button style={{ width: '100%' }} size="xs" type="submit" mt='lg' onClick={() => handleResidentUpdate(selectedResidentData?.id)}>{status === 'loading' ? <Loader color="white" size="sm" /> : "Update"}</Button>
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