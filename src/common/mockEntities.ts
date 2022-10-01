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
const food: IFood = {
  id: 0,
  name: "Chicke ramen",
  description: "Korean tradional food Ramen with chicken Korean tradional food Ramen with chicken n with chicken Korean tradional food Ramen with chicken",
  price: 2300,
  image:
    "https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg",
};

export const listOfFood: IFood[] = [
  food,
  food,
  food,
  food,
  food,
  food,
  food,
  food,
];
