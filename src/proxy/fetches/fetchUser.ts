import { IUser } from "common/types/user.type";
import $api from "proxy";

export const fetchUser = async (id: number): Promise<IUser> => {
  const response = await $api.get(`/users/${id}`);
  return response.data;
};
