import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import productRedcer from "./productSlice"
import cartReducer from "./CartSlice"
import orderReducer from "./orderSlice"
export const store = configureStore({
    reducer:{
       user: userReducer,
       products:productRedcer,
       cart:cartReducer,
       order:orderReducer,
    },  
})