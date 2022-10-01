import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import React, { useCallback, useEffect } from "react";
import CloseSolid from "../UI/Icons/CloseSolid";

interface NotificationModalProps {
  isActive: boolean;
  setShowNotificationModal: (state: boolean) => void;
  type: NOTIFICATION_TYPES;
  message: string | null;
}

const ERROR_MODAL_STYLE = "bg-[#ECC5BB] border-2 border border-[#ECC5BB]";
const SUCCESS_MODAL_STYLE = "bg-[#E4FCE9] border-2 border border-[#C5E4CA]";
const NOTIFICATION_EXPIRATION_INTERVAL_IN_SECONDS = 3000;

const NotificationModal = ({
  type,
  message,
  isActive,
  setShowNotificationModal,
}: NotificationModalProps) => {
  const handleModal = useCallback(() => {
    setShowNotificationModal(false);
  }, [setShowNotificationModal]);

  useEffect(() => {
    const closeModal = setTimeout(() => {
      handleModal();
    }, NOTIFICATION_EXPIRATION_INTERVAL_IN_SECONDS);
    return () => clearTimeout(closeModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const styleDependsOnType = `${
    isActive ? "visible opacity-100" : "invisible opacity-0"
  } fixed transition-all duration-300 delay-200 justify-center items-center bottom-10 right-10 max-w-[350px] min-w-[300px] py-4 px-8 rounded-xl ${
    type === NOTIFICATION_TYPES.ERROR && ERROR_MODAL_STYLE
  } ${type === NOTIFICATION_TYPES.SUCCESS && SUCCESS_MODAL_STYLE}`;
  return (
    <div className={styleDependsOnType}>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-base text-black truncate text-ellipsis overflow-x-hidden">
          {message}
        </h3>

        <div className="flex justify-center items-center ml-4">
          <button onClick={handleModal}>
            <CloseSolid className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
