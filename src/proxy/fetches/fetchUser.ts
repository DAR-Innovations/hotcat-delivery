import axios from "axios";
import { MessageDTO } from "common/dto/MessageDTO";
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

export const notifySubscribedUsers = async (messageDTO: MessageDTO) => {
  const response = await axios.post(`${API_URL}/users/notify`, messageDTO);
  return response;
};
