import { useQuery } from "@tanstack/react-query";
import { deliveryProvidersArr } from "common/mockEntities";
import { PAGES_LINKS } from "common/pageLinks";
import { IRestaurant } from "common/types/restaurant.type";
import CartMenuFoodList from "components/CartMenuFoodList/CartMenuFoodList";
import CartSidebar from "components/CartPageComponents/CartSidebar";
import Layout from "components/Layout/Layout";
import { GetStaticProps, NextPage } from "next";
import { getAllDeliveryProviders } from "proxy/fetches/fetchDeliveryProvider";
import React from "react";
import { selectSizeOfCartItemsArr } from "store/slices/cartSlice";
import { useAppSelector } from "store/store";

const CartPage: NextPage = () => {
  const cartItemsAmount = useAppSelector(selectSizeOfCartItemsArr);

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

          {/* Sidebar */}
          <div className="col-span-3 sm:col-span-1">
            <h1 className="pt-5 pb-3 font-bold text-xl">Summary</h1>
            <CartSidebar />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
