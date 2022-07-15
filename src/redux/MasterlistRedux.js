import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  residents: [],
  status: "loading" | "success" | "failed",
};

const MasterlistRedux = createSlice({
  name: "masterlist",
  initialState,
  reducers: {
    residentsReset: (state) => {
      state.residents = [];
    },
    fetchResidentsStart: (state) => {
      state.status = "loading";
    },
    fetchResidentsSuccess: (state, action) => {
      state.status = "success";
      state.residents = action.payload;
    },
    fetchResidentsFailed: (state) => {
      state.status = "failed";
    },
    addResidentStart: (state) => {
      state.status = "loading";
    },
    addResidentSuccess: (state, action) => {
      state.residents.push(action.payload);
      state.status = "success";
    },
    addResidentsFailed: (state) => {
      state.status = "failed";
    },
    updateResident: (state, action) => {
      state.residents = state.residents.map((resident) =>
        resident.id === action.payload.id ? action.payload : resident
      );
    },
    deleteResident: (state, action) => {
      state.residents = state.residents.filter(
        (resident) => resident.id !== action.payload
      );
    },
  },
});

export const {
  residentsReset,
  fetchResidentsStart,
  fetchResidentsSuccess,
  fetchResidentsFailed,
  addResidentStart,
  addResidentSuccess,
  addResidentsFailed,
  updateResident,
  deleteResident,
} = MasterlistRedux.actions;
export default MasterlistRedux.reducer;
