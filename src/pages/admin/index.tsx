import Layout from "components/Layout/Layout";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { ADMIN_PAGES_LINKS } from "common/pageLinks";
import AdminNavbar from "components/Navbar/AdminNavbar";
import { requireAuthentication } from "common/helpers/requireAuthentication";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantReport } from "proxy/fetches/fetchRestaurant";
import { RestaurantReportDTO } from "common/dto/RestaurantReportDTO";

interface AdminHomePageProps {
  restaurantReport?: RestaurantReportDTO;
}

const AdminHomePage: NextPage = ({ restaurantReport }: AdminHomePageProps) => {
  const { data } = useQuery(["restaurantReport"], getRestaurantReport, {
    initialData: restaurantReport,
  });

  const renderedOrders = data?.lastOrders?.map((order, index) => {
    const isEven = index % 2 === 0;

    return (
      <div
        key={order.id}
        className={`${
          isEven && "bg-gray-100"
        } grid grid-cols-3 sm:grid-cols-4 gap-x-20 w-full sm:w-[800px] rounded-xl items-center justify-between py-3 px-4`}
      >
        <div className="col-span-2 sm:col-span-3 grid grid-cols-2 items-center gap-x-6 gap-y-1">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-semibold sm:text-lg leading-none truncate ">
              {order.restaurant.name}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-gray-400 font-normal text-sm sm:text-base">
              2022-01-15
            </p>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 flex items-center justify-end gap-1 text-base">
          <div className="flex items-center gap-2">
            <p>KZT</p>
            <p>{order.totalPrice}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Layout title="Admin Dashboard">
      <AdminNavbar />

      <div className="w-full">
        <div className="w-full flex flex-wrap items-center gap-5">
          <div className="min-h-[100px] w-full sm:w-[190px] flex flex-col justify-between items-start bg-gray-100 rounded-xl p-5">
            <p className="w-full font-semibold text-xl mb-1 truncate">
              {data?.customersAmount}
            </p>
            <p className="text-base text-gray-400">Customers</p>
          </div>
          <div className="min-h-[100px] w-full sm:w-[190px] flex flex-col justify-between items-start bg-gray-100 rounded-xl p-5">
            <p className="w-full font-semibold text-xl mb-1 truncate">
              {data?.transactionsAmount}
            </p>
            <p className="text-base text-gray-400">Transactions</p>
          </div>
          <div className="min-h-[100px] w-full sm:w-[190px] flex flex-col justify-between items-start bg-gray-100 rounded-xl p-5">
            <p className="w-full font-semibold text-xl mb-1 truncate">
              KZT {data?.monthlyEarning}
            </p>
            <p className="text-base text-gray-400">Monthly Revenue</p>
          </div>
        </div>

        <div className="w-full mt-12">
          <h1 className="font-semibold text-xl">Last 10 orders</h1>

          <div className="w-full flex flex-col gap-y-3 mt-4">
            {renderedOrders}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async ctx => {
    const restaurantReport = await getRestaurantReport();
    return {
      props: { restaurantReport },
    };
  }
);

export default AdminHomePage;
