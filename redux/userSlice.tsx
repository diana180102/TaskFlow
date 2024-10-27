import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserData: (state, action) =>{
            const {email, password} = action.payload;
            state.email = email;
            state.password = password;
        },
        setAddUser: (state, action) =>{
            const {name, email, password} = action.payload;
            state.name = name;
            state.email = email;
            state.password = password;
        },
    }
});

//actions
export const {setAddUser, setUserData} = userSlice.actions;
export default userSlice.reducer;