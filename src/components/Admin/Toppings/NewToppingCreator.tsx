import { ToppingDTO } from "common/dto/ToppingDTO";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { useRouter } from "next/router";
import { createNewTopping } from "proxy/fetches/fetchToppings";
import React, { MutableRefObject, useRef } from "react";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch } from "store/store";

const NewToppingCreator = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleOnSubmit = async () => {
    const nameValue = nameRef.current.value;
    const descriptionValue = descriptionRef.current.value;

    const formFieldsValues = [nameValue, descriptionValue];

    const isFormInputValid = formFieldsValues.every(
      value => value !== null && value !== undefined && value != ""
    );

    if (!isFormInputValid) {
      return dispatch(
        showNotificationModal({
          message: "Missing some attributes",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    const toppingDTO: ToppingDTO = {
      name: nameValue,
      description: descriptionValue,
    };

    const response = await createNewTopping(toppingDTO);

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
        Create new topping
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

export default NewToppingCreator;
