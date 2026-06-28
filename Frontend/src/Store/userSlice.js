import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        value:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.value = action.payload
        },
        removeUser:(state,action)=>{
            state.value=null
        }
    }
})
export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer
