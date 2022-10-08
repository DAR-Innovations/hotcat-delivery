import axios from "axios";
import { OrderDTO } from "common/dto/OrderDTO";
import $api, { API_URL } from "proxy";

export const postNewOrder = async (orderDTO: OrderDTO) => {
  const response = await axios.post(`${API_URL}/orders`, orderDTO);
  return response;
};

export const getOrdersByUserId = async (userId: number) => {
  const response = await $api.get(`${API_URL}/users/${userId}/orders`);

  return response.data;
};
