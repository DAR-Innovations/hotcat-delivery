import { requireAuthentication } from "common/helpers/requireAuthentication";
import AdminDeliveryProvider from "components/Admin/DeliveryProviders/AdminDeliveryProvider";
import AdminFoods from "components/Admin/Foods/AdminFoods";
import AdminPaymentMethods from "components/Admin/PaymentMethods/AdminPaymentMethods";
import AdminRestaurant from "components/Admin/Restaurants/AdminRestaurant";
import SubscriberNotification from "components/Admin/SubscribersNotification/SubscriberNotification";
import AdminTopping from "components/Admin/Toppings/AdminTopping";
import Layout from "components/Layout/Layout";
import AdminNavbar from "components/Navbar/AdminNavbar";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

const AdminCreatePage: NextPage = () => {
  return (
    <Layout title="Admin Create">
      <AdminNavbar />

      <main className="w-full flex flex-col gap-8 my-8">
        <SubscriberNotification />
        <AdminRestaurant />
        <AdminFoods />
        <AdminDeliveryProvider />
        <AdminPaymentMethods />
        <AdminTopping />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async ctx => {
    return {
      props: {},
    };
  }
);

export default AdminCreatePage;
