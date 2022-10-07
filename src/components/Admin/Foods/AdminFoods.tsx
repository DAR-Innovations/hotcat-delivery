import { useQuery } from "@tanstack/react-query";
import { IMenu } from "common/types/menu.type";
import { GetStaticProps } from "next";
import { getAllMenus } from "proxy/fetches/fetchMenu";
import React from "react";
import AdminFoodsList from "./AdminFoodsList";
import NewFoodCreator from "./NewFoodCreator";

interface AdminFoodsProps {
  menusList?: IMenu[];
}

const AdminFoods = ({ menusList }: AdminFoodsProps) => {
  const { data } = useQuery<IMenu[]>(["adminMenuList"], getAllMenus, {
    initialData: menusList,
  });

  return (
    <div>
      <h1 className="text-lg font-semibold mb-3 px-3">Menus and Foods</h1>

      <div className="grid grid-cols-3 gap-5 justify-between">
        <div className="col-span-3 sm:col-span-2">
          <AdminFoodsList data={data} />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <NewFoodCreator data={data} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const menusList = await getAllMenus();
  return { props: { menusList } };
};

export default AdminFoods;
