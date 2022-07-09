import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    residents: [],
    status: 'loading' | 'success' | 'failed',
}

const API_URL = process.env.NODE_ENV !== 'production' ? `/api/resident` : `${process.env.REACT_APP_API_ENDPOINT}api/resident`

export const fetchUsers = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.get(`${API_URL}`, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addUser = createAsyncThunk("user/add", async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.post(API_URL, userData, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk("user/update", async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.put(`${API_URL}/${userData.userRFID}`, userData, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk("user/delete", async (rfid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.delete(`${API_URL}/${rfid}`, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const MasterlistRedux = createSlice({
    name: 'masterlist',
    initialState,
    reducers: {
        residentsReset: (state) => {
            state.residents = []
        },
        fetchResidents: (state, action) => {
            state.residents = action.payload;
        },
        addResident: (state, action) => {
            state.residents.push(action.payload)
        },
        updateResident: (state, action) => {
            state.residents = state.residents.map((resident) =>
                resident.id === action.payload.id ? action.payload : resident
            );
        },
        deleteResident: (state, action) => {
            state.residents = state.residents.filter(resident => resident.id !== action.payload.id)
        }
    }
})

export const { residentsReset, fetchResidents, addResident, updateResident, deleteResident } = MasterlistRedux.actions;
export default MasterlistRedux.reducer;