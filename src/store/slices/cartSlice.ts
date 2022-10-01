import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "common/types/cart.type";
import { RootState } from "store/store";

interface CartState {
  cartItemsArr: CartItem[];
}

const initialState: CartState = {
  cartItemsArr: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItemsArr.push(action.payload);
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      const menuFoodId = action.payload.menuFood.id;
      state.cartItemsArr.filter(item => item.menuFood.id !== menuFoodId);
    },
    addCountToCartItem: (state, action: PayloadAction<CartItem>) => {
      const menuFoodId = action.payload.menuFood.id;

      const cartItem = state.cartItemsArr.find(
        item => item.menuFood.id === menuFoodId
      );

      if (cartItem) cartItem.count += 1;
    },

    substractCountOfCartItem: (state, action: PayloadAction<CartItem>) => {
      const menuFoodId = action.payload.menuFood.id;

      const cartItem = state.cartItemsArr.find(
        item => item.menuFood.id === menuFoodId
      );

      if (cartItem) cartItem.count -= 1;
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
