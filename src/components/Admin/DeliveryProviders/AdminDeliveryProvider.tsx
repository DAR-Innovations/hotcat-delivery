import React from "react";
import AdminDeliveryProviderList from "./AdminDeliveryProviderList";
import NewDeliveryProviderCreator from "./NewDeliveryProviderCreator";

const AdminDeliveryProvider = () => {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-3 px-3">Delivery providers</h1>

      <div className="grid grid-cols-3 gap-5 justify-between">
        <div className="col-span-3 sm:col-span-2">
          <AdminDeliveryProviderList />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <NewDeliveryProviderCreator />
        </div>
      </div>
    </div>
  );
};

export default AdminDeliveryProvider;
