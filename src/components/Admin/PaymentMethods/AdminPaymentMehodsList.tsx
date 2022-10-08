import { useQuery } from "@tanstack/react-query";
import { IPaymentMethod } from "common/types/paymentMethod.type";
import { GetStaticProps } from "next";
import { getAllPaymentMethods } from "proxy/fetches/fetchPaymentMethod";
import React from "react";
import AdminPaymentMehodsListExcerpt from "./AdminPaymentMehodsListExcerpt";

interface AdminPaymentMehodsListProps {
  paymentMethodsList?: IPaymentMethod[];
}

const AdminPaymentMehodsList = ({
  paymentMethodsList,
}: AdminPaymentMehodsListProps) => {
  const { data } = useQuery<IPaymentMethod[]>(
    ["paymentMethodsList"],
    getAllPaymentMethods,
    {
      initialData: paymentMethodsList,
    }
  );

  const renderedPaymentMethods = data?.map(item => (
    <AdminPaymentMehodsListExcerpt key={item.id} data={item} />
  ));

  return (
    <div className="px-6 py-5 border-2 border-gray-400 rounded-xl">
      <div className="flex flex-col gap-y-4">{renderedPaymentMethods}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const paymentMethodsList = await getAllPaymentMethods();
  return { props: { paymentMethodsList } };
};

export default AdminPaymentMehodsList;
