import { IFood } from "./food.type";
import { ITopping } from "./topping.type";

export interface CartItem {
  toppings: ITopping[];
  count: number;
  totalPrice: number;
  food: IFood;
}
