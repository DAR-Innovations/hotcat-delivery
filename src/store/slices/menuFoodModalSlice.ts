import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFood } from "common/types/food.type";
import { RootState } from "store/store";

interface ActiveMenuFoodModalState {
  isModalActive: boolean;
  data: IFood | null;
}

const initialState: ActiveMenuFoodModalState = {
  isModalActive: false,
  data: null,
};

export const menuFoodModalSlice = createSlice({
  name: "menuFoodModalSlice",
  initialState,
  reducers: {
    setSelectedMenuFoodAndOpen: (state, action: PayloadAction<IFood>) => {
      state.data = action.payload;
      state.isModalActive = true;
    },
    closeMenuFoodModal: state => {
      state.data = null;
      state.isModalActive = false;
    },
  },
});

export const { closeMenuFoodModal, setSelectedMenuFoodAndOpen } =
  menuFoodModalSlice.actions;

export const selectIsModalActive = (state: RootState) =>
  state.menuFoodModalSlice.isModalActive;

export const selectSelectedMenuFood = (state: RootState) =>
  state.menuFoodModalSlice.data;

export default menuFoodModalSlice.reducer;
