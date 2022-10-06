import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { RootState } from "store/store";

interface NotificationModalState {
  isActive: boolean;
  message: string;
  type: NOTIFICATION_TYPES;
}

const initialState: NotificationModalState = {
  isActive: false,
  message: "",
  type: NOTIFICATION_TYPES.ERROR,
};

export const notificationModalSlice = createSlice({
  name: "notificationModalSlice",
  initialState,
  reducers: {
    showNotificationModal: (
      state,
      action: PayloadAction<{ message: string; type: NOTIFICATION_TYPES }>
    ) => {
      state.isActive = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },

    closeNotificationModal: state => {
      state.isActive = false;
    },
  },
});

export const { showNotificationModal, closeNotificationModal } =
  notificationModalSlice.actions;

export const selectNotificationModalIsActive = (state: RootState) =>
  state.notificationModalSlice.isActive;

export const selectNotificationModalMessage = (state: RootState) =>
  state.notificationModalSlice.message;

export const selectNotificationModalType = (state: RootState) =>
  state.notificationModalSlice.type;

export default notificationModalSlice.reducer;
