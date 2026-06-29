import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import productRedcer from "./productSlice"
export const store = configureStore({
    reducer:{
       user: userReducer,
       products:productRedcer,
    },  
})