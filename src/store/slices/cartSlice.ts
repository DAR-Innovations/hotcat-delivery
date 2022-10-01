import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "common/types/cart.type";
import { RootState } from "store/store";

interface CartState {
  cartItemsArr: ICartItem[];
}

const initialState: CartState = {
  cartItemsArr: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<ICartItem>) => {
      const menuFoodId = action.payload.menuFood.id;
      const cartItemIndex = state.cartItemsArr.findIndex(
        item => item.menuFood.id === menuFoodId
      );

      if (cartItemIndex == -1) {
        state.cartItemsArr.push(action.payload);
      } else {
        state.cartItemsArr[cartItemIndex] = action.payload;
      }
    },
    removeCartItem: (state, action: PayloadAction<ICartItem>) => {
      const menuFoodId = action.payload.menuFood.id;
      state.cartItemsArr.filter(item => item.menuFood.id !== menuFoodId);
    },
    addCountToCartItem: (state, action: PayloadAction<ICartItem>) => {
      const menuFoodId = action.payload.menuFood.id;

      const cartItemIndex = state.cartItemsArr.findIndex(
        item => item.menuFood.id === menuFoodId
      );

      if (cartItemIndex !== -1) state.cartItemsArr[cartItemIndex].count += 1;
    },

    substractCountOfCartItem: (state, action: PayloadAction<ICartItem>) => {
      const menuFoodId = action.payload.menuFood.id;

      const cartItemIndex = state.cartItemsArr.findIndex(
        item => item.menuFood.id === menuFoodId
      );

      if (cartItemIndex !== -1) state.cartItemsArr[cartItemIndex].count -= 1;
    },
  },
});

export const {
  substractCountOfCartItem,
  addCountToCartItem,
  removeCartItem,
  setCartItem,
} = cartSlice.actions;

export const selectCartItemsArr = (state: RootState) =>
  state.cartSlice.cartItemsArr;

export const selectSizeOfCartItemsArr = (state: RootState) => {
  return state.cartSlice.cartItemsArr.length;
};

export default cartSlice.reducer;
