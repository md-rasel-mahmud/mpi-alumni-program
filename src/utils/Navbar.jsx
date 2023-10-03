import { useSelector } from "react-redux";
/* eslint-disable react/prop-types */

import {
  FaCog,
  FaEnvelope,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { navMenu } from "../helper/NavMenu";
import { setTheme } from "../redux/features/theme.service";
import { setUser } from "../redux/features/auth.service";

const Navbar = ({ navBg }) => {
  const {
    theme: { theme },
    authState: { user },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    if (theme === "dark" || theme === "") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };
  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("userId");
  };
  return (
    <div
      className={`navbar w-full container mx-auto backdrop-blur-md  sticky top-0 ${
        navBg && "bg-black/10 shadow"
      }`}
    >
      <div className="md:navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navMenu}
          </ul>
        </div>
        <a className="md:text-2xl ">MPI - Alumni Program</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenu}</ul>
      </div>
      <div className="ml-auto md:navbar-end gap-2">
        <div
          className="flex items-center justify-center rounded-full border-gray-600 hover:bg-black/10 
      text-secondary text-2xl font-semibold tracking-widest tooltip tooltip-left"
          data-tip={
            theme === "light" ? "Switch to Dark theme" : "Switch to Light theme"
          }
        >
          <label className="swap swap-rotate text-lg md:text-xl p-2">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleChangeTheme}
              className="swap-hidden"
              defaultChecked={theme === "light"}
            />
            <FaSun className="swap-on" />
            <FaMoon className="swap-off" />
          </label>
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              {user?.image ? (
                <div className="w-10 rounded-full">
                  <img
                    src={user?.image}
                    className="h-10 w-10 rounded-full"
                    alt={user?.name}
                  />
                </div>
              ) : (
                <FaUserAlt className="text-success text-xl" />
              )}
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-start">
                  <FaUser className="text-success" />
                  <span className="badge badge-success badge-outline capitalize">
                    {user?.name}
                  </span>
                </a>
              </li>

              <li>
                <span>
                  <FaEnvelope /> {user?.email}
                </span>
              </li>
              <li>
                <Link>
                  <FaCog /> Setting
                </Link>
              </li>
              <li>
                <div className="divider"></div>
              </li>
              <li className="btn btn-error px-0 btn-sm justify-start w-full hover:!bg-transparent">
                <button
                  onClick={handleLogout}
                  className="w-full hover:text-error"
                >
                  <FaSignOutAlt /> logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm hidden md:flex">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
