import { createSlice } from "@reduxjs/toolkit"

const EventTodayReducer = createSlice({
    name: "eventtoday",
    initialState:{
        eventtoday: [],
    },
    reducers: {
        fetchEventToday : (state, action)=>{
            state.eventtoday = action.payload;
        },
        fetchEventTodayFailed : (state)=>{
            state.eventtoday = [];
        },
    }
})

export const { fetchEventToday, fetchEventTodayFailed } = EventTodayReducer.actions;
export default EventTodayReducer.reducer;

