import { useQuery } from "@tanstack/react-query";
import { requireAuthentication } from "common/helpers/requireAuthentication";
import { PAGES_LINKS } from "common/pageLinks";
import { IOrder } from "common/types/order.type";
import Layout from "components/Layout/Layout";
import NextSolid from "components/UI/Icons/NextSolid";
import type { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import { getOrdersByUserId } from "proxy/fetches/fetchOrders";
import React, { useEffect } from "react";
import { selectUserId } from "store/slices/authSlice";
import { useAppSelector } from "store/store";

const ProfileOrdersPage: NextPage = () => {
  const userId = useAppSelector(selectUserId);

  const { data: orders } = useQuery<IOrder[]>(
    [`ordersOfUserWitId${userId}`],
    () => getOrdersByUserId(userId!),
    { enabled: userId !== null }
  );

  const renderedOrders = orders?.map((order, index) => {
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
          {/* <div>
          <NextSolid filledColor="rgb(156 163 175)" className="w-4 h-4" />
        </div> */}
        </div>
      </div>
    );
  });

  return (
    <Layout title={PAGES_LINKS.ORDERS.name}>
      <div className="mt-2">
        <h1 className="bg-orange-100 px-6 py-6 text-lg sm:text-xl font-bold rounded-xl">
          Profile / Order history
        </h1>

        <main className="flex flex-col items-center gap-y-3 mt-4">
          {orders && orders?.length > 0 ? (
            renderedOrders
          ) : (
            <div className="w-full h-full flex items-center justify-center pt-10">
              <p className="text-center text-2xl font-semibold text-gray-300">
                No recent orders
              </p>
            </div>
          )}
        </main>
      </div>
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

export default ProfileOrdersPage;
