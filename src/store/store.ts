import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSliceReducaer, { cartSlice } from "./slices/cartSlice";
import menuFoodModalSliceReducer, {
  menuFoodModalSlice,
} from "./slices/menuFoodModalSlice";

export const store = configureStore({
  reducer: {
    [menuFoodModalSlice.name]: menuFoodModalSliceReducer,
    [cartSlice.name]: cartSliceReducaer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Custom redux hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
