// menu.ts

import { logout } from "../../redux/features/auth/authSlice";

export type MenuItem = {
  name: string;
  path?: string;
  logout?: boolean;
};




const menu_item: MenuItem[] = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/products" },
];

const guestMenu: MenuItem[] = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const userMenu: MenuItem[] = [
  { name: "Profile", path: "/profile" },
  { name: "My Cart", path: "/my-cart" },
  { name: "Logout",logout:true },
];

const adminMenu: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Logout",logout:true },
];

export type Role = "user" | "admin" | null;

export default function getMenu(role: Role | null, isLogin: boolean) {
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
