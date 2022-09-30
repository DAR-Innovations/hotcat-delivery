import Layout from "components/Layout/Layout";
import RestaurantList from "components/RestaurantsList/RestaurantList";
import MenuBanner from "components/UI/Banners/MenuBanner";
import { NextPage } from "next";
import React from "react";

const MenuPage: NextPage = () => {
  return (
    <Layout title="Menu">
      <MenuBanner />

      <main className="py-8">
        <h1 className="font-semibold text-2xl mb-5">Choose restaurant</h1>
        <RestaurantList />
      </main>
    </Layout>
  );
};

export default MenuPage;
