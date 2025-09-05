import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { getSidebarMenu } from "../../../utils/DashboardUtils/SidebarMenuGenerator";
import { sideBarMenus } from "./SidebarMenu";
import type { Role } from "../../../interface/common";
import { NavLink } from "react-router-dom";
import { TentTree } from "lucide-react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSelector";

const Sidebar = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const user = currentUser?.user;
  const sideBarMenu = getSidebarMenu(sideBarMenus, user?.role as Role);

  return (
    <div>
      <aside className="w-full   md:h-screen">
        <ul className="menu   w-full hidden md:block">
          {sideBarMenu.map((item) => (
            <li className="text-white font-bold " key={item?.name}>
              <NavLink to={item?.path}  className={({ isActive }) =>
                  `px-3  rounded-md transition-colors duration-200 my-1
                  ${isActive ? "bg-[#2563eb] font-semibold text-white" : "hover:bg-[#1e293b] "}`
                }>{item?.name}</NavLink>
            </li>
          ))}
        </ul>
        <div className="dropdown dropdown-start block md:hidden ">
          <div tabIndex={0} role="button" className="w-full p-2 flex gap-2 items-center">
           <TentTree className="w-10 h-10 text-[#605DFF] " /> <p className="text-xl ">Menu</p> 
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {sideBarMenu.map((item) => (
            <li key={item?.name}>
              <NavLink to={item?.path}>{item?.name}</NavLink>
            </li>
          ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
