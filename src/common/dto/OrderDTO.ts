import { OrderItemDTO } from "./OrderItemDTO";

export interface OrderDTO {
  restaurantId: number;
  deliveryProviderId: number;
  userId: number;
  orderItemsList: OrderItemDTO[];
}
