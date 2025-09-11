import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";


const DashboardHeader = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false);
 const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[#1e293b]  shadow-md">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold hidden md:block"><span className="text-white">Dashboard</span></h1>
      <NavLink to="/"><h1 className="text-2xl font-bold"><span className="text-[#605DFF]">Campers Shop</span></h1></NavLink>

      {/* Right Section */}
      <div className="relative">
        {/* Avatar Button */}
        <button
          className="btn btn-ghost btn-circle avatar"
          onClick={() => setOpen(!open)}
        >
          <div className="w-10 rounded-full">
            {user?.profile_img || user?.photoURL ? (
              <img src={user.profile_img || user?.photoURL} alt="Profile" className="w-full h-full rounded-full" 
              referrerPolicy="no-referrer"
              />
            ) : (
              <div className="bg-primary text-white flex justify-center items-center w-full h-full rounded-full font-bold">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
            )}
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-lg border p-2 z-50">
            <div className="flex items-center gap-3 px-2 py-2 border-b">
              {user?.profile_img  || user?.photoURL ? (
                <img
                  src={user.profile_img || user?.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="bg-primary text-white w-10 h-10 flex justify-center items-center rounded-full font-bold">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            <ul className="menu menu-compact mt-2">
              <li>
                <button className="flex items-center gap-2">
                  <User size={16} /> Profile
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-2 text-red-500"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
