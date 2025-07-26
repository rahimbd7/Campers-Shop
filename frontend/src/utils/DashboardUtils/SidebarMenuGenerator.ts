import type { Role, sidebarMenuItems } from "../../interface/common";


export const getSidebarMenu = (sidebarMenu: sidebarMenuItems[],role: Role  ): sidebarMenuItems[] => {
  return sidebarMenu.filter(item => item.role.includes(role) );
};