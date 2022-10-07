import { DeliveryProviderDTO } from "common/dto/DeliveryProviderDTO";
import { RestaurantDTO } from "common/dto/RestaurantDTO";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { useRouter } from "next/router";
import { postNewDeliveryProvider } from "proxy/fetches/fetchDeliveryProvider";
import { postNewRestaurant } from "proxy/fetches/fetchRestaurant";
import React, { MutableRefObject, useRef, useState } from "react";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch } from "store/store";

const NewDeliveryProviderCreator = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleOnSubmit = async () => {
    const nameValue = nameRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    const priceValue = priceRef.current.value;

    const formFieldsValues = [nameValue, descriptionValue, priceValue];

    const isFormInputValid = formFieldsValues.every(
      value => value !== null && value !== undefined && value != ""
    );

    if (isNaN(parseInt(priceValue))) {
      return dispatch(
        showNotificationModal({
          message: "Invalid price",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    if (!isFormInputValid) {
      return dispatch(
        showNotificationModal({
          message: "Missing some attributes",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    const deliveryProviderDTO: DeliveryProviderDTO = {
      name: nameValue,
      description: descriptionValue,
      price: parseInt(priceValue),
    };

    const response = await postNewDeliveryProvider(deliveryProviderDTO);

    if (response.status !== 200) {
      return dispatch(
        showNotificationModal({
          message: "Error! try again",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    } else {
      dispatch(
        showNotificationModal({
          message: "Success",
          type: NOTIFICATION_TYPES.SUCCESS,
        })
      );

      return router.reload();
    }
  };

  return (
    <div className="px-6 py-5 border-2 border-gray-400 rounded-xl ">
      <h1 className="text-center text-gray-700 text-xl mb-6 font-semibold">
        Create new delivery provider
      </h1>

      <div className="w-full flex flex-col gap-y-5">
        <input
          ref={nameRef}
          type="text"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
          placeholder="Delivery name"
        />

        <input
          ref={descriptionRef}
          type="text"
          placeholder="Delivery description"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
        />

        <input
          ref={priceRef}
          type="number"
          max="10"
          min="0"
          placeholder="Price"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleOnSubmit}
          className="px-7 py-3 border-2 border-black hover:bg-black hover:text-white rounded-lg duration-200 transition-all"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewDeliveryProviderCreator;
