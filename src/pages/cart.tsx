import { deliveryProvidersArr } from "common/mockEntities";
import { PAGES_LINKS } from "common/pageLinks";
import CartMenuFoodList from "components/CartMenuFoodList/CartMenuFoodList";
import Layout from "components/Layout/Layout";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  selectCartTotalPrice,
  selectRestaurantIdFromCart,
  selectSizeOfCartItemsArr,
  selectTotalCountOfCart,
  selectTotalPriceOfCartItem,
} from "store/slices/cartSlice";
import { useAppSelector } from "store/store";

const CartPage: NextPage = () => {
  const cartItemsAmount = useAppSelector(selectSizeOfCartItemsArr);
  const totalPriceOfItems = useAppSelector(selectCartTotalPrice);
  const restaurantId = useAppSelector(selectRestaurantIdFromCart);
  const totalCountOfCart = useAppSelector(selectTotalCountOfCart);

  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null
  );
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

  const [totalPriceOfOrder, setTotalPriceOfOrder] = useState(
    totalPriceOfItems + deliveryPrice
  );

  const renderedDeliveryProviders = deliveryProvidersArr.map(
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
            type="radio"
            name="delivery"
            value={delivery.id}
          />
          <p>{delivery.name}</p>
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

  const isCartEmpty = cartItemsAmount === 0;

  return (
    <Layout title={PAGES_LINKS.CART.name}>
      {isCartEmpty ? (
        <div className="flex flex-col gap-4 items-center justify-center h-screen -mt-20">
          <p className="text-3xl font-semibold text-gray-300">
            The cart is empty
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-10 gap-y-5">
          <div className="col-span-3 sm:col-span-2">
            <h1 className="pt-5 pb-3 font-bold text-xl">Orders</h1>
            <CartMenuFoodList />
          </div>

          <div className="col-span-3 sm:col-span-1">
            <h1 className="pt-5 pb-3 font-bold text-xl">Summary</h1>
            {/* Sidebar */}
            <div className="h-fit p-5 border-2 border-black rounded-xl flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-x-2">
                  <p className="text-base text-gray-400">Restaurant</p>
                  <p className="font-normal text-base">
                    Mexican Restaurant {restaurantId}
                  </p>
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
                  <p className="font-normal text-base">
                    KZT {totalPriceOfOrder}
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-5">
                <div className="flex flex-col gap-x-2">
                  <p className="text-base text-gray-400">Delivery</p>

                  <div className="flex flex-col gap-3">
                    {renderedDeliveryProviders}
                  </div>
                </div>
              </div>

              <div>
                <button className="w-full bg-black px-2 py-4 mt-5 text-white font-medium rounded-xl">
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
