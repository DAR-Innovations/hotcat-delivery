import { IFood } from "common/types/food.type";
import React, { memo } from "react";
import {
  FoodModalState,
  setSelectedMenuFoodAndOpen,
} from "store/slices/menuFoodModalSlice";

import { useAppDispatch, useAppSelector } from "store/store";

interface MenuFoodListExcerptProps {
  data: IFood;
  menuId: number;
}

const MenuFoodListExcerpt = ({ data, menuId }: MenuFoodListExcerptProps) => {
  const dispatch = useAppDispatch();

  const cuttedDescription =
    data.description.length > 40
      ? data.description.substring(0, 40) + "..."
      : data.description;

  const handleOpenModal = () => {
    const dto: FoodModalState = {
      data,
      menuId,
    };

    dispatch(setSelectedMenuFoodAndOpen(dto));
  };

  return (
    <div
      onClick={handleOpenModal}
      className="w-[90%] max-w-[360px] sm:min-w-[200px] sm:max-w-[290px] lg:w-[240px] bg-[#ffffff] shadow-xl rounded-xl hover:scale-105 transition-all duration-400 cursor-pointer"
    >
      <div className="w-full h-[170px] rounded-xl">
        <picture>
          <img
            loading="lazy"
            className="w-full h-[170px] object-cover rounded-xl"
            src={data.image}
            alt={data.name}
          />
        </picture>
      </div>
      <div className="px-4 py-3 sm:pb-5 w-full flex flex-row sm:flex-col justify-between items-center sm:items-start gap-x-4">
        <div className="w-[60%] sm:w-full">
          <h1 className="font-semibold text-xl truncate overflow-x-hidden">
            {data.name}
          </h1>
          <p className="text-base font-normal truncate overflow-x-hidden mb-3 text-gray-400">
            {cuttedDescription}
          </p>
        </div>

        <p className="w-fit text-sm sm:text-base font-normal px-3 py-1 bg-gray-200 rounded-lg">
          KZT {data.price}
        </p>
      </div>
    </div>
  );
};

export default memo(MenuFoodListExcerpt);
