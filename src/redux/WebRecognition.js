import { createSlice } from "@reduxjs/toolkit";


const WebRecognition = createSlice({
    name: 'face2',
    initialState: {
        webcamdescriptor : [],
        webcamdescriptorValidator : true,
    },
    reducers: {
        GetWebcamDescriptor : (state, action)=>{
            if(action.payload === false){
                state.webcamdescriptorValidator = false;
            }else{
                state.webcamdescriptor = [];
                state.webcamdescriptorValidator = true;
            }
        },
    },
})

export const { GetWebcamDescriptor } = WebRecognition.actions;
export default WebRecognition.reducer;