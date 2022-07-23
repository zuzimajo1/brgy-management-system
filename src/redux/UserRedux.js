  import { createSlice } from "@reduxjs/toolkit";


  const UserRedux = createSlice({
    name: "user",
    initialState:{
        user : [],
        status : 'start' | 'success' | 'failed',
        loginStatus: false,

    },
    reducers:{
        LoginUser: (state, action)=>{
            state.user = action.payload;
            state.status = 'success';
            state.loginStatus = true;
        },
        LogoutUser : (state)=>{
            state.user = [];
            state.loginStatus = false;
        },
    }
  })

export const { LoginUser, LogoutUser } = UserRedux.actions;
export default UserRedux.reducer;

