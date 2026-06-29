import { createSlice } from "@reduxjs/toolkit";

const productSilce = createSlice({
    name:"products",
    initialState:{
        value:null
    },
    reducers:{
    addProducts:(state,action)=>{
        state.value = action.payload
    },
    removeProducts:(state,action)=>{
        state.value = null
    }}
})

export const {addProducts,removeProducts} = productSilce.actions
export default productSilce.reducer