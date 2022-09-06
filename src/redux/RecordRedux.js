import { createSlice } from "@reduxjs/toolkit";


const RecordRedux = createSlice({
    name: "record",
    initialState: {
        records: [],
        recordSuccess: false,
    },
    reducers: {
        RecordGetAll : (state, action)=>{
            state.records = action.payload;
            state.recordSuccess = true;
        },
        RecordAdd: (state, action)=>{
            state.records.push(action.payload);
            state.recordSuccess = true;
        }
    }
})

export const { RecordGetAll, RecordAdd } = RecordRedux.actions;
export default RecordRedux.reducer;