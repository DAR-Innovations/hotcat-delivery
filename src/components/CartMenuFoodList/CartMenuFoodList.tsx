import React from "react";
import { selectCartItemsArr } from "store/slices/cartSlice";
import { useAppSelector } from "store/store";
import CartMenuFoodListExcerpt from "./CartMenuFoodListExcerpt";

const CartMenuFoodList = () => {
  const cartItems = useAppSelector(selectCartItemsArr);

  const renderedMenuFoodOrdersExcerpt = cartItems.map(item => (
    <CartMenuFoodListExcerpt key={item.menuFood.id} data={item} />
  ));
  return (
    <div className="flex flex-col gap-y-3">{renderedMenuFoodOrdersExcerpt}</div>
  );
};

export default CartMenuFoodList;
