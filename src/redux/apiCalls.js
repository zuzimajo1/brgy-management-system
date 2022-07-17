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
} from "./FaceRecognitionRedux";

import {
  fetchAllEvents,
  addEvents,
  deleteEvent,
} from "./EventRedux";

import { fetchEventToday, fetchEventTodayFailed } from "./EventTodayRedux";

//fetch data of a single person
export const GetFaceRecognitionData = async (
  dispatch,
  firstname,
  lastname,
  showNotification
) => {
  try {
    dispatch(FaceGetInfoStart());
    const res = await publicRequest.get(
      `resident/find?firstname=${firstname}&lastname=${lastname}`
    );
    dispatch(FaceGetInfoSuccess(res.data));
  } catch (error) {
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
  id,
  showNotification,
  setOpened
) => {
  try {
    const res = await publicRequest.delete(`event/${id}`);
    dispatch(deleteEvent(id));
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