import NewRestaurantCreator from "components/Admin/Restaurants/NewRestaurantCreator";
import AdminRestaurant from "components/Admin/Restaurants/AdminRestaurant";
import Layout from "components/Layout/Layout";
import { NextPage } from "next";
import React from "react";

const AdminHomePage: NextPage = () => {
  return (
    <Layout title="Admin">
      <h1 className="w-full py-5 px-5 font-semibold text-lg rounded-lg bg-gray-200 my-5">
        Admin dashboard
      </h1>
      <main className="w-full my-8">
        <AdminRestaurant />
      </main>
    </Layout>
  );
};

export default AdminHomePage;
