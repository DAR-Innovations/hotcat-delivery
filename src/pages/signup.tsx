import { PAGES_LINKS } from "common/pageLinks";
import Layout from "components/Layout/Layout";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const SignupPage: NextPage = () => {
  return (
    <Layout
      title={PAGES_LINKS.SIGNUP.name}
      navbarIncluded={false}
      className="w-full"
    >
      <div className="w-full h-screen  bg-[url('/assets/signupBackground.jpg')] bg-cover">
        <div className="w-full h-screen bg-gray-600 bg-opacity-50 backdrop-blur-lg flex items-center justify-center">
          <div className="p-4 min-w-[330px] sm:min-w-[360px]">
            <h1 className="text-2xl font-semibold text-gray-200">
              Create new <br /> Hotcat account
            </h1>

            <div className="flex flex-col gap-y-3 mt-6">
              <input
                type="text"
                className="bg-transparent py-4 border-b-2 border-gray-200 text-gray-50 text-base placeholder-gray-200"
                placeholder="Username/Email"
              />
              <input
                type="password"
                className="bg-transparent py-4 border-b-2 border-gray-200 text-gray-50 text-base placeholder-gray-200"
                placeholder="Password"
              />
            </div>

            <div className="w-full mt-10">
              <button className="border-2 border-black text-black hover:bg-black hover:text-gray-50 rounded-2xl w-full py-2 px-3 transition-all duration-300">
                {PAGES_LINKS.SIGNUP.name}
              </button>
            </div>

            <div className="flex item-center gap-2 mt-20 sm:mt-24">
              <p className="text-gray-200 text-base font-normal">
                Already have an account?
              </p>
              <Link href={PAGES_LINKS.LOGIN.path}>
                <p className="text-gray-200 text-base font-normal underline cursor-pointer">
                  {PAGES_LINKS.LOGIN.name}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
