import { ICartItem } from "common/types/cart.type";

export const fetchAllCartItems = () => {
  const itemsList: ICartItem[] =
    JSON.parse(localStorage.getItem("ordersList") || "[]") ||
    ([] as ICartItem[]);
  return itemsList;
};

export const fetchPostNewCartItem = (cartItem: ICartItem) => {
  let itemsList: ICartItem[] =
    JSON.parse(localStorage.getItem("ordersList") || "[]") ||
    ([] as ICartItem[]);

  const menuFoodId = cartItem.menuFood.id;
  const restaurantId = cartItem.menuFood.restaurantId;

  const cartItemIndex = itemsList?.findIndex(
    item => item.menuFood.id === menuFoodId
  );

  const indexOfSameRestaurantId = itemsList?.findIndex(
    item => item.menuFood.restaurantId === restaurantId
  );

  if (itemsList?.length > 0 && indexOfSameRestaurantId === -1) {
    return;
  }

  if (cartItemIndex === -1) {
    itemsList?.push(cartItem);
  } else {
    itemsList = itemsList.filter(item => item.menuFood.id !== menuFoodId);
  }

  localStorage.setItem("ordersList", JSON.stringify(itemsList));

  return itemsList;
};

export const fetchUpdateCartItemTotalPrice = (cartItem: ICartItem) => {
  let itemsList: ICartItem[] =
    JSON.parse(localStorage.getItem("ordersList") || "[]") ||
    ([] as ICartItem[]);

  const menuFoodId = cartItem.menuFood.id;

  const cartItemIndex = itemsList.findIndex(
    item => item.menuFood.id === menuFoodId
  );

  if (cartItemIndex !== -1) {
    itemsList[cartItemIndex].totalPrice =
      itemsList[cartItemIndex].count * itemsList[cartItemIndex].menuFood.price;
  }

  localStorage.setItem("ordersList", JSON.stringify(itemsList));

  return itemsList;
};

export const fetchRemoveCartItem = (cartItem: ICartItem) => {
  let itemsList: ICartItem[] = JSON.parse(
    localStorage.getItem("ordersList") || "[]"
  );

  const menuFoodId = cartItem.menuFood.id;
  itemsList = itemsList.filter(item => item.menuFood.id !== menuFoodId);

  console.log("filtered ", itemsList);

  localStorage.setItem("ordersList", JSON.stringify(itemsList));

  return itemsList;
};

export const fetchAddCountToCartItem = (cartItem: ICartItem) => {
  let itemsList: ICartItem[] =
    JSON.parse(localStorage.getItem("ordersList") || "[]") ||
    ([] as ICartItem[]);

  const menuFoodId = cartItem.menuFood.id;

  const cartItemIndex = itemsList.findIndex(
    item => item.menuFood.id === menuFoodId
  );

  if (cartItemIndex !== -1) itemsList[cartItemIndex].count += 1;

  localStorage.setItem("ordersList", JSON.stringify(itemsList));

  return itemsList;
};

export const fetchSubstractCountOfCartItem = (cartItem: ICartItem) => {
  let itemsList: ICartItem[] =
    JSON.parse(localStorage.getItem("ordersList") || "[]") ||
    ([] as ICartItem[]);

  const menuFoodId = cartItem.menuFood.id;

  const cartItemIndex = itemsList.findIndex(
    item => item.menuFood.id === menuFoodId
  );

  if (cartItemIndex !== -1) itemsList[cartItemIndex].count -= 1;

  localStorage.setItem("ordersList", JSON.stringify(itemsList));

  return itemsList;
};
