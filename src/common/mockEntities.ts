import { IDeliveryProvider } from "./types/deliveryProvider";
import { IFood } from "./types/food.type";
import { IRestaurant } from "./types/restaurant.type";

//Restaurants mock
export const koreanRestaurant: IRestaurant = {
  id: 0,
  name: "Korean Restaurant",
  hasDelivery: false,
  address: "Uly dala 6",
  openningHours: "9:00 - 23:00",
  shortFoodDescription: "ramen, kuksi",
  description: "Authentic korean traditional restaurant",
  image:
    "https://media-cdn.tripadvisor.com/media/photo-s/19/c3/62/df/variety-of-korean-appetizers.jpg",
  rating: "4.6",
  deliveryPrice: "530",
  deliveryTime: "40-50 min",
};

export const mexicanRestaurant: IRestaurant = {
  id: 1,
  name: "Mexican Restaurant ",
  hasDelivery: false,
  address: "Uly dala 6",
  openningHours: "12:00 - 22:00",
  shortFoodDescription: "burito, tako",
  description: "Authentic mexian traditional restaurant with buritos and tacos",
  image:
    "https://www.nhmagazine.com/content/uploads/2022/04/o/z/mexicanrestaurant-1024x683.jpg",
  rating: "4.9",
  deliveryPrice: "240",
  deliveryTime: "30-40 min",
};

export const listOfRestaurants: IRestaurant[] = [
  koreanRestaurant,
  mexicanRestaurant,
  koreanRestaurant,
  mexicanRestaurant,
  koreanRestaurant,
  mexicanRestaurant,
  koreanRestaurant,
  mexicanRestaurant,
  koreanRestaurant,
  mexicanRestaurant,
  koreanRestaurant,
  mexicanRestaurant,
];

//Food menu mock
export const food1: IFood = {
  restaurantId: 2,
  id: 0,
  name: "Chicke ramen",
  description:
    "Korean tradional food Ramen with chicken Korean tradional food Ramen with chicken n with chicken Korean tradional food Ramen with chicken",
  price: 2300,
  image:
    "https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg",
};

export const food2: IFood = {
  restaurantId: 1,
  id: 1,
  name: "Pizza pepperoni",
  description:
    "Italian tradional food pizza with peperoni Italian tradional food pizza with peperoni Italian tradional food pizza with peperoni",
  price: 2800,
  image:
    "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/hjznkvic/b07fa72c-d2c1-4bf8-a97b-f4fd02aa03c6.jpg",
};

export const food3: IFood = {
  restaurantId: 1,
  id: 2,
  name: "Pasta carbonara",
  description:
    "Italian tradional food pasta with peperoni Italian tradional food pizza with peperoni Italian tradional food pizza with peperoni",
  price: 2100,
  image:
    "https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Pasta-alla-vodka-f1d2e1c.jpg",
};

export const listOfFood: IFood[] = [food1, food2, food3];

//Delivery providers
const yandexDelivery: IDeliveryProvider = {
  id: 1,
  name: "Yandex Delivery",
  description: "Yandex delivery",
  deliveryPrice: 240,
};

const woltDelivery: IDeliveryProvider = {
  id: 2,
  name: "Wolt Delivery",
  description: "Wolt delivery",
  deliveryPrice: 400,
};

export const deliveryProvidersArr: IDeliveryProvider[] = [
  woltDelivery,
  yandexDelivery,
];
