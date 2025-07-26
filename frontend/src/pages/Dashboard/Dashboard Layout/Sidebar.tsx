import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { getSidebarMenu } from "../../../utils/DashboardUtils/SidebarMenuGenerator";
import { sideBarMenus } from "./SidebarMenu";
import type { Role } from "../../../interface/common";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const sideBarMenu = getSidebarMenu(sideBarMenus, user?.role as Role);

  return (
    <div>
      <aside className="w-80 bg-red-300 ">
        <ul className="menu bg-[#142341]  w-full">
          {sideBarMenu.map((item) => (
            <li key={item?.name}>
             <NavLink to={item?.path}>{item?.name}</NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
