import { IMenu } from "common/types/menu.type";
import React, { memo } from "react";
import MenuFoodListExcerpt from "./MenuFoodListExcerpt";

interface MenuFoodList {
  data: IMenu | undefined;
}

const MenuFoodList = ({ data }: MenuFoodList) => {
  const renderedMenuFoodExcepts = data?.foodList?.map(item => (
    <MenuFoodListExcerpt key={item.id} data={item} menuId={data.id} />
  ));

  return (
    <div className="flex flex-wrap">
      <div className="w-full flex flex-wrap items-center gap-6 justify-center sm:justify-start">
        {renderedMenuFoodExcepts}
      </div>
    </div>
  );
};

export default memo(MenuFoodList);
