import LoupeSolid from "components/UI/Icons/LoupeSolid";
import React from "react";
import { showUserOrderStatusModal } from "store/slices/userOrderStatusModalSlice";
import { useAppDispatch } from "store/store";

const UserOrderStatus = () => {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(showUserOrderStatusModal());
  };

  return (
    <div
      onClick={handleOpenModal}
      className="absolute bottom-10 cursor-pointer right-10 bg-orange-400 rounded-xl py-3 px-5 flex items-center gap-2"
    >
      <LoupeSolid className="w-[18px] h-[18px]" />
      <p>See order</p>
    </div>
  );
};

export default UserOrderStatus;
