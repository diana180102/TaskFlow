import { UserRegister } from "@/types/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState:UserRegister = {
  fullName: "",
  email: "",
  password: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserData: (state, action:PayloadAction<UserRegister>) =>{
            const {email, password} = action.payload;
            state.email = email;
            
        },
        setAddUser: (state, action:PayloadAction<UserRegister>) =>{
            console.log("Acción recibida:", JSON.stringify(action, null, 2));

            const {fullName, email} = action.payload;
            state.fullName = fullName;
            state.email = email;
            
        },
    }
});

//actions
export const {setAddUser, setUserData} = userSlice.actions;
export default userSlice.reducer;