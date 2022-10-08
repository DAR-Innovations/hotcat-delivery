import { DeliveryDetailsDTO } from "./DeliveryDetailsDTO";
import { PaymentDTO } from "./PaymentDTO";

export interface OrderDetailsDTO {
  payment: PaymentDTO;
  deliveryDetails: DeliveryDetailsDTO;
}
