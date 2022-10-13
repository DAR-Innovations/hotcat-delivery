import axios from "axios";
import { IUser } from "common/types/user.type";
import $api, { API_URL } from "proxy";

export const fetchUser = async (id: number): Promise<IUser> => {
  const response = await $api.get(`/users/${id}`);
  return response.data;
};

export const getUserRole = async (
  id: number,
  accessToken: string
): Promise<string> => {
  const response = await axios.get(
    `${API_URL || "http://localhost:8080/api/v1"}/users/${id}/role`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};
