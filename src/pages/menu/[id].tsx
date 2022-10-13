import { useQuery } from "@tanstack/react-query";
import { PAGES_LINKS } from "common/pageLinks";
import { IMenu } from "common/types/menu.type";
import { IRestaurant } from "common/types/restaurant.type";
import Layout from "components/Layout/Layout";
import MenuFoodList from "components/MenuFoodList/MenuFoodList";
import MenuFoodOrdersList from "components/MenuFoodList/MenuFoodOrderList/MenuFoodOrdersList";
import PriceWithSymbol from "components/UI/Templates/PriceWithSymbol";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { getMenuById } from "proxy/fetches/fetchMenu";
import React from "react";
import { selectCartTotalPrice } from "store/slices/cartSlice";
import { useAppSelector } from "store/store";

const RestaurantMenuPage = () => {
  const {
    query: { id },
  } = useRouter();

  const menuId = id as string;

  const { data, isLoading } = useQuery<IMenu>(
    [`menuWithId${menuId}`],
    () => getMenuById(parseInt(menuId)),
    {
      enabled: id !== null,
    }
  );

  const totalCartPrice = useAppSelector(selectCartTotalPrice);

  const renderedTotalPrice = totalCartPrice !== 0 && (
    <div className="flex items-center justify-start gap-x-1 mb-2">
      <p className="font-semibold text-lg">Total:</p>
      <PriceWithSymbol price={totalCartPrice} />
    </div>
  );

  const renderedOrderButton = totalCartPrice !== 0 && (
    <div className="mt-20 w-full">
      <Link href={PAGES_LINKS.CART.path}>
        <button className="w-full bg-black text-white px-2 py-3 rounded-xl">
          Checkout
        </button>
      </Link>
    </div>
  );

  const renderedEmptyParahraph = totalCartPrice === 0 && (
    <p className="text-xl text-gray-300 text-center mt-20">
      Nothing here yet...
    </p>
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Layout title="Menu">
      {data?.foodList ? (
        <div>
          <h1 className="font-semibold text-3xl py-7">{data?.name}</h1>
          <div className="grid sm:grid-cols-5 lg:grid-cols-4 gap-x-4 ">
            <main className="w-full col-span-4 sm:col-span-3 lg:col-span-3">
              <MenuFoodList data={data} />
            </main>

            <div className="relative hidden sm:block sm:col-span-2 lg:col-span-1 h-full">
              <section className="sticky top-4 h-fit min-h-[300px] p-6 px-3 border-2 border-gray-500 rounded-xl">
                <h1 className="font-semibold text-center text-xl mb-5">
                  My orders
                </h1>
                {renderedTotalPrice}
                {/*List*/}
                <MenuFoodOrdersList />
                {renderedEmptyParahraph}
                {renderedOrderButton}
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen gap-5">
          <p className="text-2xl text-center text-gray-300">There is no menu</p>
          <div>
            <Link href={PAGES_LINKS.MENU.path}>
              <p className="border-2 border-black hover:bg-black hover:text-white transition-all duration-200 px-4 py-2 rounded-lg">
                Return back
              </p>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RestaurantMenuPage;
