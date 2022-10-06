import { IMenu } from "common/types/menu.type";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import CloseSolid from "components/UI/Icons/CloseSolid";
import { useRouter } from "next/router";
import { deleteMenuById } from "proxy/fetches/fetchMenu";
import React from "react";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch } from "store/store";

interface AdminFoodsListExcerptProps {
  data: IMenu;
}

const AdminFoodsListExcerpt = ({ data }: AdminFoodsListExcerptProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOnDelete = async () => {
    const isConfirmed = confirm(
      `Do you want to delete ${data.name} with id ${data.id}`
    );

    if (!isConfirmed) return;

    const response = await deleteMenuById(data.id);
    if (response.status === 200) {
      router.reload();
    } else {
      const errorMessage: string = response.data?.message || "Error!";
      return dispatch(
        showNotificationModal({
          message: errorMessage,
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-x-3">
        <p className="font-semibold">{data.name}</p>
        <p>id: {data.id}</p>
      </div>
      <div>
        <CloseSolid
          onClick={handleOnDelete}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AdminFoodsListExcerpt;
