import { createSlice } from "@reduxjs/toolkit";

const sellerOrderSilce = createSlice({
    name:"SellerOrder",
    initialState:{
        value:null
    },
    reducers:{
        addSellOrder:(state,action)=>{
            state.value = action.payload
        },
        removeSellOrder:(state,action)=>{
            state.value = null
        }
    }
})

export const {addSellOrder,removeSellOrder} = sellerOrderSilce.actions
export default sellerOrderSilce.reducer