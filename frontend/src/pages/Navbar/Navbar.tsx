import { NavLink } from "react-router-dom";
import getMenu from "./menu";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const menu_items = getMenu("admin", true);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-5xl"
            >
              {menu_items.map((item) => (
                <li key={item.name}>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <a className="text-2xl font-bold">Campers Shop</a>
        </div>
        <div className="navbar-center hidden lg:flex font-bold ">
          <ul className="menu menu-horizontal px-1">
              {menu_items.map((item) => (
                <li className="hover:bg-[#00A4EF] text-md " key={item.name}>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </li>
              ))}
          </ul>
        </div>
        <div className="navbar-end">
          <p><FiShoppingCart /></p>
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
