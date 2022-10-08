import axios from "axios";
import { OrderDetailsDTO } from "common/dto/OrderDetialsDTO";
import { OrderDTO } from "common/dto/OrderDTO";
import { IOrder } from "common/types/order.type";
import $api, { API_URL } from "proxy";

export const postNewOrder = async (orderDTO: OrderDTO) => {
  const response = await axios.post(`${API_URL}/orders`, orderDTO);
  return { data: response.data, status: response.status };
};

export const getOrdersByUserId = async (userId: number) => {
  const response = await $api.get(`${API_URL}/users/${userId}/orders`);

  return response.data;
};

export const getOrderById = async (orderId: number) => {
  const response = await $api.get(`${API_URL}/orders/${orderId}`);

  return response.data;
};

export const fillPaymentAndDeliveryDetails = async (
  orderId: number,
  orderDetialsDto: OrderDetailsDTO
) => {
  const response = await $api.post(
    `${API_URL}/orders/${orderId}/fill`,
    orderDetialsDto
  );

  return { status: response.status, data: response.data };
};
