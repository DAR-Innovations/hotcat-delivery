import SuccessSolid from "components/UI/Icons/SuccessSolid";
import React from "react";
import {
  closeDeliveredModal,
  selectDeliveredModalIsActive,
} from "store/slices/deliveredModalStatus";
import { useAppDispatch, useAppSelector } from "store/store";

const DeliveredModalStatus = () => {
  const isModalActive = useAppSelector(selectDeliveredModalIsActive);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeDeliveredModal());
  };
  return (
    <div
      onClick={handleCloseModal}
      className={`${
        isModalActive ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-0 right-0 left-0 bottom-0 h-full w-full bg-black bg-opacity-60 backdrop-blur-sm duration-300 transition-all px-4`}
    >
      <div className="h-screen">
        <div className="h-full flex items-center justify-center">
          <div
            onClick={e => e.stopPropagation()}
            className={`${
              isModalActive ? "visible opacity-100" : "invisible opacity-0"
            } min-w-[360px] sm:max-w-[500px] bg-white rounded-xl relative`}
          >
            <div className="w-full px-6 py-6">
              <div className="flex flex-col items-center gap-4">
                <SuccessSolid filledColor="#2b9347" className="w-14 h-14" />
                <p className="text-center text-lg text-[#2b9347] leading-normal">
                  Your order has been
                  <br />
                  delivered successfully
                </p>
              </div>
              <div className="flex justify-center pt-10">
                <button
                  onClick={handleCloseModal}
                  className="px-10 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-200"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveredModalStatus;
