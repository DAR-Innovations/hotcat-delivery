import { listOfFood } from "common/mockEntities";
import React from "react";
import MenuFoodListExcerpt from "./MenuFoodListExcerpt";

const MenuFoodList = () => {
  const renderedMenuFoodExcepts = listOfFood.map(item => (
    <MenuFoodListExcerpt key={item.id} data={item} />
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
