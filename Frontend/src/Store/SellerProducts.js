import { createSlice } from "@reduxjs/toolkit";

const SellerSilce = createSlice({
    name:"SellerProducts",
    initialState:{
        value:null
    },
    reducers:{
        addSellerProducts:(state,action)=>{
            state.value = action.payload
        },
        RemoveSellerProducts:(state,action)=>{
            state.value = null
        }
    }
})

export const {addSellerProducts,RemoveSellerProducts}=SellerSilce.actions
export default SellerSilce.reducer

