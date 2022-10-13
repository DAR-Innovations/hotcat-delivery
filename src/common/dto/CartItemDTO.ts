import { IFood } from "common/types/food.type";

export interface CartItemDTO {
  toppingsId: number[];
  count: number;
  totalPrice: number;
  food: IFood;
}
