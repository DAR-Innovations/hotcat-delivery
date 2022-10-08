import { useQuery } from "@tanstack/react-query";
import { IDeliveryProvider } from "common/types/deliveryProvider";
import { GetStaticProps } from "next";
import { getAllDeliveryProviders } from "proxy/fetches/fetchDeliveryProvider";
import React, { FC } from "react";
import AdminDeliveryProviderListExcerpt from "./AdminDeliveryProviderListExcerpt";

interface AdminDeliveryProviderListProps {
  deliveryProvidersList?: IDeliveryProvider[];
}

const AdminDeliveryProviderList: FC<AdminDeliveryProviderListProps> = ({
  deliveryProvidersList,
}) => {
  const { data } = useQuery<IDeliveryProvider[]>(
    ["deliveryProvidersList"],
    getAllDeliveryProviders,
    {
      initialData: deliveryProvidersList,
    }
  );

  const renderedDeliveryProviders = data?.map(delivery => (
    <AdminDeliveryProviderListExcerpt key={delivery.id} data={delivery} />
  ));
  
  return (
    <div className="px-6 py-5 border-2 border-gray-400 rounded-xl">
      <div className="flex flex-col gap-y-4">{renderedDeliveryProviders}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const deliveryProvidersList = await getAllDeliveryProviders();
  return { props: { deliveryProvidersList } };
};

export default AdminDeliveryProviderList;
