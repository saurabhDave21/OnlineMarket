import { createSlice } from "@reduxjs/toolkit";

const orderSilce = createSlice({
    name:"order",
    initialState:{
        value:null
    },
    reducers:{
        addOrder:(state,action)=>{
            state.value = action.payload
        },
        removeAllOrder:(state,action)=>{
            state.value = null
        }
    }
})

export const {addOrder,removeAllOrder} = orderSilce.actions
export default orderSilce.reducer