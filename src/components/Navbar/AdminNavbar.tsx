import { ADMIN_PAGES_LINKS } from "common/pageLinks";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const AdminNavbar = () => {
  const { pathname } = useRouter();

  const renderedAdminLinks = Object.entries(ADMIN_PAGES_LINKS).map(
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
  return (
    <div className="py-5 border-b-2 border-orange-500 my-5 flex flex-wrap justify-between items-center gap-3">
      <h1 className="font-semibold text-xl">Admin</h1>
      <div className="flex gap-y-2 gap-x-4">{renderedAdminLinks}</div>
    </div>
  );
};

export default AdminNavbar;
