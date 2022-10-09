import { requireAuthentication } from "common/helpers/requireAuthentication";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

const OrderExcerptPage: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async ctx => {
    return {
      props: {},
    };
  }
);

export default OrderExcerptPage;
