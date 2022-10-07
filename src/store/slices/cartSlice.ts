import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "common/types/cart.type";
import { RootState } from "store/store";

export interface CartState {
  menuId: number | null;
  cartItemsArr: ICartItem[];
}

export interface CartItemState {
  menuId: number | null;
  cartItem: ICartItem;
}

const initialState: CartState = {
  menuId: null,
  cartItemsArr: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItemsArr: (state, action: PayloadAction<CartState>) => {
      state.cartItemsArr = [...action.payload.cartItemsArr];
      state.menuId = action.payload.menuId;
    },

    setCartItem: (state, action: PayloadAction<CartItemState>) => {
      const menuFoodId = action.payload.cartItem.menuFood.id;
      const menuId = action.payload.menuId;

      const cartItemIndex = state.cartItemsArr.findIndex(
        item => item.menuFood.id === menuFoodId
      );

      if (state.cartItemsArr.length > 0 && state.menuId !== menuId) {
        return alert("Order contains other restaurant food");
      }

      if (cartItemIndex === -1) {
        state.cartItemsArr.push(action.payload.cartItem);
      } else {
        state.cartItemsArr = state.cartItemsArr.filter(
          item => item.menuFood.id !== menuFoodId
        );
      }
    },

    updateCartItemTotalPrice: (state, action: PayloadAction<ICartItem>) => {
      const menuFoodId = action.payload.menuFood.id;

      const cartItemIndex = state.cartItemsArr.findIndex(
        item => item.menuFood.id === menuFoodId
      );

      if (cartItemIndex !== -1) {
        state.cartItemsArr[cartItemIndex].totalPrice =
          state.cartItemsArr[cartItemIndex].count *
          state.cartItemsArr[cartItemIndex].menuFood.price;
      }
    },

    removeCartItem: (state, action: PayloadAction<ICartItem>) => {
      const menuFoodId = action.payload.menuFood.id;
      state.cartItemsArr = state.cartItemsArr.filter(
        item => item.menuFood.id !== menuFoodId
      );
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
  updateCartItemTotalPrice,
  setCartItemsArr,
} = cartSlice.actions;

export const selectCartItemsArr = (state: RootState) =>
  state.cartSlice.cartItemsArr;

export const selectSizeOfCartItemsArr = (state: RootState) => {
  return state.cartSlice.cartItemsArr.length;
};

export const selectTotalCountOfCart = (state: RootState) => {
  return state.cartSlice.cartItemsArr.reduce(
    (totalCount, item) => totalCount + item.count,
    0
  );
};

export const selectMenuIdFromCart = (state: RootState) => {
  if (state.cartSlice.cartItemsArr.length > 0) {
    return state.cartSlice.menuId;
  }

  return null;
};

export const selectCartTotalPrice = (state: RootState) => {
  return state.cartSlice.cartItemsArr.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
};

export const selectCountOfCartItem = (
  state: RootState,
  cartItem: ICartItem
) => {
  const menuFoodId = cartItem.menuFood.id;

  const cartItemIndex = state.cartSlice.cartItemsArr.findIndex(
    item => item.menuFood.id === menuFoodId
  );

  return state.cartSlice.cartItemsArr[cartItemIndex].count;
};

export const selectTotalPriceOfCartItem = (
  state: RootState,
  cartItem: ICartItem
) => {
  const menuFoodId = cartItem.menuFood.id;

  const cartItemIndex = state.cartSlice.cartItemsArr.findIndex(
    item => item.menuFood.id === menuFoodId
  );

  return state.cartSlice.cartItemsArr[cartItemIndex].totalPrice;
};

export default cartSlice.reducer;
