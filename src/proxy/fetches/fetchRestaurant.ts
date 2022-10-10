import axios from "axios";
import { RestaurantDTO } from "common/dto/RestaurantDTO";
import { IRestaurant } from "common/types/restaurant.type";
import $api, { API_URL } from "proxy";

export const postNewRestaurant = async (restaurantDTO: RestaurantDTO) => {
  const response = await axios.post(`${API_URL}/restaurants`, restaurantDTO);
  return response;
};

export const getAllRestaurants = async () => {
  const response = await axios.get(`${API_URL}/restaurants`);
  return response.data;
};

export const getAllRestaurantsByName = async (name: string) => {
  const response = await axios.get(
    `${API_URL}/restaurants/search?name=${name}`
  );

  return response.data as IRestaurant[];
};

export const deleteRestaurantById = async (id: number) => {
  const response = await axios.delete(`${API_URL}/restaurants/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  return response;
};
