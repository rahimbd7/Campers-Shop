// menu.ts

const menu_item = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/products" },
];

const guestMenu = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const userMenu = [
  { name: "Profile", path: "/profile" },
  { name: "My Cart", path: "/my-cart" },
  { name: "Logout", path: "/logout" },
];

const adminMenu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "/logout" },
];

type Role = "user" | "admin" | null;

export default function getMenu(role: Role, isLogin: boolean) {
  if (!isLogin) {
    return [...menu_item, ...guestMenu];
  }

  if (role === "admin") {
    return [...menu_item, ...adminMenu];
  }

  if (role === "user") {
    return [...menu_item, ...userMenu];
  }

  return menu_item;
}
