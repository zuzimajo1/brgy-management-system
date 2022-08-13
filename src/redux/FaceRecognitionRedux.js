import { createSlice } from "@reduxjs/toolkit";

const FacerecognitionReducer = createSlice({
    name: "faceRecognition",
    initialState:{
        singlepersondata : [],
        status: "loading" | "success" | "failed",
        fetchdata: false,
    },
    reducers: {
        FaceGetInfoStart : (state)=>{
            state.status = "loading";
             state.fetchdata = true;
        },
        FaceGetInfoSuccess: (state, action)=>{
            state.status = "success";
            state.singlepersondata = action.payload;
            state.fetchdata = true;
        },
        FaceGetInfoFailed: (state)=>{
            state.status = "failed";
            state.singlepersondata = [];
             state.fetchdata = false;
        },
        FaceGetInfoReset :(state, action)=>{
            state.fetchdata = false;
            state.fetchdata = [];
        },
        DataDisplayClose :(state)=>{
            state.fetchdata = false;
        },
        CreateDocument : (state, action)=>{
            state.singlepersondata = action.payload;
            state.fetchdata = false;
        },
    }
})

export const {
  FaceGetInfoStart,
  FaceGetInfoSuccess,
  FaceGetInfoFailed,
  FaceGetInfoReset,
  DataDisplayClose,
  CreateDocument,
} = FacerecognitionReducer.actions;
export default FacerecognitionReducer.reducer;