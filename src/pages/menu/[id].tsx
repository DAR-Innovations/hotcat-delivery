import { koreanRestaurant } from "common/mockEntities";
import Layout from "components/Layout/Layout";
import MenuFoodList from "components/MenuFoodList/MenuFoodList";
import MenuFoodModal from "components/MenuFoodList/MenuFoodModal";
import MenuFoodOrdersList from "components/MenuFoodList/MenuFoodOrderList/MenuFoodOrdersList";
import RestaurantList from "components/RestaurantsList/RestaurantList";
import PriceWithSymbol from "components/UI/Templates/PriceWithSymbol";
import React from "react";
import { selectCartTotalPrice } from "store/slices/cartSlice";
import { useAppSelector } from "store/store";

const RestaurantMenuPage = () => {
  //TODO: Get id from path and make query
  const data = koreanRestaurant;

  const totalCartPrice = useAppSelector(selectCartTotalPrice);

  const renderedTotalPrice = totalCartPrice !== 0 && (
    <div className="flex items-center justify-start gap-x-1 mb-2">
      <p className="font-semibold text-lg">Total:</p>
      <PriceWithSymbol price={totalCartPrice} />
    </div>
  );

  const renderedOrderButton = totalCartPrice !== 0 && (
    <div className="mt-20 w-full">
      <button className="w-full bg-black text-white px-2 py-3 rounded-xl">
        Order
      </button>
    </div>
  );

  const renderedEmptyParahraph = totalCartPrice === 0 && (
    <p className="text-xl text-gray-300 text-center mt-20">
      Nothing here yet...
    </p>
  );

  return (
    <Layout title="Menu">
      <h1 className="font-semibold text-3xl py-7">{data.name}</h1>
      <div className="grid sm:grid-cols-5 lg:grid-cols-4 gap-x-4 ">
        <main className="w-full col-span-4 sm:col-span-3 lg:col-span-3">
          <MenuFoodList />
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

      <MenuFoodModal />
    </Layout>
  );
};

export default RestaurantMenuPage;
