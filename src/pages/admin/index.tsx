import NewRestaurantCreator from "components/Admin/Restaurants/NewRestaurantCreator";
import AdminRestaurant from "components/Admin/Restaurants/AdminRestaurant";
import Layout from "components/Layout/Layout";
import { NextPage } from "next";
import React from "react";
import AdminFoods from "components/Admin/Foods/AdminFoods";
import AdminDeliveryProvider from "components/Admin/DeliveryProviders/AdminDeliveryProvider";
import AdminPaymentMethods from "components/Admin/PaymentMethods/AdminPaymentMethods";
import Link from "next/link";
import { ADMIN_PAGES_LINKS } from "common/pageLinks";
import { useRouter } from "next/router";
import AdminNavbar from "components/Navbar/AdminNavbar";

const AdminHomePage: NextPage = () => {
  return (
    <Layout title="Admin Dashboard">
      <AdminNavbar />
    </Layout>
  );
};

export default AdminHomePage;
