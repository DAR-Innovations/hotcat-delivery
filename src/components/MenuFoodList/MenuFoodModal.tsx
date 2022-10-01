import CloseSolid from "components/UI/Icons/CloseSolid";
import MinusSolid from "components/UI/Icons/MinusSolid";
import PlusSolid from "components/UI/Icons/PlusSolid";
import PriceWithSymbol from "components/UI/Templates/PriceWithSymbol";
import React, { useCallback, useEffect, useState } from "react";
import {
  closeMenuFoodModal,
  selectIsModalActive,
  selectSelectedMenuFood,
} from "store/slices/menuFoodModalSlice";

import { useAppDispatch, useAppSelector } from "store/store";

const MenuFoodModal = () => {
  const isModalActive = useAppSelector(selectIsModalActive);
  const dispatch = useAppDispatch();

  const selectedFood = useAppSelector(selectSelectedMenuFood);
  const initialPrice = selectedFood?.price || 0;
  const initialCount = 1;

  const [foodCount, setFoodCount] = useState(initialCount);
  const [totalPrice, setTotalPrice] = useState(initialPrice * initialCount);

  const isMinusButtonDisabled = foodCount <= 1 && true;

  useEffect(() => {
    setTotalPrice(foodCount * initialPrice!);
  }, [foodCount, initialPrice]);

  const handleCloseModal = () => {
    dispatch(closeMenuFoodModal());
    setFoodCount(initialCount);
  };

  const handleAddCount = useCallback(() => {
    setFoodCount(prev => prev + 1);
  }, []);

  const handleSubtractCount = useCallback(() => {
    setFoodCount(prev => prev - 1);
  }, []);

  const handleAddFoodToCart = () => {
    console.log("food", {
      count: foodCount,
      totalPrice,
      menuFood: selectedFood,
    });
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`${
        isModalActive ? "block" : "hidden"
      } absolute top-0 right-0 left-0 bottom-0 w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm`}
    >
      <div className="relative  h-full flex items-center justify-center">
        <div
          onClick={e => e.stopPropagation()}
          className="max-w-[500px] bg-white rounded-xl relative"
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

            <p className="mb-6">{selectedFood?.description}</p>

            <div className="flex item-center gap-x-2 justify-between">
              <div className="flex items-center gap-x-5 border-2 border-black px-4 py-2 rounded-lg">
                <button
                  onClick={handleSubtractCount}
                  className="rounded-md bg-gray-100 p-1"
                  disabled={isMinusButtonDisabled}
                >
                  <MinusSolid className="w-4 h-4" />
                </button>
                <p>{foodCount}</p>
                <button
                  onClick={handleAddCount}
                  className="rounded-md bg-gray-100 p-1"
                >
                  <PlusSolid className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full">
                <button className="w-full px-5 py-4 bg-black hover:bg-gray-700 duration-200 transition-all text-white rounded-lg font-medium">
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
  );
};

export default MenuFoodModal;
