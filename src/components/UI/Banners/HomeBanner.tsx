import { AUTH_PAGES_LINKS, PAGES_LINKS } from "common/pageLinks";
import Link from "next/link";
import React from "react";

const HomeBanner = () => {
  return (
    <div>
      <div className="hidden sm:flex sm:bg-[url('/assets/homeBannerBackground.png')] bg-cover px-10 py-6 w-full sm:h-[400px] lg:h-[500px] justify-center items-center rounded-3xl">
        <div className="w-full flex items-center justify-center sm:gap-x-12 lg:gap-x-36">
          <div>
            <h1 className="sm:text-2xl text-white lg:text-5xl font-bold sm:mb-1 lg:mb-5">
              Over thousand <br /> flavors in one place
            </h1>
            <p className="text-gray-300 sm:text-base lg:text-lg leading-[100%] sm:mb-7 lg:mb-10">
              Just confirm you order <br /> and enjoy your delicious food
            </p>
            <div className="flex items-center gap-x-8">
              <div>
                <Link href={PAGES_LINKS.MENU.path}>
                  <p className="text-white bg-black px-5 py-2 sm:text-base font-semibold cursor-pointer rounded-xl">
                    Order now
                  </p>
                </Link>
              </div>

              <div>
                <Link href={AUTH_PAGES_LINKS.SIGNUP.path}>
                  <p className="text-gray-300 underline text-lg cursor-pointer">
                    Create account
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <picture>
              <img
                loading="eager"
                className="mt-8 max-w-full w-[330px]  sm:w-[380px] lg:w-[500px]"
                src="/assets/plateWithSteakPhoto.png"
                alt="food"
              />
            </picture>
          </div>
        </div>
      </div>

      <div className="inline-block sm:hidden w-full">
        <picture>
          <img
            className="w-full max-h-[300px]"
            src="/assets/plateWithSteakPhotoMobile.png"
            alt="food"
          />
        </picture>
      </div>
    </div>
  );
};

export default HomeBanner;
