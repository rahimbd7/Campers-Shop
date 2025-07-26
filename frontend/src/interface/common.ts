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