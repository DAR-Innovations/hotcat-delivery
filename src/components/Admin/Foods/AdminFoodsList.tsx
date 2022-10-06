import { IMenu } from "common/types/menu.type";
import React from "react";
import AdminFoodsListExcerpt from "./AdminFoodsListExcerpt";

interface AdminFoodsListProps {
  data: IMenu[] | undefined;
}

const AdminFoodsList = ({ data }: AdminFoodsListProps) => {
  const renderedRestaurants = data?.map(restaurant => (
    <AdminFoodsListExcerpt key={restaurant.id} data={restaurant} />
  ));
  return (
    <div className="px-6 py-5 border-2 border-gray-400 rounded-xl">
      <div className="flex flex-col gap-y-4">{renderedRestaurants}</div>
    </div>
  );
};

export default AdminFoodsList;
