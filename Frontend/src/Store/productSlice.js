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
    addSingleProduct:(state,action)=>{
        const data = [...state.value,action.payload]
        state.value = data
    },
    removeProducts:(state,action)=>{
        state.value = null
    }}
})

export const {addProducts,removeProducts,addSingleProduct} = productSilce.actions
export default productSilce.reducer