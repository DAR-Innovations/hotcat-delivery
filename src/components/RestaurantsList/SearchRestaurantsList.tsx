import { IRestaurant } from "common/types/restaurant.type";
import React from "react";
import RestaurantListExceprt from "./RestaurantListExceprt";

interface SearchRestaurantsListProps {
  data: IRestaurant[] | undefined;
}

const SearchRestaurantsList = ({ data }: SearchRestaurantsListProps) => {
  const renderedRestaurantExcepts = data?.map(restaurant => (
    <RestaurantListExceprt key={restaurant.id} data={restaurant} />
  ));

  return (
    <div className="w-full flex flex-wrap items-center gap-6 justify-center sm:justify-start">
      {data && data?.length > 0 ? (
        renderedRestaurantExcepts
      ) : (
        <div className="w-full h-full flex items-center justify-center pt-10">
          <p className="text-center text-2xl font-semibold text-gray-300">
            No search
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchRestaurantsList);
