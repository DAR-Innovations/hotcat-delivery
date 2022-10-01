import {
  AUTH_PAGES_LINKS,
  NAVBAR_PAGES_LINKS,
  PAGES_LINKS,
} from "common/pageLinks";
import CartSolid from "components/UI/Icons/CartSolid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BurgerButtonHandler from "./BurgerButtonHandler";

const Navbar = () => {
  const [isBurgerModalActive, setBurgerModalActive] = useState(false);
  const [isProfileModalActive, setIsProfileModalActive] = useState(false);

  const { pathname } = useRouter();

  const renderedNavbarLinks = Object.entries(NAVBAR_PAGES_LINKS).map(
    ([_, page]) => {
      const isPageSelected = pathname !== null && pathname === page.path;
      const currentPageStyle = isPageSelected ? "underline" : "";

      return (
        <Link href={page.path} key={page.name}>
          <p
            title={page.name}
            className={`font-medium text-lg cursor-pointer ${currentPageStyle} hover:text-gray-400 duration-200 transition-all`}
          >
            {page.name}
          </p>
        </Link>
      );
    }
  );

  const closeAllTabs = () => {
    setBurgerModalActive(false);
    setIsProfileModalActive(false);
  };

  const handleBurgerBtn = () => {
    closeAllTabs();
    setBurgerModalActive(isBurgerModalActive ? false : true);
  };

  const handleProfileModal = () => {
    closeAllTabs();
    setIsProfileModalActive(isProfileModalActive ? false : true);
  };

  return (
    <div className="flex py-5 items-center justify-between">
      <div>
        <Link href={PAGES_LINKS.HOME.path}>
          <picture>
            <img
              loading="lazy"
              className="inline-block h-9 object-contain cursor-pointer"
              src="/assets/logoWithText.png"
              alt="hotcat"
            />
          </picture>
        </Link>
      </div>

      {/* Default Navbar */}
      <div className="hidden sm:flex items-center gap-x-7">
        {renderedNavbarLinks}
      </div>

      {/* Burger Navbar */}
      <div
        className={`${
          isBurgerModalActive ? "block" : "hidden"
        } absolute z-10 top-[75px] left-3 right-3  rounded-xl bg-[#000000] shadow-2xl shadow-[#648e9e65]`}
      >
        <div className="flex flex-col items-center space-y-3 py-8 text-gray-200">
          {renderedNavbarLinks}
        </div>
      </div>

      {/* Auth, cart, burger */}
      <div className="flex items-center gap-x-5 sm:gap-x-7">
        {/* Cart */}
        <div className="relative cursor-pointer mr-2 sm:mr-0">
          <CartSolid className="w-6 h-6" />
          <div className="absolute -top-3 -right-2 w-5 h-5 bg-red-500 rounded-md flex justify-center items-center">
            <p className="text-white text-xs">1</p>
          </div>
        </div>
        {/* Auth */}
        <div>
          <Link href={AUTH_PAGES_LINKS.SIGNUP.path}>
            <p className="border-2 border-black px-6 py-2 cursor-pointer hover:bg-black hover:text-white duration-200 transition-all rounded-xl">
              {AUTH_PAGES_LINKS.SIGNUP.name}
            </p>
          </Link>
        </div>

        <BurgerButtonHandler
          isActive={isBurgerModalActive}
          handleBtn={handleBurgerBtn}
        />
      </div>
    </div>
  );
};

export default Navbar;
