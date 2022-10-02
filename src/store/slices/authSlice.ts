import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

interface AuthState {
  isAuth: boolean;
  userId: number | null;
}

const initialState: AuthState = {
  isAuth: false,
  userId: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.authSlice.isAuth;

export const selectUserId = (state: RootState) => state.authSlice.userId;

export default authSlice.reducer;
