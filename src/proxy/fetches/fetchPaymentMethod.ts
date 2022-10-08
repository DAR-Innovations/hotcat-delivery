import axios from "axios";
import { PaymentMethodDTO } from "common/dto/PaymentMethodDTO";
import { IPaymentMethod } from "common/types/paymentMethod.type";
import { API_URL } from "proxy";

export const getAllPaymentMethods = async () => {
  const response = await axios.get(`${API_URL}/payment-methods`);
  return response.data as IPaymentMethod[];
};

export const deletePaymentMethodById = async (id: number) => {
  const response = await axios.delete(`${API_URL}/payment-methods/${id}`);
  return response;
};

export const postNewPaymentMethod = async (
  paymentMethodDTO: PaymentMethodDTO
) => {
  const response = await axios.post(
    `${API_URL}/payment-methods`,
    paymentMethodDTO
  );
  return response;
};
