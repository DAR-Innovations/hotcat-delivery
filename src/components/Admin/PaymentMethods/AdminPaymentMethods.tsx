import React from "react";
import AdminPaymentMehodsList from "./AdminPaymentMehodsList";
import NewPaymentMethodCreator from "./NewPaymentMethodCreator";

const AdminPaymentMethods = () => {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-3 px-3">Payment methods</h1>

      <div className="grid grid-cols-3 gap-5 justify-between">
        <div className="col-span-3 sm:col-span-2">
          <AdminPaymentMehodsList />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <NewPaymentMethodCreator />
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentMethods;
