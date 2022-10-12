import { formatDateToDDMMYYY } from "common/helpers/dateFormatter";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { IOrder } from "common/types/order.type";
import {
  changeCookingStatusOfOrder,
  changeDeliveryStatusOfOrder,
} from "proxy/fetches/fetchOrders";
import React, { useState } from "react";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch } from "store/store";
import { on } from "stream";

interface AdminOrdersListExcerptProps {
  data: IOrder;
}

const AdminOrdersListExcerpt = ({ data }: AdminOrdersListExcerptProps) => {
  const [isCooked, setIsCooked] = useState(data.isCooked);
  const [isDelivered, setIsDelivered] = useState(data.isDelivered);

  const dispatch = useAppDispatch();

  const formattedDate = formatDateToDDMMYYY(data.orderDate);

  const formattedOrderItems = data.orderItemList.map(
    item => `${item.food.name} x${item.count}`
  );

  const joinedOrderItems = formattedOrderItems.join(", ");

  const classNameIfCooked =
    isCooked === true && "border-green-200 text-green-800 bg-green-100";

  const classNameIfDelivered =
    isDelivered === true && "border-green-200 text-green-800 bg-green-100";

  const classNameIfDisabled =
    isCooked === false && "bg-gray-200 text-gray-500 border-gray-300";

  const onCookSubmit = async () => {
    const { status, responseData } = await changeCookingStatusOfOrder(data.id);

    if (status !== 200) {
      return dispatch(
        showNotificationModal({
          message: `Error! ${responseData?.message}`,
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    dispatch(
      showNotificationModal({
        message: `Success`,
        type: NOTIFICATION_TYPES.SUCCESS,
      })
    );

    setIsCooked(true);
  };

  const onDeliverySubmit = async () => {
    const { status, responseData } = await changeDeliveryStatusOfOrder(data.id);

    if (status !== 200) {
      return dispatch(
        showNotificationModal({
          message: `Error! ${responseData?.message}`,
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    dispatch(
      showNotificationModal({
        message: `Success`,
        type: NOTIFICATION_TYPES.SUCCESS,
      })
    );

    setIsDelivered(true);
  };

  return (
    <div className="w-full sm:w-[285px] p-5 border-2 border-black rounded-xl">
      <div className="flex flex-col gap-2 pb-5 border-b-2 border-gray-200">
        <p className="font-semibold">Order #{data.id}</p>
        <p className="text-gray-400">{formattedDate}</p>
      </div>

      <div className="py-5 border-b-2 border-gray-200 truncate">
        {joinedOrderItems}
      </div>

      <div className="flex items-center justify-between gap-2 pt-6">
        <p>KZT {data.totalPrice}</p>
        <p className="text-gray-400">X{data.orderItemList.length} items</p>
      </div>

      <div className="pt-6 flex items-center gap-3">
        <button
          onClick={onCookSubmit}
          disabled={data.isCooked === true && true}
          className={`border-2 border-black rounded-lg px-6 py-2 ${classNameIfCooked}`}
        >
          Cooked
        </button>

        <button
          onClick={onDeliverySubmit}
          className={`border-2 border-black rounded-lg px-6 py-2 ${classNameIfDisabled} ${classNameIfDelivered}`}
          disabled={isCooked === false && true}
        >
          Delivered
        </button>
      </div>
    </div>
  );
};

export default AdminOrdersListExcerpt;
