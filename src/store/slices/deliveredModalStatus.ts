import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

interface DeliveredModalState {
  isModalActive: boolean;
  //   order: IOrder | null;
}

const initialState: DeliveredModalState = {
  isModalActive: false,
};

export const deliveredModalSlice = createSlice({
  name: "deliveredModalSlice",
  initialState,
  reducers: {
    showDeliveredModal: state => {
      state.isModalActive = true;
    },
    closeDeliveredModal: state => {
      state.isModalActive = false;
    },
  },
});

export const { showDeliveredModal, closeDeliveredModal } =
  deliveredModalSlice.actions;

export const selectDeliveredModalIsActive = (state: RootState) =>
  state.deliveredModalSlice.isModalActive;

export default deliveredModalSlice.reducer;
