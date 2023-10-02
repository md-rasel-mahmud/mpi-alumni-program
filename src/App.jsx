import { Outlet } from "react-router-dom";
import BlurGradientBg from "./utils/BlurGradientBg";
import { useSelector } from "react-redux";

export default function App() {
  const theme = useSelector(({ theme }) => theme.theme);
  return (
    <main
      data-theme={theme ? (theme === "light" ? "light" : "dark") : ""}
      className="relative isolate"
    >
      <BlurGradientBg />
      <Outlet />
    </main>
  );
}
