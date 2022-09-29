import Layout from "components/Layout/Layout";
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
