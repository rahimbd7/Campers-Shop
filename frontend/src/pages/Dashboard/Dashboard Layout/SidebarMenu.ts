import type { sidebarMenuItems } from "../../../interface/common";

export const sideBarMenus: sidebarMenuItems[] = [
    { name: "Dashboard", path: "/dashboard", role: ["admin", "user"] },
    { name: "Manage Users", path: "/dashboard/manage-users", role: ["admin"] },
    { name: "Manage Products", path: "/dashboard/manage-products", role: ["admin"] },
    { name: "Manage Categories", path: "/dashboard/manage-categories", role: ["admin"] },
    { name: "My Orders", path: "/dashboard/my-orders", role: ["user"] },
    { name: "My Cart", path: "/dashboard/my-cart", role: ["user"] },
    { name: "Update Profile", path: "/dashboard/update-profile", role: ["user"] },
]