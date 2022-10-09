import { requireAuthentication } from "common/helpers/requireAuthentication";
import AdminOrdersList from "components/Admin/Orders/OrdersList";
import Layout from "components/Layout/Layout";
import AdminNavbar from "components/Navbar/AdminNavbar";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

const AdminOrdersPage: NextPage = () => {
  return (
    <Layout title="Admin Orders">
      <AdminNavbar />

      <AdminOrdersList />
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

export default AdminOrdersPage;
