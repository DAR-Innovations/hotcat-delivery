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

export const PROFILE_PAGES_LINKS = {
  ORDERS: { name: "Orders", path: "/profile/orders" },
};

export const ADMIN_PAGES_LINKS = {
  DASHBOARD: { name: "Dashboard", path: "/admin" },
  ORDERS: { name: "Orders", path: "/admin/orders" },
  ADD: { name: "Add", path: "/admin/create" },
};

export const PAGES_LINKS = {
  ...NAVBAR_PAGES_LINKS,
  ...AUTH_PAGES_LINKS,
  ...PROFILE_PAGES_LINKS,
  CART: { name: "Cart", path: "/cart" },
};
