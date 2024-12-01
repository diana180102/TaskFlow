import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen: false,
}

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState,
    reducers: {
        openDropdown: (state) => {
            state.isOpen = true;
        },
        closeDropdown: (state) => {
            state.isOpen = false;
        }
    }
})

export const { openDropdown, closeDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;