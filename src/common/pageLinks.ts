export const NAVBAR_PAGES_LINKS = {
  HOME: { name: "Home", path: "/" },
  MENU: { name: "Menu", path: "/menu" },
  RESERVATION: { name: "Reservation", path: "/reservation" },
  ABOUT: { name: "About", path: "/about" },
};

export const AUTH_PAGES_LINKS = {
  LOGIN: { name: "Login", path: "/login" },
  SIGNUP: { name: "Sign up", path: "/signup" },
};

export const PAGES_LINKS = {
  ...NAVBAR_PAGES_LINKS,
  ...AUTH_PAGES_LINKS,
  CART: { name: "Cart", path: "/cart" },
};
