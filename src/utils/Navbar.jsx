import { useSelector } from "react-redux";
/* eslint-disable react/prop-types */

import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/services/themeService/theme.service";
import { navMenu } from "../helper/NavMenu";

const Navbar = ({ navBg }) => {
  const theme = useSelector(({ theme }) => theme.theme);

  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    if (theme === "dark" || theme === "") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };
  return (
    <div
      className={`navbar  w-full  backdrop-blur-md  sticky top-0 ${
        navBg && "bg-black/10 shadow"
      }`}
    >
      <div className="navbar-start">
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
        <a className="btn btn-ghost normal-case text-xl">
          MPI - Alumni Program
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenu}</ul>
      </div>
      <div className="navbar-end gap-2">
        <div
          className="flex items-center justify-center rounded-full border-gray-600 hover:bg-black/10 
        text-secondary text-2xl font-semibold tracking-widest tooltip tooltip-right"
        >
          <label className="swap swap-rotate p-2">
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
        <Link to="/login" className="btn btn-primary btn-sm hidden md:flex">
          login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
