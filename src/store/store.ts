import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSliceReducer, { cartSlice } from "./slices/cartSlice";
import authSliceReducer, { authSlice } from "./slices/authSlice";
import adminOrderModalReducer, {
  adminOrderModalSlice,
} from "./slices/adminOrdersModalSlice";

import userOrderStatusModalReducer, {
  userOrderStatusModalSlice,
} from "./slices/userOrderStatusModalSlice";

import notificationModalSliceReducer, {
  notificationModalSlice,
} from "./slices/notificationModalSlice";

import menuFoodModalSliceReducer, {
  menuFoodModalSlice,
} from "./slices/menuFoodModalSlice";

export const store = configureStore({
  reducer: {
    [menuFoodModalSlice.name]: menuFoodModalSliceReducer,
    [cartSlice.name]: cartSliceReducer,
    [authSlice.name]: authSliceReducer,
    [notificationModalSlice.name]: notificationModalSliceReducer,
    [userOrderStatusModalSlice.name]: userOrderStatusModalReducer,
    [adminOrderModalSlice.name]: adminOrderModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Custom redux hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
