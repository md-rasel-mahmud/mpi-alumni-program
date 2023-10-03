import { Outlet } from "react-router-dom";
import BlurGradientBg from "./utils/BlurGradientBg";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useGetUserQuery } from "./redux/api/auth/authApi";
import { setUser } from "./redux/features/auth.service";

export default function App() {
  const theme = useSelector(({ theme }) => theme.theme);
  const { data } = useGetUserQuery(localStorage.getItem("userId"));

  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.success) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <main
      data-theme={theme ? (theme === "light" ? "light" : "dark") : ""}
      className=" isolate"
    >
      <BlurGradientBg />
      <Outlet />

      <Toaster />
    </main>
  );
}
