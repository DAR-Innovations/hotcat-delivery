import { IFood } from "./food.type";

export interface IMenu {
    id: number;
    name: string;
    foodList: IFood[]
}