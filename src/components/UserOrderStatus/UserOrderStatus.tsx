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
      className="fixed bottom-6 right-5 sm:bottom-10 sm:right-10 cursor-pointer  bg-orange-400 rounded-xl py-3 px-5 flex items-center gap-2"
    >
      <LoupeSolid className="w-4 h-4  sm:w-[18px] sm:h-[18px]" />
      <p className="text-sm sm:text-base">See order</p>
    </div>
  );
};

export default React.memo(UserOrderStatus);
