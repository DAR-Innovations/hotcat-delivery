import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "common/types/order.type";
import { RootState } from "store/store";

interface UserOrderStatusModalState {
  isModalActive: boolean;
  isProceeding: boolean;
  order: IOrder | null;
}

const initialState: UserOrderStatusModalState = {
  isProceeding: false,
  isModalActive: false,
  order: null,
};

export const userOrderStatusModalSlice = createSlice({
  name: "userOrderStatusModalSlice",
  initialState,
  reducers: {
    setUserOrderStatus: (
      state,
      action: PayloadAction<{
        order: IOrder;
        isProceeding: boolean;
      }>
    ) => {
      state.order = action.payload.order;
      state.isProceeding = action.payload.isProceeding;
    },

    showUserOrderStatusModal: state => {
      state.isModalActive = true;
    },

    clearUserOrderStatusModal: state => {
      state.isProceeding = false;
      state.isModalActive = false;
      state.order = null;
    },

    closeUserOrderStatusModal: state => {
      state.isModalActive = false;
    },
  },
});

export const {
  setUserOrderStatus,
  showUserOrderStatusModal,
  closeUserOrderStatusModal,
  clearUserOrderStatusModal,
} = userOrderStatusModalSlice.actions;

export const selectUserOrderStatusModalIsActive = (state: RootState) =>
  state.userOrderStatusModalSlice.isModalActive;

export const selectUserOrderStatusModalIsProcceding = (state: RootState) =>
  state.userOrderStatusModalSlice.isProceeding;

export const selectUserOrderStatusModalOrder = (state: RootState) =>
  state.userOrderStatusModalSlice.order;

export const selectUserOrderStatusModalStatus = (state: RootState) => {
  return {
    isCooked: state.userOrderStatusModalSlice.order?.isCooked,
    isDelivered: state.userOrderStatusModalSlice.order?.isCooked,
  };
};

export default userOrderStatusModalSlice.reducer;
