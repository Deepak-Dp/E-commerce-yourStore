import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    _id: "",
        name: "",
        email: "",
        avatar: "",
        mobile: "",
        verify_email: "",
        last_login_data: "",
        status: "",
        address_details: [],
        shopping_cart: [],
        adminProductsLists: [],
        orderHistory: [],
        
        role: "",
}



    

 




const getUserSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        getUserdetails: (state, action)=>{
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.mobile = action.payload.mobile;
            state.verify_email = action.payload.verify_email;
            state.last_login_data = action.payload.last_login_data;
            state.status = action.payload.status;
            state.address_details = action.payload.address_details;
            state.shopping_cart = action.payload.shopping_cart;

            state.adminProductsLists = action.payload.adminProductsLists;
            state.orderHistory = action.payload.orderHistory;
            state.role = action.payload.role;

        },
        uploadAvatar: (state, action) =>{
            state.avatar = action.payload.avatar;
        },

        logout: (state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.avatar = "";
            state.mobile = "";
            state.verify_email = "";
            state.last_login_data = "";
            state.status = "";
            state.address_details = [];
            state.shopping_cart = [];
            state.adminProductsLists = [];
            state.orderHistory = [];
            state.role = "";
        }
    },

    
})

export const {getUserdetails, logout, uploadAvatar} = getUserSlice.actions;
export default getUserSlice.reducer;