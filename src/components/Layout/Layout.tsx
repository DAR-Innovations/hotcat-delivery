import Navbar from "components/Navbar/Navbar";
import Head from "next/head";
import React from "react";

interface LayoutProps {
  className?: string;
  title: string;
  children?: React.ReactNode | React.ReactNode[];
  navbarIncluded?: boolean;
}

const Layout = ({
  title,
  children,
  className,
  navbarIncluded = true,
}: LayoutProps) => {
  const layoutClassName = !Boolean(className)
    ? "container mx-auto px-3 py-1 bg-white text-black font-inter leading-none  pb-20"
    : className;
  const headerTitle = `Hotcat | ${title}`;

  return (
    <div className="h-screen w-full overflow-x-hidden">
      <Head>
        <title>{headerTitle}</title>
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
      </Head>
      <div className={layoutClassName}>
        {navbarIncluded && <Navbar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
