// store/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});
// Exporta las acciones
export const { openModal, closeModal } = modalSlice.actions;

// Exporta el reducer para incluirlo en el store
export default modalSlice.reducer;