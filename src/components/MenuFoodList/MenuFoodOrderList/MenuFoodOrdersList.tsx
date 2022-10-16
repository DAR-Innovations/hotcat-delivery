import React, { memo } from "react";
import { selectCartItemsArr } from "store/slices/cartSlice";
import { useAppSelector } from "store/store";
import MenuFoodOrdersListExcerpt from "./MenuFoodOrdersListExcerpt";

const MenuFoodOrdersList = () => {
  const cartItems = useAppSelector(selectCartItemsArr);

  const renderedMenuFoodOrdersExcerpt = cartItems.map(item => (
    <MenuFoodOrdersListExcerpt key={item.food.id} data={item} />
  ));
  return (
    <div className="flex flex-col gap-y-3">{renderedMenuFoodOrdersExcerpt}</div>
  );
};

export default memo(MenuFoodOrdersList);
