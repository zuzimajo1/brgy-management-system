import { createSlice } from "@reduxjs/toolkit";

const EventReducer = createSlice({
  name: "event",
  initialState: {
    events: [],
    eventStatus: "loading" | "success" | "failed",
  },
  reducers: {
    fetchAllEvents: (state, action) => {
      state.events = action.payload;
      state.eventStatus = "success";
    },
    addEvents: (state, action) => {
      state.events.push(action.payload);
      state.eventStatus = "success";
    },
    eventsReset: (state) => {
      state.events = [];
    },
    deleteEvent: (state, action) => {
       state.events = state.events.filter((item)=> item.title !== action.payload);
    },
  },
});

export const { fetchAllEvents, addEvents, eventsReset, deleteEvent } =
  EventReducer.actions;
export default EventReducer.reducer;
