import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        value:null
    },
    reducers:{
        addCartData:(state,action)=>{
            state.value = action.payload
        },
        updatedItems:(state,action)=>{
            state.value.items = action.payload
        },
        removeCartData:(state,action)=>{
            state.value = null
        }
    }
})

export const {addCartData,removeCartData,updatedItems} = cartSlice.actions
export default cartSlice.reducer