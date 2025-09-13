/* eslint-disable @typescript-eslint/no-explicit-any */
export type Role = "user" | "admin" | null;


//Navbar Menu Type
export type MenuItem = {
    name: string;
    path?: string;
    role?: Role[];
    logout?: boolean;
};

//side bar Menu type
export type sidebarMenuItems={
    name: string;
    path: string;
    role: Role[]
}


export type FieldType = "text" | "number" | "email" | "password" | "file" | "checkbox" | "select";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  defaultValue?: any;
  placeholder?: string;
  options?: string[];
  multiple?: boolean;
  labelHidden?: boolean;
}
