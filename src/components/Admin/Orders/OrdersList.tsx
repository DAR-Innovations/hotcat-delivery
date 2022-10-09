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

  return <div className="flex gap-3">{renderedOrders}</div>;
};
export const getStaticProps: GetStaticProps = async () => {
  const recentOrders = await getRecentOrders();
  return { props: { recentOrders } };
};

export default AdminOrdersList;
