import { useQuery } from "@tanstack/react-query";
import { IOrder } from "common/types/order.type";
import { GetStaticProps } from "next";
import { getRecentOrders } from "proxy/fetches/fetchOrders";
import React from "react";
import AdminOrdersListExcerpt from "./AdminOrdersListExcerpt";

interface AdminOrdersListProps {
  recentOrders?: IOrder[];
}

const AdminOrdersList = ({ recentOrders }: AdminOrdersListProps) => {
  const { data: orders } = useQuery<IOrder[]>(
    ["recentOrderList"],
    getRecentOrders,
    { initialData: recentOrders, refetchInterval: 5000 }
  );

  const renderedOrders = orders?.map(order => (
    <AdminOrdersListExcerpt key={order.id} data={order} />
  ));

  return (
    <div className="flex gap-3">
      {orders && orders?.length > 0 ? (
        renderedOrders
      ) : (
        <div className="w-full h-full flex items-center justify-center pt-10">
          <p className="text-center text-2xl font-semibold text-gray-300">
            No recent orders
          </p>
        </div>
      )}
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const recentOrders = await getRecentOrders();
  return { props: { recentOrders } };
};

export default AdminOrdersList;
