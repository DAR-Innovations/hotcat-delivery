import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "common/types/order.type";
import { RootState } from "store/store";

interface AdminOrdersModalState {
  isModalActive: boolean;
  order: IOrder | null;
}

const initialState: AdminOrdersModalState = {
  isModalActive: false,
  order: null,
};

export const adminOrderModalSlice = createSlice({
  name: "adminOrderModalSlice",
  initialState,
  reducers: {
    showAdminOrderModal: (state, action: PayloadAction<IOrder>) => {
      state.order = action.payload;
      state.isModalActive = true;
    },

    closeAdminOrderModal: state => {
      state.order = null;
      state.isModalActive = false;
    },
  },
});

export const { showAdminOrderModal, closeAdminOrderModal } =
  adminOrderModalSlice.actions;

export const selectAdminOrderModalIsActive = (state: RootState) =>
  state.adminOrderModalSlice.isModalActive;

export const selectAdminOrderModalOrder = (state: RootState) =>
  state.adminOrderModalSlice.order;

export default adminOrderModalSlice.reducer;
