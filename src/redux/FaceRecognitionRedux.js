import { createSlice } from "@reduxjs/toolkit";


const FaceRecognitionRedux = createSlice({
    name: 'face',
    initialState: {
        facedescriptors : [],
        facedescriptorsvalidator: false,
    },
    reducers:{
        GetDescriptors : (state, action)=>{
            const index = state.facedescriptors.find((items)=> items.label === action.payload.label); 

            if(!action.payload){
                state.facedescriptorsvalidator = true;
            }else if(!index){
                state.facedescriptors.push(action.payload);
            }
        },
        DeleteDescriptors : (state)=>{
            state.facedescriptors = [];
        },
    }
})

export const { GetDescriptors, DeleteDescriptors } = FaceRecognitionRedux.actions;
export default FaceRecognitionRedux.reducer;