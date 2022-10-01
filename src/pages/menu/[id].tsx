import { koreanRestaurant } from "common/mockEntities";
import Layout from "components/Layout/Layout";
import MenuFoodList from "components/MenuFoodList/MenuFoodList";
import RestaurantList from "components/RestaurantsList/RestaurantList";
import React from "react";

const RestaurantMenuPage = () => {
  //TODO: Get id from path and make query
  const data = koreanRestaurant;

  return (
    <Layout title="Menu">
      <h1 className="font-semibold text-3xl py-7">{data.name}</h1>
      <div className="grid sm:grid-cols-5 lg:grid-cols-4 gap-x-4 ">
        <main className="w-full col-span-4 sm:col-span-3 lg:col-span-3">
          <MenuFoodList />
        </main>

        <div className="relative hidden sm:block sm:col-span-2 lg:col-span-1 h-full">
          <section className="sticky top-4 h-fit min-h-[300px] p-6 px-7 bg-[#dfedf6] rounded-xl">
            <h1 className="font-semibold text-center text-xl mb-5">
              My orders
            </h1>

            {/*List*/}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantMenuPage;
