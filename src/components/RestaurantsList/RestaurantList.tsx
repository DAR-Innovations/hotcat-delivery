import { useQuery } from "@tanstack/react-query";
import { IRestaurant } from "common/types/restaurant.type";
import { GetStaticProps } from "next";
import { getAllRestaurants } from "proxy/fetches/fetchRestaurant";
import React from "react";
import RestaurantListExceprt from "./RestaurantListExceprt";

interface RestaurantsListProps {
  restaurantsList?: IRestaurant[];
}

const RestaurantList = ({ restaurantsList }: RestaurantsListProps) => {
  const { data } = useQuery<IRestaurant[]>(
    ["restaurantsList"],
    getAllRestaurants,
    {
      initialData: restaurantsList,
    }
  );

  const renderedRestaurantExcepts = data?.map((restaurant, index) => (
    <RestaurantListExceprt key={index} data={restaurant} />
  ));

  return (
    <div className="flex flex-wrap">
      <div className="w-full flex flex-wrap items-center gap-6 justify-center sm:justify-start">
        {renderedRestaurantExcepts}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const restaurantsList = await getAllRestaurants();
  return { props: { restaurantsList } };
};

export default RestaurantList;
