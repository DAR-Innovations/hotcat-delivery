import axios from "axios";
import { FoodDTO } from "common/dto/FoodDTO";
import { FoodListDTO } from "common/dto/FoodListDTO";
import { IFood } from "common/types/food.type";
import { API_URL } from "proxy";

export const postNewFoodListToMenuById = async (
  foodList: FoodDTO[],
  menuId: number
) => {
  const postObject: FoodListDTO = { foodList };
  const response = await axios.post(
    `${API_URL}/foods/list/menu/${menuId}`,
    postObject
  );
  return response;
};
