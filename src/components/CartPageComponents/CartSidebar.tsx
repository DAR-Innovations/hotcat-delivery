import { useQuery } from "@tanstack/react-query";
import { OrderDTO } from "common/dto/OrderDTO";
import { OrderItemDTO } from "common/dto/OrderItemDTO";
import { deliveryProvidersArr } from "common/mockEntities";
import { PAGES_LINKS } from "common/pageLinks";
import { IDeliveryProvider } from "common/types/deliveryProvider";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { IRestaurant } from "common/types/restaurant.type";
import { GetStaticProps } from "next";
import Router from "next/router";
import { getAllDeliveryProviders } from "proxy/fetches/fetchDeliveryProvider";
import { clearCartInLocalStorage } from "proxy/fetches/fetchLocalStorage";
import { getRestaurantByMenuId } from "proxy/fetches/fetchMenu";
import { postNewOrder } from "proxy/fetches/fetchOrders";
import { fetchUser } from "proxy/fetches/fetchUser";
import React, { useEffect, useState } from "react";
import { selectUserId } from "store/slices/authSlice";
import {
  clearCart,
  selectCartItemsArr,
  selectCartTotalPrice,
  selectMenuIdFromCart,
  selectTotalCountOfCart,
} from "store/slices/cartSlice";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch, useAppSelector } from "store/store";

interface CartSidebarProps {
  initialDeliveryProviders?: IDeliveryProvider[];
}

const CartSidebar = ({ initialDeliveryProviders }: CartSidebarProps) => {
  const cartItems = useAppSelector(selectCartItemsArr);
  const totalPriceOfItems = useAppSelector(selectCartTotalPrice);
  const menuId = useAppSelector(selectMenuIdFromCart);
  const totalCountOfCart = useAppSelector(selectTotalCountOfCart);
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();

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
        setDeliveryPrice(delivery.price);
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

  const handleOnOrder = async () => {
    if (!userId) Router.push(PAGES_LINKS.LOGIN.path);

    const orderItemsDTOList: OrderItemDTO[] = cartItems.map(item => {
      return { count: item.count, foodId: item.menuFood.id };
    });

    const orderDTO: OrderDTO = {
      restaurantId: restaurant?.id!,
      deliveryProviderId: selectedDeliveryId!,
      userId: userId!,
      orderItemsList: orderItemsDTOList,
    };

    const response = await postNewOrder(orderDTO);
    if (response.status === 200) {
      dispatch(
        showNotificationModal({
          message: "Success!",
          type: NOTIFICATION_TYPES.SUCCESS,
        })
      );
      clearCartInLocalStorage();
      dispatch(clearCart);

      //TODO: REDIRECT USER TO STATUS
      return;
    } else {
      dispatch(
        showNotificationModal({
          message: response.data?.message,
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
      return;
    }
  };

  useEffect(() => {
    const selectedDeliveryProvider = deliveryProviders?.find(
      delivery => delivery.id === selectedDeliveryId
    );

    if (selectedDeliveryProvider) {
      setDeliveryPrice(selectedDeliveryProvider.price);
      setTotalPriceOfOrder(totalPriceOfItems + selectedDeliveryProvider.price);
    }
  }, [deliveryProviders, selectedDeliveryId, totalPriceOfItems]);

  return (
    <div className="h-fit p-5 border-2 border-black rounded-xl flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Restaurant</p>
          <p className="font-normal text-base">{restaurant?.name}</p>
        </div>

        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Items count</p>
          <p className="font-normal text-base">{totalCountOfCart}</p>
        </div>

        <div className="flex flex-col gap-x-2">
          <p className="text-base text-gray-400">Delivery price</p>
          <p className="font-normal text-base">KZT {deliveryPrice}</p>
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
        <button
          onClick={handleOnOrder}
          className="w-full bg-black px-2 py-4 mt-5 text-white font-medium rounded-xl"
        >
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
