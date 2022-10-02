import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSliceReducer, { cartSlice } from "./slices/cartSlice";
import authSliceReducer, { authSlice } from "./slices/authSlice";
import menuFoodModalSliceReducer, {
  menuFoodModalSlice,
} from "./slices/menuFoodModalSlice";

export const store = configureStore({
  reducer: {
    [menuFoodModalSlice.name]: menuFoodModalSliceReducer,
    [cartSlice.name]: cartSliceReducer,
    [authSlice.name]: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Custom redux hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
