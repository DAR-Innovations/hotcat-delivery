import { useQuery } from "@tanstack/react-query";
import DropDownSolid from "components/UI/Icons/DropDownSolid";
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

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  return (
    <div onClick={handleBtn}>
      <div className="flex items-center">
        <p className="font-medium text-base text-[#1F355E] cursor-pointer mr-1">
          {data?.name}
        </p>

        <DropDownSolid className="w-4 h-4 cursor-pointer" />
      </div>

      {/* Modal */}
      <div
        className={`${
          isActive ? "block" : "hidden"
        } absolute z-50 w-fit min-w-[140px] max-w-[220px] top-[90px] -right-1  rounded-xl bg-[#d4eefa] shadow-2xl shadow-[#648e9e65]`}
      >
        <div className="flex flex-col justify-center items-start w-full px-6 py-5">
          <div className="w-full">
            <h1
              title={data?.name}
              className="font-semibold truncate text-ellipsis overflow-x-hidden pb-2 border-b-[0.1px] border-[#8594b1] text-lg text-[#1F355E]"
            >
              {data?.name}
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start pt-2 space-y-2 mb-2">
            {/* {renderedPageLinks} */}
          </div>
          <div className="w-full pt-2 border-t-[0.1px] border-[#8594b1]">
            <button
              title="Logout"
              onClick={handleLogout}
              className="text-[#1F355E] text-base font-medium rounded-xl hover:text-[#7a99a7]"
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
