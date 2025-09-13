import { NavLink, useNavigate } from "react-router-dom";
import getMenu from "./menu";
import type { MenuItem, Role } from "../../interface/common";
import { FiShoppingCart } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { TentTree } from "lucide-react";
import { selectCurrentUser } from "../../redux/features/auth/authSelector";



const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const numberOfCartItems = useAppSelector(
    (state) => state.cart.cartItems.length
  );
const currentUser = useAppSelector(selectCurrentUser);

  const user = currentUser?.user;
  const role = user?.role || "user"; // default role
  const isLogin = !!user;

  const menu_items = getMenu(role as Role, isLogin);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {menu_items.map((item: MenuItem) => (
                <li key={item.name}>
                  {item.logout ? (
                    <button
                      onClick={handleLogout}
                      className=""
                    >
                      {item.name}
                    </button>
                  ) : (
                    <NavLink to={item.path ?? ""}>{item.name}</NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <NavLink to="/" className="md:text-xl font-bold flex items-center gap-2">
          <TentTree className="w-10 h-10 text-[#605DFF] " />
           <p className="hidden lg:block">Campers Shop</p>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex font-bold">
          <ul className="menu menu-horizontal px-1">
            {menu_items.map((item: MenuItem) => (
              <li key={item.name}>
                {item.logout ? (
                  <button
                    onClick={handleLogout}
                    className=""
                  >
                    {item.name}
                  </button>
                ) : (
                  <NavLink
                    to={item.path ?? ""}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-semibold" : ""
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Cart */}
        <div className="navbar-end">
          <div
            className="indicator cursor-pointer mr-4"
            onClick={() => navigate("/view-all-cart-items")}
          >
            <FiShoppingCart size={25} />
            {numberOfCartItems > 0 && (
              <span className="badge badge-md indicator-item bg-primary text-white">
                {numberOfCartItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
