import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token:null,
    posts:[]
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user
            state.token=action.payload.token
        },
        setLogout:(state)=>{
            state.user=null
            state.token=null
        },
        setPasswords:(state,action)=>{
            if(state.user)state.passwords=action.payload.passwords;
            else console.error("No passwords found for this user");
        },
        setFavourites:(state,action)=>{
            if(state.user)state.favourites=action.payload.favourites;
            else console.error("No favourites found for this user");
        }
    }
})

export const {setLogin,setLogout,setPasswords,setFavourites}=authSlice.actions
export default authSlice.reducer