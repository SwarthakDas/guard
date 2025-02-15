import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id:"",
    token:null,
    posts:[]
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
        setPasswords:(state,action)=>{
            if(state.id)state.passwords=action.payload.passwords;
            else console.error("No passwords found for this user");
        },
        setFavourites:(state,action)=>{
            if(state.id)state.favourites=action.payload.favourites;
            else console.error("No favourites found for this user");
        }
    }
})

export const {setLogin,setLogout,setPasswords,setFavourites}=authSlice.actions
export default authSlice.reducer