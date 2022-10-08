import AdminOrdersList from "components/Admin/Orders/OrdersList";
import Layout from "components/Layout/Layout";
import AdminNavbar from "components/Navbar/AdminNavbar";
import { NextPage } from "next";
import React from "react";

const AdminOrdersPage: NextPage = () => {
  return (
    <Layout title="Admin Orders">
      <AdminNavbar />

      <AdminOrdersList />
    </Layout>
  );
};

export default AdminOrdersPage;
