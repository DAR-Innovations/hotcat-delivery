import { useQuery } from "@tanstack/react-query";
import { FoodDTO } from "common/dto/FoodDTO";
import { FoodListDTO } from "common/dto/FoodListDTO";
import { IFood } from "common/types/food.type";
import { IMenu } from "common/types/menu.type";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { postNewFoodListToMenuById } from "proxy/fetches/fetchFoods";
import { getAllMenus } from "proxy/fetches/fetchMenu";
import { postNewRestaurant } from "proxy/fetches/fetchRestaurant";
import React, { MutableRefObject, useRef, useState } from "react";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch } from "store/store";

interface NewFoodCreatorProps {
  data: IMenu[] | undefined;
}

const NewFoodCreator = ({ data }: NewFoodCreatorProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLInputElement>;
  const imageUrlRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const selectedMenuIdRef = useRef() as MutableRefObject<HTMLSelectElement>;

  const renderedMenuList = data?.map(menu => (
    <option key={menu.id} value={menu.id}>
      {menu.name}
    </option>
  ));

  const handleOnSubmit = async () => {
    const nameValue = nameRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    const imageUrlValue = imageUrlRef.current.value;
    const priceValue = priceRef.current.value;
    const menuIdValue = selectedMenuIdRef.current.value;

    const formFieldsValues = [
      nameValue,
      priceValue,
      descriptionValue,
      imageUrlValue,
      menuIdValue,
    ];

    const isFormInputValid = formFieldsValues.every(
      value => value !== null && value !== undefined && value != ""
    );

    if (
      !isFormInputValid ||
      !isNaN(parseFloat(menuIdValue)) ||
      !isNaN(parseInt(priceValue)) ||
      parseInt(priceValue) > 10
    ) {
      return dispatch(
        showNotificationModal({
          message: "All fields must be filled",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    const foodListDTO: FoodDTO[] = [
      {
        name: nameValue,
        description: descriptionValue,
        price: parseFloat(priceValue),
        image: imageUrlValue,
      },
    ];

    const response = await postNewFoodListToMenuById(
      foodListDTO,
      parseFloat(menuIdValue)
    );

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
        Create new restaurant
      </h1>

      <div className="w-full flex flex-col gap-y-5">
        <input
          ref={nameRef}
          type="text"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
          placeholder="Restaurant name"
        />

        <input
          ref={descriptionRef}
          type="text"
          placeholder="Restaurant description"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
        />

        <input
          ref={imageUrlRef}
          type="text"
          placeholder="Image url"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
        />

        <input
          ref={priceRef}
          type="number"
          placeholder="Rating"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
          min={0}
          max={10}
        />

        <div>
          <label
            htmlFor="restaurantHasDeliveryOption"
            className="px-2 text-gray-400"
          >
            Menu
          </label>
          <select
            ref={selectedMenuIdRef}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 mt-2"
            name="Deliverabe"
            id="restaurantHasDeliveryOption"
          >
            <option value="default" defaultChecked disabled>
              Menus
            </option>
            {renderedMenuList}
          </select>
        </div>
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

export default NewFoodCreator;
