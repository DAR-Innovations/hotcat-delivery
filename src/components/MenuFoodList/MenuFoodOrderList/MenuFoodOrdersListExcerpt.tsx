import { ICartItem } from "common/types/cart.type";
import CloseSolid from "components/UI/Icons/CloseSolid";
import MinusSolid from "components/UI/Icons/MinusSolid";
import PlusSolid from "components/UI/Icons/PlusSolid";
import PriceWithSymbol from "components/UI/Templates/PriceWithSymbol";
import React, { useCallback, useEffect, useState } from "react";

interface MenuFoodOrdersListExcerptProps {
  data: ICartItem;
}

const MenuFoodOrdersListExcerpt = ({
  data,
}: MenuFoodOrdersListExcerptProps) => {
  const [foodCount, setFoodCount] = useState(data.count);
  const [totalPrice, setTotalPrice] = useState(data.totalPrice);

  const isMinusButtonDisabled = foodCount <= 1 && true;

  useEffect(() => {
    setTotalPrice(foodCount * data.menuFood.price);
  }, [data.menuFood.price, foodCount]);

  const handleAddCount = useCallback(() => {
    setFoodCount(prev => prev + 1);
  }, []);

  const handleSubtractCount = useCallback(() => {
    setFoodCount(prev => prev - 1);
  }, []);

  //   #dfedf6

  return (
    <div className="w-full bg-gray-100 py-2 px-3 rounded-lg">
      <div className="flex items-center justify-between gap-x-1">
        <div className="max-w-[80%] flex items-center gap-3">
          <CloseSolid className="w-5 h-5" />

          <div>
            <h1 className="font-semibold text-lg truncate overflow-x-hidden">
              {data.menuFood.name}
            </h1>
            <PriceWithSymbol price={totalPrice} />
          </div>
        </div>

        <div className="flex items-center gap-x-5 bg-gray-100 rounded-xl">
          <button
            onClick={handleSubtractCount}
            className="rounded-md bg-gray-100 p-1"
            disabled={isMinusButtonDisabled}
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
