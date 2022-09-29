import Layout from "components/layout/Layout";
import HomeBanner from "components/UI/Banners/HomeBanner";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
        <HomeBanner/>
    </Layout>
  );
};

export default Home;
