import { listOfRestaurants } from "common/mockEntities";
import React from "react";
import RestaurantListExceprt from "./RestaurantListExceprt";

const RestaurantList = () => {
  //TODO: Change key to id
  const renderedRestaurantExcepts = listOfRestaurants.map(
    (restaurant, index) => (
      <RestaurantListExceprt key={index} data={restaurant} />
    )
  );

  return (
    <div className="flex flex-wrap">
      <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">
        {renderedRestaurantExcepts}
      </div>
    </div>
  );
};

export default RestaurantList;
