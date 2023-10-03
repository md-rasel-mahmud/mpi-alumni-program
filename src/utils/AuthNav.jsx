import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/features/theme.service";

const AuthNav = () => {
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
    <div className="p-3 w-full backdrop-blur-md flex justify-between items-center sticky top-0 z-50 ">
      <Link
        to="/"
        className=" border p-2 rounded-full backdrop-blur-md border-gray-600 hover:bg-black/10 
        text-secondary text-2xl font-semibold tracking-widest tooltip tooltip-right"
        data-tip="Back To Home"
      >
        <FaArrowLeft />
      </Link>
      <button
        className=" border flex items-center backdrop-blur-md justify-center rounded-full border-gray-600 hover:bg-black/10 
        text-secondary text-2xl font-semibold tracking-widest tooltip tooltip-left"
        data-tip={
          theme === "light" ? "Switch to Dark theme" : "Switch to Light theme"
        }
      >
        <label className="swap swap-rotate p-2">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleChangeTheme}
            defaultChecked={theme === "light"}
          />

          <FaSun className="swap-on" />
          <FaMoon className="swap-off" />
        </label>
      </button>
    </div>
  );
};

export default AuthNav;
