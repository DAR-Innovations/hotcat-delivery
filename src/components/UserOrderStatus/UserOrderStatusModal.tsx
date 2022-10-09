import { LinearProgress } from "@mui/material";
import { formatDateToDDMMYYY } from "common/helpers/dateFormatter";
import CloseSolid from "components/UI/Icons/CloseSolid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  closeUserOrderStatusModal,
  selectUserOrderStatusModalIsActive,
  selectUserOrderStatusModalOrder,
  selectUserOrderStatusModalStatus,
} from "store/slices/userOrderStatusModalSlice";
import { useAppDispatch, useAppSelector } from "store/store";

const UserOrderStatusModal = () => {
  const { isCooked } = useAppSelector(selectUserOrderStatusModalStatus);
  const order = useAppSelector(selectUserOrderStatusModalOrder);

  const dispatch = useAppDispatch();
  const isModalActive = useAppSelector(selectUserOrderStatusModalIsActive);

  const statusHandler = !isCooked ? "Cooking..." : "Delivering...";

  const handleCloseModal = () => {
    dispatch(closeUserOrderStatusModal());
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`${
        isModalActive ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-0 right-0 left-0 bottom-0 w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm duration-300 transition-all`}
    >
      <div className="h-full flex items-center justify-center">
        <div
          onClick={e => e.stopPropagation()}
          className={`${
            isModalActive ? "visible opacity-100" : "invisible opacity-0"
          } min-w-[360px] sm:max-w-[500px] bg-white rounded-xl relative`}
        >
          <div className="w-full px-6 py-6">
            <div className="">
              <p className="font-semibold text-xl">
                Order | {order?.restaurant.name}
              </p>
            </div>

            <div className="mt-7">
              <p className="mb-2">{statusHandler}</p>
              <LinearProgress
                className="w-full h-3 rounded-lg"
                color="warning"
              />
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <div>
                <p className="text-gray-400">Total</p>
                <p>KZT {order?.totalPrice}</p>
              </div>
              <div>
                <p className="text-gray-400">Ordered at</p>
                <p>{formatDateToDDMMYYY(order?.orderDate || "")}</p>
              </div>
            </div>
          </div>
          <CloseSolid
            onClick={handleCloseModal}
            className="absolute top-0 bg-orange-500 rounded-lg p-1 -right-12 w-8 h-8 cursor-pointer"
            filledColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default UserOrderStatusModal;
