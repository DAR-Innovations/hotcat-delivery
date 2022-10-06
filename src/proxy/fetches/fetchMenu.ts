import axios from "axios";
import { IMenu } from "common/types/menu.type";
import { API_URL } from "proxy";

export const getAllMenus = async () => {
  const response = await axios.get(`${API_URL}/menus`);
  return response.data as IMenu[];
};

export const deleteMenuById = async (id: number) => {
  const response = await axios.delete(`${API_URL}/menus/${id}`);

  return response;
};
