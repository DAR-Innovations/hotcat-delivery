import Navbar from "components/Navbar/Navbar";
import Head from "next/head";
import React from "react";

interface LayoutProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
  navbarIncluded?: boolean;
}

const Layout = ({ title, children, navbarIncluded = true }: LayoutProps) => {
  const headerTitle = `Foodie | ${title}`;
  return (
    <div className="container h-screen w-full overflow-x-hidden mx-auto border-white p-1 text-black font-inter">
      <Head>
        <title>{headerTitle}</title>
      </Head>
      {navbarIncluded && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
