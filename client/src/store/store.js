import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/auth'
import userReducer from './auth/getUser'
import ProductReducer from './product/productSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        product: ProductReducer
       
    }
})

export default store