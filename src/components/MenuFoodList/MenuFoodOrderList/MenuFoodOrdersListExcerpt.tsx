import { CartItemDTO } from "common/types/cart.type";
import CloseSolid from "components/UI/Icons/CloseSolid";
import MinusSolid from "components/UI/Icons/MinusSolid";
import PlusSolid from "components/UI/Icons/PlusSolid";
import PriceWithSymbol from "components/UI/Templates/PriceWithSymbol";
import {
  fetchAddCountToCartItem,
  fetchRemoveCartItem,
  fetchSubstractCountOfCartItem,
  fetchUpdateCartItemTotalPrice,
} from "proxy/fetches/fetchLocalStorage";
import React, { useCallback, useEffect, useState } from "react";
import {
  addCountToCartItem,
  removeCartItem,
  selectCountOfCartItem,
  selectTotalPriceOfCartItem,
  substractCountOfCartItem,
  updateCartItemTotalPrice,
} from "store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "store/store";

interface MenuFoodOrdersListExcerptProps {
  data: CartItemDTO;
}

const MenuFoodOrdersListExcerpt = ({
  data,
}: MenuFoodOrdersListExcerptProps) => {
  const cartItemCount = useAppSelector(state =>
    selectCountOfCartItem(state, data)
  );
  const totalProceItemCount = useAppSelector(state =>
    selectTotalPriceOfCartItem(state, data)
  );
  const dispatch = useAppDispatch();

  const [foodCount, setFoodCount] = useState(cartItemCount);
  const [totalPrice, setTotalPrice] = useState(totalProceItemCount);

  useEffect(() => {
    setTotalPrice(foodCount * data.food.price);
    dispatch(updateCartItemTotalPrice(data));
    fetchUpdateCartItemTotalPrice(data);
  }, [data, data.food.price, dispatch, foodCount]);

  const handleAddCount = useCallback(() => {
    setFoodCount(prev => prev + 1);
    dispatch(addCountToCartItem(data));
    fetchAddCountToCartItem(data);
  }, [data, dispatch]);

  const handleSubtractCount = useCallback(() => {
    if (foodCount === 1) {
      dispatch(removeCartItem(data));
      fetchRemoveCartItem(data);
    } else {
      setFoodCount(prev => prev - 1);
      dispatch(substractCountOfCartItem(data));
      fetchSubstractCountOfCartItem(data);
    }
  }, [data, dispatch, foodCount]);

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(data));
    fetchRemoveCartItem(data);
  };

  return (
    <div className="w-full bg-gray-100 py-2 px-3 rounded-lg">
      <div className="flex items-center justify-between gap-x-1 gap-y-1 flex-wrap">
        <div className="max-w-[80%] flex items-center gap-3">
          <CloseSolid
            onClick={handleRemoveCartItem}
            className="w-5 h-5 cursor-pointer"
          />

          <div>
            <h1 className="font-semibold text-lg truncate overflow-x-hidden">
              {data.food.name}
            </h1>
            <PriceWithSymbol price={totalPrice} />
          </div>
        </div>

        <div className="flex pl-8 items-center gap-x-5 bg-gray-100 rounded-xl">
          <button
            onClick={handleSubtractCount}
            className="rounded-md bg-gray-100 p-1"
          >
            <MinusSolid className="w-3 h-3 " />
          </button>
          <p>{foodCount}</p>
          <button
            onClick={handleAddCount}
            className="rounded-md bg-gray-100 p-1"
          >
            <PlusSolid className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuFoodOrdersListExcerpt;
