import { IFood } from "common/types/food.type";
import TengeSolid from "components/UI/Icons/TengeSolid";
import React from "react";

interface MenuFoodListExcerptProps {
  data: IFood;
}

const MenuFoodListExcerpt = ({ data }: MenuFoodListExcerptProps) => {
  const cuttedDescription = data.description.substring(0, 40) + "...";

  return (
    <div className="w-full h-[140px] lg:w-[45%] shadow-xl rounded-xl hover:scale-105 transition-all duration-400 cursor-pointer">
      <div className="h-full flex item-center gap-x-5 sm:gap-x-6">
        <div className="h-full w-[200px]">
          <picture>
            <img
              loading="lazy"
              className="h-full w-[140px] object-cover rounded-xl"
              src={data.image}
              alt={data.name}
            />
          </picture>
        </div>

        <div className="w-full h-full py-3 sm:py-5 sm:px-3">
          <div className="flex w-full h-full flex-col justify-between">
            <div className="w-full">
              <h1 className="font-semibold text-lg sm:text-xl">{data.name}</h1>
              <p className="text-sm sm:text-base font-normal">
                {cuttedDescription}
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 px-3 py-1 bg-gray-200 rounded-lg">
              <p className="text-sm sm:text-base text-black font-normal ">
                {data.price}
              </p>
              <TengeSolid className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFoodListExcerpt;
