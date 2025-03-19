import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id:"",
    token:null,
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.id=action.payload.id
            state.token=action.payload.token
        },
        setLogout:(state)=>{
            state.id=""
            state.token=null
        },
    }
})

export const {setLogin,setLogout}=authSlice.actions
export default authSlice.reducer