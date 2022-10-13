import React from "react";
import AdminToppingsList from "./AdminToppingsList";
import NewToppingCreator from "./NewToppingCreator";

const AdminTopping = () => {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-3 px-3">Toppings</h1>

      <div className="grid grid-cols-3 gap-5 justify-between">
        <div className="col-span-3 sm:col-span-2">
          <AdminToppingsList />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <NewToppingCreator />
        </div>
      </div>
    </div>
  );
};

export default AdminTopping;
