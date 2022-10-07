import { useQuery } from "@tanstack/react-query";
import { deliveryProvidersArr } from "common/mockEntities";
import { IDeliveryProvider } from "common/types/deliveryProvider";
import { IRestaurant } from "common/types/restaurant.type";
import { GetStaticProps } from "next";
import { getAllDeliveryProviders } from "proxy/fetches/fetchDeliveryProvider";
import { getRestaurantByMenuId } from "proxy/fetches/fetchMenu";
import React, { useEffect, useState } from "react";
import {
  selectCartTotalPrice,
  selectMenuIdFromCart,
  selectTotalCountOfCart,
} from "store/slices/cartSlice";
import { useAppSelector } from "store/store";

interface CartSidebarProps {
  initialDeliveryProviders?: IDeliveryProvider[];
}

const CartSidebar = ({ initialDeliveryProviders }: CartSidebarProps) => {
  const totalPriceOfItems = useAppSelector(selectCartTotalPrice);
  const menuId = useAppSelector(selectMenuIdFromCart);
  const totalCountOfCart = useAppSelector(selectTotalCountOfCart);

  const { data: restaurant } = useQuery<IRestaurant>(
    [`restaurantWithMenuId${menuId}`],
    () => getRestaurantByMenuId(menuId!),
    {
      enabled: menuId !== null,
    }
  );

  const { data: deliveryProviders } = useQuery<IDeliveryProvider[]>(
    ["deliveryProvidersList"],
    getAllDeliveryProviders,
    {
      initialData: initialDeliveryProviders,
    }
  );

  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null
  );
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

  const [totalPriceOfOrder, setTotalPriceOfOrder] = useState(
    totalPriceOfItems + deliveryPrice
  );

  const renderedDeliveryProviders = deliveryProviders?.map(
    (delivery, index) => {
      if (index === 0 && selectedDeliveryId === null) {
        setSelectedDeliveryId(delivery.id);
        setDeliveryPrice(delivery.deliveryPrice);
      }

      return (
        <div
          key={delivery.id}
          className="bg-gray-100 p-4 flex items-center gap-2 rounded-xl"
        >
          <input
            defaultChecked={index === 0}
            onChange={e => setSelectedDeliveryId(parseInt(e.target.value))}
            id={delivery.id.toString()}
            type="radio"
            name="delivery"
            value={delivery.id}
          />
          <label className="w-full h-full" htmlFor={delivery.id.toString()}>
            {delivery.name}
          </label>
        </div>
      );
    }
  );

  useEffect(() => {
    const selectedDeliveryProvider = deliveryProvidersArr.find(
      delivery => delivery.id === selectedDeliveryId
    );

    if (selectedDeliveryProvider) {
      setDeliveryPrice(selectedDeliveryProvider?.deliveryPrice);
      setTotalPriceOfOrder(
        totalPriceOfItems + selectedDeliveryProvider?.deliveryPrice
      );
    }
  }, [selectedDeliveryId, totalPriceOfItems]);

  return (
    <div className="h-fit p-5 border-2 border-black rounded-xl flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Restaurant</p>
          <p className="font-normal text-base">{restaurant?.name}</p>
        </div>

        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Delivery price</p>
          <p className="font-normal text-base">KZT {deliveryPrice}</p>
        </div>

        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Items count</p>
          <p className="font-normal text-base">{totalCountOfCart}</p>
        </div>

        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Total price</p>
          <p className="font-normal text-base">KZT {totalPriceOfOrder}</p>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-5">
        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Delivery</p>

          <div className="flex flex-col gap-3">{renderedDeliveryProviders}</div>
        </div>
      </div>

      <div>
        <button className="w-full bg-black px-2 py-4 mt-5 text-white font-medium rounded-xl">
          Order
        </button>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const deliveryProvidersList = await getAllDeliveryProviders();
  return { props: { deliveryProvidersList } };
};

export default CartSidebar;
