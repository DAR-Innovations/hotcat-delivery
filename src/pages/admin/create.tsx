import AdminDeliveryProvider from "components/Admin/DeliveryProviders/AdminDeliveryProvider";
import AdminFoods from "components/Admin/Foods/AdminFoods";
import AdminPaymentMethods from "components/Admin/PaymentMethods/AdminPaymentMethods";
import AdminRestaurant from "components/Admin/Restaurants/AdminRestaurant";
import Layout from "components/Layout/Layout";
import AdminNavbar from "components/Navbar/AdminNavbar";
import { NextPage } from "next";
import React from "react";

const AdminCreatePage: NextPage = () => {
  return (
    <Layout title="Admin Create">
      <AdminNavbar />

      <main className="w-full flex flex-col gap-8 my-8">
        <AdminRestaurant />
        <AdminFoods />
        <AdminDeliveryProvider />
        <AdminPaymentMethods />
      </main>
    </Layout>
  );
};

export default AdminCreatePage;
