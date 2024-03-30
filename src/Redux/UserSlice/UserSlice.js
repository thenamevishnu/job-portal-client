import { createSlice } from "@reduxjs/toolkit";

export const UserSlice=createSlice({
    name:'user',
    initialState:{
        id: "",
        name: "",
        username:"",
        email:"",
        picture:"",
        type: "",
        token: ""
    },
    reducers:{
        updateUser:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.id=action.payload.id
            state.picture=action.payload.picture
            state.type=action.payload.type
            state.username = action.payload.username
            state.token = action.payload.token
        }
    }
})

export const {updateUser} =UserSlice.actions
export default UserSlice.reducer