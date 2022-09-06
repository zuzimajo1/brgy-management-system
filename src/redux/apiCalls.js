import {
  fetchResidentsStart,
  fetchResidentsSuccess,
  fetchResidentsFailed,
  updateResident,
  deleteResident,
} from "./MasterlistRedux";

import { publicRequest } from "../RequestMethod";

import {
  FaceGetInfoStart,
  FaceGetInfoSuccess,
  FaceGetInfoFailed,
} from "./FaceRecognitionRedux";

import { fetchAllEvents, addEvents, deleteEvent } from "./EventRedux";

import { fetchEventToday, fetchEventTodayFailed } from "./EventTodayRedux";

import { LoginUser, Logout } from "./UserRedux";
import { RecordGetAll } from "./RecordRedux";

//fetch data of a single person
export const GetFaceRecognitionData = async (
  dispatch,
  fullname,
  showNotification
) => {
  try {
    dispatch(FaceGetInfoStart());
    const res = await publicRequest.get(`resident/find?fullname=${fullname}`);
    dispatch(FaceGetInfoSuccess(res.data));
  } catch (error) {
    dispatch(FaceGetInfoFailed());
    showNotification({
      title: "Error, Please try again",
      message: "Make sure you are connected to the internet",
    });
  }
};

//fetch all data

export const GetAllDataResident = async (dispatch) => {
  dispatch(fetchResidentsStart());
  try {
    const res = await publicRequest.get("resident");
    dispatch(fetchResidentsSuccess(res.data));
  } catch (error) {
    dispatch(fetchResidentsFailed());
  }
};

//update single data from masterlist
export const UpdateDataResident = async (
  dispatch,
  id,
  showNotification,
  setUpdateStatus,
  updatedValues,
  setEditProfileOpened
) => {
  try {
    const res = await publicRequest.patch(`resident?id=${id}`, updatedValues);
    dispatch(updateResident(res.data));
    showNotification({
      title: "Updated Succesfully",
      message: "The resident's data has been updated!",
    });
    setUpdateStatus(false);
    setEditProfileOpened(false);
  } catch (error) {
    showNotification({
      title: "Error, Please try again",
      message: "Make sure you are connected to the internet",
    });
    setUpdateStatus(false);
    setEditProfileOpened(false);
  }
};

//Delete Resident from the Masterlist
export const DeleteDataResident = async (
  dispatch,
  id,
  showNotification,
  setDeleteUserModal
) => {
  try {
    const res = await publicRequest.delete(`resident/${id}`);
    dispatch(deleteResident(id));
    showNotification({
      title: "Deleted Succesfully",
      message: "The resident's data has been deleted!",
    });
    setDeleteUserModal(false);
  } catch (error) {
    showNotification({
      title: "Error, Please try again",
      message: "Make sure you are connected to the internet",
    });
    setDeleteUserModal(false);
  }
};

//Get All Events
export const GetAllBrgyEvents = async (dispatch, showNotification) => {
  try {
    const res = await publicRequest.get("event");
    dispatch(fetchAllEvents(res.data));
  } catch (error) {
    showNotification({
      title: "Error, Please try again",
      message: "Make sure you are connected to the internet",
    });
  }
};

//Create Events
export const CreateBrgyEvent = async (
  dispatch,
  data,
  showNotification,
  setcreateEventModal
) => {
  try {
    const res = await publicRequest.post("event", data);
    dispatch(addEvents(res.data));
    showNotification({
      title: "Created Succesfully",
      message: "The brgy event has been created!",
    });
    setcreateEventModal(false);
  } catch (err) {
    showNotification({
      title: "Error, Please try again",
      message: "Make sure you are connected to the internet",
    });
    setcreateEventModal(false);
  }
};

//Delete Single Event
export const DeleteSingleEvent = async (
  dispatch,
  ID,
  showNotification,
  setOpened,
  eventData
) => {
  try {
    const res = await publicRequest.delete(`event/${ID}`);
    dispatch(deleteEvent(eventData));
    console.log(eventData);
    showNotification({
      title: "Deleted Succesfully",
      message: "The brgy event has been deleted!",
    });
    setOpened(false);
  } catch (err) {
    showNotification({
      title: "Error, Please try again",
      message: "Make sure you are connected to the internet",
    });
    setOpened(false);
  }
};

//fetch Event Today
export const GetEventToday = async (dispatch, showNotification) => {
  try {
    const res = await publicRequest.get("event/eventtoday");
    dispatch(fetchEventToday(res.data));
  } catch (err) {
    dispatch(fetchEventTodayFailed());
  }
};

//fetch All Transactions
export const GetAllRecords = async (dispatch, showNotification) => {
  try {
    const res = await publicRequest.get("record");
    dispatch(RecordGetAll(res.data));
  } catch (err) {
    showNotification({
      title: "Fetching error",
      message: "Make sure the XAMPP Control Panel is open",
    });
  }
};
