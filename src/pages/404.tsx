import { NAVBAR_PAGES_LINKS } from "common/pageLinks";
import Layout from "components/Layout/Layout";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <Layout navbarIncluded={false} title="Not found" className="w-full">
      <div className="w-full h-screen bg-black flex flex-col justify-center items-center">
        <div className=" mb-12">
          <h1 className="text-center text-8xl sm:text-9xl text-white font-bold mb-5">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl text-center text-white font-medium mb-2">
            Oops! Page not found
          </h2>
          <h3 className="text-sm sm:text-lg text-center text-gray-200 font-normal">
            Sorry, the page you are looking <br /> for could not be found
          </h3>
        </div>

        <div>
          <Link href={NAVBAR_PAGES_LINKS.HOME.path}>
            <button className="cursor-pointer rounded-lg text-base sm:text-lg border-2 border-white hover:bg-white text-white hover:text-black transition-all duration-300 px-8 py-2">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
