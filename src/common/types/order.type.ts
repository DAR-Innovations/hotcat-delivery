import { CartItem } from "./cart.type";
import { IDeliveryProvider } from "./deliveryProvider";
import { IRestaurant } from "./restaurant.type";
import { IUser } from "./user.type";

export interface IOrder {
  id: number;
  deliveryProvider: IDeliveryProvider;
  restaurant: IRestaurant;
  orderItemList: CartItem[];
  appUser: IUser;
  orderDate: string;
  totalPrice: number;
  isCooked: boolean;
  isDelivered: boolean;
}
