// store/modalSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: string | null;
}

const initialState: ModalState = {
  isModalOpen: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action:PayloadAction<string>) => {
      state.isModalOpen = action.payload;
      
    },
    closeModal: (state) => {
      state.isModalOpen = null;
    },
  },
});
// Exporta las acciones
export const { openModal, closeModal } = modalSlice.actions;

// Exporta el reducer para incluirlo en el store
export default modalSlice.reducer;