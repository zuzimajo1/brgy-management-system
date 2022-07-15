import { createSlice } from "@reduxjs/toolkit";

const EventReducer = createSlice({
    name: "event",
    initialState:{
        events: [],
        eventStatus : "loading" | "success" | "failed",

    },
    reducers:{
       fetchAllEvents : (state, action)=>{
        state.events = action.payload;
        state.eventStatus = "success";
       },
       addEvents: (state, action)=>{
        state.events.push(action.payload);
        state.eventStatus = "success";
       },
       eventsReset : (state)=>{
        state.events = [];
       },

    }
})

export const { fetchAllEvents, addEvents,eventsReset } = EventReducer.actions;
export default EventReducer.reducer;


