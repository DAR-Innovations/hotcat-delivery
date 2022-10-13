import { useQuery } from "@tanstack/react-query";
import { ITopping } from "common/types/topping.type";
import { GetStaticProps } from "next";
import { getAllToppings } from "proxy/fetches/fetchToppings";
import React from "react";
import AdminToppingsListExcerpt from "./AdminToppingsListExcerpt";

interface AdminToppingsListProps {
  toppingsList?: ITopping[];
}

const AdminToppingsList = ({ toppingsList }: AdminToppingsListProps) => {
  const { data } = useQuery<ITopping[]>(["toppingsList"], getAllToppings, {
    initialData: toppingsList,
  });

  const renderedDeliveryProviders = data?.map(delivery => (
    <AdminToppingsListExcerpt key={delivery.id} data={delivery} />
  ));

  return (
    <div className="px-6 py-5 border-2 border-gray-400 rounded-xl">
      <div className="flex flex-col gap-y-4">{renderedDeliveryProviders}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const toppingsList = await getAllToppings();
  return { props: { toppingsList } };
};

export default AdminToppingsList;
