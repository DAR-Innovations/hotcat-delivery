import { PAGES_LINKS } from "common/pageLinks";
import Layout from "components/Layout/Layout";
import { NextPage } from "next";
import React from "react";

const LoginPage: NextPage = () => {
  return <Layout title={PAGES_LINKS.LOGIN.name}></Layout>;
};

export default LoginPage;
