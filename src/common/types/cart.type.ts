import { IFood } from "./food.type";

export interface ICartItem {
  count: number;
  totalPrice: number;
  menuFood: IFood;
}
