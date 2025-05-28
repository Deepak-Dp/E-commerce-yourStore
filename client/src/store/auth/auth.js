import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}


export const registerUser = createAsyncThunk(
    "auth/register",
    async (data) => {
        
            const response = await axios.post("http://localhost:5000/api/user/register", data,{
                withCredentials: true
            });
            return response.data;
       
       
    }
)

export const loginUser = createAsyncThunk(
    'user/login',

    async (data)=>{
        const response = await axios.post("http://localhost:5000/api/user/login", data,{
            withCredentials: true
        });
        return response.data;
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async ()=>{
        const response = await axios.get("http://localhost:5000/api/user/logout",{
            withCredentials: true
        });
        return response.data;
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser: (state, action) => { },
    },

    extraReducers: (builder) =>{
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
               state.isLoading= false;
               state.isAuthenticated= false;
               state.user=null
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            
            
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(logoutUser.pending, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})


export const { setUser } = authSlice.actions;
export default authSlice.reducer;