import { useQuery } from "@tanstack/react-query";
import { CartItemDTO } from "common/dto/CartItemDTO";
import { ITopping } from "common/types/topping.type";
import CloseSolid from "components/UI/Icons/CloseSolid";
import MinusSolid from "components/UI/Icons/MinusSolid";
import PlusSolid from "components/UI/Icons/PlusSolid";
import PriceWithSymbol from "components/UI/Templates/PriceWithSymbol";
import { fetchPostNewCartItem } from "proxy/fetches/fetchLocalStorage";
import { getAllToppings } from "proxy/fetches/fetchToppings";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CartItemState, setCartItem } from "store/slices/cartSlice";
import {
  closeMenuFoodModal,
  selectIsFoodModalActive,
  selectSelectedMenuFood,
} from "store/slices/menuFoodModalSlice";

import { useAppDispatch, useAppSelector } from "store/store";

const MenuFoodModal = () => {
  const isModalActive = useAppSelector(selectIsFoodModalActive);
  const dispatch = useAppDispatch();

  const { data: selectedFood, menuId } = useAppSelector(selectSelectedMenuFood);
  const initialPrice = selectedFood?.price || 0;
  const initialCount = 1;

  const { data: toppings } = useQuery<ITopping[]>(
    ["toppingsList"],
    getAllToppings
  );

  const [checkedToppings, setCheckedToppings] = useState<number[]>([]);

  const [foodCount, setFoodCount] = useState(initialCount);
  const [totalPrice, setTotalPrice] = useState(initialPrice * initialCount);

  const isMinusButtonDisabled = foodCount <= 1 && true;

  useEffect(() => {
    setTotalPrice(foodCount * initialPrice!);
  }, [foodCount, initialPrice]);

  const handleCheckTopping = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedId = parseInt(e.target.value);
    const indexOfItem = checkedToppings.findIndex(item => item === checkedId);
    if (indexOfItem !== -1) {
      const newToppingsList = checkedToppings.filter(
        item => item !== checkedId
      );
      setCheckedToppings(newToppingsList);
      return;
    }

    const newToppingsList = [...checkedToppings, checkedId];
    setCheckedToppings(newToppingsList);
  };

  const handleCloseModal = () => {
    const initialToppingsArr: number[] = [];
    dispatch(closeMenuFoodModal());
    setCheckedToppings(initialToppingsArr);
    setFoodCount(initialCount);
  };

  const handleAddCount = useCallback(() => {
    setFoodCount(prev => prev + 1);
  }, []);

  const handleSubtractCount = useCallback(() => {
    setFoodCount(prev => prev - 1);
  }, []);

  const handleAddFoodToCart = () => {
    const cartItem: CartItemDTO = {
      toppingsId: checkedToppings,
      count: foodCount,
      totalPrice: totalPrice,
      food: selectedFood!,
    };

    const dto: CartItemState = {
      menuId,
      cartItem,
    };

    dispatch(setCartItem(dto));
    fetchPostNewCartItem(dto);
    handleCloseModal();
  };

  const renderedToppings = toppings?.map(topping => (
    <div key={topping.id}>
      <input
        type="checkbox"
        id={topping.id.toString()}
        value={topping.id}
        className="hidden peer"
        onChange={handleCheckTopping}
        checked={checkedToppings.includes(topping.id)}
      />
      <label
        htmlFor={topping.id.toString()}
        className="inline-flex peer-checked:bg-orange-500 peer-checked:text-white justify-between px-4 py-2 border-gray-300 items-center w-full bg-white rounded-xl border-2 cursor-pointer peer-checked:border-orange-500"
      >
        <div className="block">
          <p className="text-sm sm:text-base -mt-1">{topping.name}</p>
        </div>
      </label>
    </div>
  ));

  return (
    <div
      onClick={handleCloseModal}
      className={`${
        isModalActive ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm duration-300 transition-all px-3`}
    >
      <div className="h-screen">
        <div className="h-full flex items-center justify-center">
          <div
            onClick={e => e.stopPropagation()}
            className={`${
              isModalActive ? "visible opacity-100" : "invisible opacity-0"
            } min-w-[360px] sm:w-[430px] bg-white rounded-xl relative`}
          >
            <div>
              <picture>
                <img
                  loading="lazy"
                  className="w-full h-[300px] rounded-xl object-cover"
                  src={selectedFood?.image}
                  alt={selectedFood?.name}
                />
              </picture>
            </div>

            <div className="px-5 py-5">
              <h1 className="text-xl sm:text-2xl font-bold truncate overflow-x-hidden mb-2">
                {selectedFood?.name}
              </h1>
              <PriceWithSymbol
                className="mb-3"
                classNameOfPrice="font-semibold text-lg"
                price={selectedFood?.price}
              />

              <p className="text-sm sm:text-base mb-6">
                {selectedFood?.description}
              </p>

              <div className="mb-6">
                <h1 className="mb-2 font-bold text-gray-300">Additionals</h1>
                <div className="flex flex-wrap items-center gap-3">
                  {renderedToppings}
                </div>
              </div>

              <div className="flex item-center gap-x-2 justify-between">
                <div className="flex items-center gap-x-5 border-2 border-black px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
                  <button
                    onClick={handleSubtractCount}
                    className="rounded-md bg-gray-100 p-1"
                    disabled={isMinusButtonDisabled}
                  >
                    <MinusSolid className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <p>{foodCount}</p>
                  <button
                    onClick={handleAddCount}
                    className="rounded-md bg-gray-100 p-1"
                  >
                    <PlusSolid className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <div className="w-full">
                  <button
                    onClick={handleAddFoodToCart}
                    className="w-full p-3 sm:px-5 sm:py-4 bg-black hover:bg-gray-700 duration-200 transition-all text-white rounded-lg font-normal sm:font-medium"
                  >
                    <div className="flex items-center justify-center gap-x-4">
                      <p>Add order</p>
                      <PriceWithSymbol price={totalPrice} fill="white" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <CloseSolid
              onClick={handleCloseModal}
              className="absolute top-3 bg-black rounded-lg p-1 right-3 w-8 h-8 cursor-pointer"
              filledColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MenuFoodModal);
