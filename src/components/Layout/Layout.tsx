import Navbar from "components/Navbar/Navbar";
import Head from "next/head";
import React from "react";

interface LayoutProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
  navbarIncluded?: boolean;
}

const Layout = ({ title, children, navbarIncluded = true }: LayoutProps) => {
  const headerTitle = `Hotcat | ${title}`;
  return (
    <div className="h-screen w-full overflow-x-hidden ">
      <Head>
        <title>{headerTitle}</title>
      </Head>
      <div className="container mx-auto px-3 py-1 bg-white text-black font-inter leading-none">
        {navbarIncluded && <Navbar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
