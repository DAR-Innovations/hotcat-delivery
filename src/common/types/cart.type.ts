import { IFood } from "./food.type";

export interface CartItem {
  count: number;
  totalPrice: number;
  menuFood: IFood;
}
