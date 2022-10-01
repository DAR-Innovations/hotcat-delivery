import { listOfFood } from "common/mockEntities";
import React from "react";
import MenuFoodListExcerpt from "./MenuFoodListExcerpt";

const MenuFoodList = () => {
  //TODO: Change key to id
  const renderedMenuFoodExcepts = listOfFood.map((restaurant, index) => (
    <MenuFoodListExcerpt key={index} data={restaurant} />
  ));

  return (
    <div className="flex flex-wrap">
      <div className="flex flex-wrap items-center gap-6 sm:gap-x-8 sm:gap-y-6 justify-center sm:justify-start">
        {renderedMenuFoodExcepts}
      </div>
    </div>
  );
};

export default MenuFoodList;
