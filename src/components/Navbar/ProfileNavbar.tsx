import { useQuery } from "@tanstack/react-query";
import { PROFILE_PAGES_LINKS } from "common/pageLinks";
import DropDownSolid from "components/UI/Icons/DropDownSolid";
import ProfileUserOutline from "components/UI/Icons/ProfileOutline";
import Link from "next/link";
import { logoutUser } from "proxy/fetches/authApi";
import { fetchUser } from "proxy/fetches/fetchUser";
import React, { MouseEventHandler, useState } from "react";
import { selectUserId } from "store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "store/store";

interface ProfileNavbarProps {
  isActive: boolean;
  handleBtn: MouseEventHandler;
}

const ProfileNavbar = ({ isActive, handleBtn }: ProfileNavbarProps) => {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const { data } = useQuery(["user"], () => fetchUser(userId!), {
    enabled: userId !== null,
  });

  const renderedPageLinks = Object.entries(PROFILE_PAGES_LINKS).map(
    ([_, page]) => {
      return (
        <Link href={page.path} key={page.name}>
          <p
            title={page.name}
            className={`font-medium text-sm sm:text-base cursor-pointer text-white hover:text-gray-400 duration-200 transition-all`}
          >
            {page.name}
          </p>
        </Link>
      );
    }
  );

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  return (
    <div onClick={handleBtn}>
      <div className="flex items-center gap-x-1">
        <ProfileUserOutline className="w-7 h-7 cursor-pointer" />
        <DropDownSolid className="w-4 h-4 cursor-pointer" />
      </div>

      {/* Modal */}
      <div
        className={`${
          isActive ? "block" : "hidden"
        } absolute z-50 w-fit min-w-[140px] max-w-[220px] top-[75px] -right-1 rounded-xl bg-black shadow-2xl`}
      >
        <div className="flex flex-col justify-center items-start w-full px-6 py-5">
          <div className="w-full">
            <h1
              title={data?.name}
              className="font-semibold text-white truncate text-ellipsis overflow-x-hidden pb-3 border-b-[0.1px] border-gray-500 text-semibold"
            >
              {data?.name}
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start pt-3 space-y-2 mb-2">
            {renderedPageLinks}
          </div>
          <div className="w-full">
            <button
              title="Logout"
              onClick={handleLogout}
              className="text-white text-sm sm:text-base font-medium rounded-xl hover:text-gray-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
