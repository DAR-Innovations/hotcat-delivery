import axios from "axios";
import { ToppingDTO } from "common/dto/ToppingDTO";
import { ITopping } from "common/types/topping.type";
import { API_URL } from "proxy";

export const getAllToppings = async () => {
  const response = await axios.get(`${API_URL}/toppings`);
  return response.data as ITopping[];
};

export const deleteToppingById = async (toppingId: number) => {
  const response = await axios.delete(`${API_URL}/toppings/${toppingId}`);
  return response;
};

export const createNewTopping = async (toppingDTO: ToppingDTO) => {
  const response = await axios.post(`${API_URL}/toppings`, toppingDTO);
  return response;
};
