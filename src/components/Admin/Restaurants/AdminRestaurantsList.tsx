import { useQuery } from "@tanstack/react-query";
import { IRestaurant } from "common/types/restaurant.type";
import CloseSolid from "components/UI/Icons/CloseSolid";
import { GetStaticProps } from "next";
import { getAllRestaurants } from "proxy/fetches/fetchRestaurant";
import React, { FC } from "react";
import AdminRestaurantsListExcerpt from "./AdminRestaurantsListExcerpt";

interface RestaurantsListProps {
  restaurantsList?: IRestaurant[];
}

const AdminRestaurantsList: FC<RestaurantsListProps> = ({
  restaurantsList,
}) => {
  const { data } = useQuery<IRestaurant[]>(
    ["restaurantsListAdmin"],
    getAllRestaurants,
    {
      initialData: restaurantsList,
    }
  );

  const renderedRestaurants = data?.map(restaurant => (
    <AdminRestaurantsListExcerpt key={restaurant.id} data={restaurant} />
  ));
  return (
    <div className="px-6 py-5 border-2 border-gray-400 rounded-xl">
      <div className="flex flex-col gap-y-4">{renderedRestaurants}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const restaurantsList = await getAllRestaurants();
  return { props: { restaurantsList } };
};

export default AdminRestaurantsList;
