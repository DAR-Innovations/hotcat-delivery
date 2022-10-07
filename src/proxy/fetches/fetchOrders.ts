import axios from "axios";
import { OrderDTO } from "common/dto/OrderDTO";
import { API_URL } from "proxy";

export const postNewOrder = async (orderDTO: OrderDTO) => {
  const response = await axios.post(`${API_URL}/orders`, orderDTO);
  return response;
};
