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
    <div className="container h-screen w-full overflow-x-hidden mx-auto border-white px-3 py-1 text-black font-inter leading-none">
      <Head>
        <title>{headerTitle}</title>
      </Head>
      {navbarIncluded && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
