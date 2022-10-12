import { IOrder } from "common/types/order.type";

export interface RestaurantReportDTO {
  customersAmount: number;
  transactionsAmount: number;
  monthlyEarning: number;
  lastOrders: IOrder[];
}
