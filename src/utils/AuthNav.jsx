import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/services/themeService/theme.service";

const AuthNav = () => {
  const theme = useSelector(({ theme }) => theme.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = (e) => {
    if (theme === "dark" || theme === "") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
    console.log(e.target.checked);
  };
  // console.log(theme);
  return (
    <>
      <Link
        to="/"
        className="absolute top-5 left-5 border p-2 rounded-full border-gray-600 hover:bg-black/10 
        text-secondary text-2xl font-semibold tracking-widest tooltip tooltip-right"
        data-tip="Back To Home"
      >
        <FaArrowLeft />
      </Link>
      <button
        className="absolute top-5 right-5 border flex items-center  justify-center rounded-full border-gray-600 hover:bg-black/10 
        text-secondary text-2xl font-semibold tracking-widest tooltip tooltip-right"
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
    </>
  );
};

export default AuthNav;
