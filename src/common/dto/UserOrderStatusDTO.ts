import { IOrder } from "common/types/order.type";

export interface UserOrderStatusDTO {
  order: IOrder;
  active: boolean;
}
