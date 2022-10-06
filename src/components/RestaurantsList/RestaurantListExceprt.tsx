import { PAGES_LINKS } from "common/pageLinks";
import { IRestaurant } from "common/types/restaurant.type";
import CarSolid from "components/UI/Icons/CarSolid";
import StarOutline from "components/UI/Icons/StarOutline";
import TengeSolid from "components/UI/Icons/TengeSolid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RestaurantListExceprtProps {
  data: IRestaurant;
}

const RestaurantListExceprt = ({ data }: RestaurantListExceprtProps) => {
  const restaurantMenuExcerptLink = `${PAGES_LINKS.MENU.path}/${data.id}`;

  const restaurantDetails = [data.deliveryTime, data.rating].join("  |  ");

  return (
    <div className="w-[80%] h-[335px] sm:min-w-[200px] sm:max-w-[290px] lg:w-[280px] bg-[#ffffff] shadow-xl rounded-xl hover:scale-105 transition-all duration-400 cursor-pointer">
      <Link href={restaurantMenuExcerptLink}>
        <div>
          <div className="w-full h-[200px] rounded-xl">
            <picture>
              <img
                loading="lazy"
                className="w-full h-[200px] object-cover rounded-xl"
                src={data.image}
                alt={data.name}
              />
            </picture>
          </div>
          <div className="px-4 py-3 w-full">
            <h1 className="font-semibold text-xl truncate overflow-x-hidden">
              {data.name}
            </h1>
            <p className="text-base font-normal truncate overflow-x-hidden mb-3">
              {data.shortFoodDescription}
            </p>
            <hr className="min-w-full min-h-[2px] bg-gray-300" />
            <div className="flex items-center gap-x-5 mt-3 truncate overflow-x-hidden">
              <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                <CarSolid className="w-5 h-5" filledColor="rgb(75 85 99)" />
                200
                <TengeSolid className="w-3 h-3" filledColor="rgb(75 85 99)" />
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                {data.deliveryTime}
              </p>
              <p className="text-sm sm:text-base text-gray-600 flex items-center gap-1">
                <StarOutline className="w-5 h-5" filledColor="rgb(75 85 99)" />
                {data.rating}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantListExceprt;
