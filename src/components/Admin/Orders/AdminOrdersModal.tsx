import { formatDateToDDMMYYY } from "common/helpers/dateFormatter";
import React from "react";
import {
  closeAdminOrderModal,
  selectAdminOrderModalIsActive,
  selectAdminOrderModalOrder,
} from "store/slices/adminOrdersModalSlice";
import { useAppDispatch, useAppSelector } from "store/store";

const AdminOrdersModal = () => {
  const isModalActive = useAppSelector(selectAdminOrderModalIsActive);
  const order = useAppSelector(selectAdminOrderModalOrder);
  const dispatch = useAppDispatch();

  const formattedOrderItems = order?.orderItemList.map(item => {
    const toppings = item.toppings.map(topping => topping.name).join(", ");

    return (
      <div key={item.food.id}>
        <p>
          {item.food.name} x{item.count}
          {toppings.length > 0 ? ` + (${toppings})` : ""}
        </p>
      </div>
    );
  });

  const formattedDate = formatDateToDDMMYYY(order?.orderDate || "");

  const handleCloseModal = () => {
    return dispatch(closeAdminOrderModal());
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`${
        isModalActive ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-0 right-0 left-0 bottom-0 h-screen w-screen bg-black bg-opacity-60 backdrop-blur-sm duration-300 transition-all px-4`}
    >
      <div className="h-full">
        <div className="h-full flex items-center justify-center">
          <div
            onClick={e => e.stopPropagation()}
            className={`${
              isModalActive ? "visible opacity-100" : "invisible opacity-0"
            } min-w-[360px] sm:max-w-[500px] bg-white rounded-xl relative`}
          >
            <div className="w-full px-6 py-6">
              <div className="flex flex-col gap-2 truncate pb-5 border-b-2 border-gray-200">
                <p className="font-semibold truncate">Order #{order?.id}</p>
                <p className="text-gray-400 truncate">{formattedDate}</p>
              </div>

              <div className="flex flex-col gap-y-1 py-5 border-b-2 border-gray-200">
                {formattedOrderItems}
              </div>

              {/* DETAILS */}
              <div className="flex flex-col gap-3 pt-6 truncate">
                <div className="flex items-center justify-between gap-2 truncate">
                  <p>Total:</p>
                  <p className="text-gray-400 truncate">
                    KZT {order?.totalPrice}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 truncate">
                  <p>Delivery:</p>
                  <p className="text-gray-400 truncate">
                    {order?.deliveryProvider.name}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 truncate">
                  <p>Address:</p>
                  <p className="text-gray-400 truncate">
                    {order?.deliveryDetails.address}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 truncate">
                  <p>Restaurant:</p>
                  <p className="text-gray-400 truncate">
                    {order?.restaurant.name}
                  </p>
                </div>
              </div>

              <div className="pt-5">
                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 px-3 border-2 border-black hover:bg-black hover:text-white duration-200 transition-all rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersModal;
