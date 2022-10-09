import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFood } from "common/types/food.type";
import { RootState } from "store/store";

interface ActiveMenuFoodModalState {
  isModalActive: boolean;
  data: IFood | null;
  menuId: number | null;
}

export interface FoodModalState {
  data: IFood;
  menuId: number;
}

const initialState: ActiveMenuFoodModalState = {
  isModalActive: false,
  data: null,
  menuId: null,
};

export const menuFoodModalSlice = createSlice({
  name: "menuFoodModalSlice",
  initialState,
  reducers: {
    setSelectedMenuFoodAndOpen: (
      state,
      action: PayloadAction<FoodModalState>
    ) => {
      state.menuId = action.payload.menuId;
      state.data = action.payload.data;
      state.isModalActive = true;
    },
    closeMenuFoodModal: state => {
      state.menuId = null;
      state.data = null;
      state.isModalActive = false;
    },
  },
});

export const { closeMenuFoodModal, setSelectedMenuFoodAndOpen } =
  menuFoodModalSlice.actions;

export const selectIsFoodModalActive = (state: RootState) =>
  state.menuFoodModalSlice.isModalActive;

export const selectSelectedMenuFood = (state: RootState) => {
  return {
    data: state.menuFoodModalSlice.data,
    menuId: state.menuFoodModalSlice.menuId,
  } as FoodModalState;
};

export default menuFoodModalSlice.reducer;
