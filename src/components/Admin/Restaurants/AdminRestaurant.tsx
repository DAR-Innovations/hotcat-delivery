import React from "react";
import NewRestaurantCreator from "./NewRestaurantCreator";
import RestaurantsList from "./AdminRestaurantsList";

const AdminRestaurant = () => {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-3 px-3">Restaurants</h1>

      <div className="grid grid-cols-3 gap-5 justify-between">
        <div className="col-span-3 sm:col-span-2">
          <RestaurantsList />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <NewRestaurantCreator />
        </div>
      </div>
    </div>
  );
};

export default AdminRestaurant;
