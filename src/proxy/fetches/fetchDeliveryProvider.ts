import axios from "axios";
import { DeliveryProviderDTO } from "common/dto/DeliveryProviderDTO";
import { IDeliveryProvider } from "common/types/deliveryProvider";
import { API_URL } from "proxy";

const deliveryUrl = `${API_URL}/deliveries`;

export const getAllDeliveryProviders = async () => {
  const response = await axios.get(deliveryUrl);
  return response.data as IDeliveryProvider[];
};

export const deleteDeliveryProviderById = async (id: number) => {
  const response = await axios.delete(`${deliveryUrl}/${id}`);
  return response;
};

export const postNewDeliveryProvider = async (
  deliveryProviderDTO: DeliveryProviderDTO
) => {
  const response = await axios.post(deliveryUrl, deliveryProviderDTO);
  return response;
};
