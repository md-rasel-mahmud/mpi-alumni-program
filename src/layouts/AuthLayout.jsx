import { Outlet } from "react-router-dom";
import AuthNav from "../utils/AuthNav";

const AuthLayout = () => {
  return (
    <div className="hero min-h-screen relative items-end md:items-center">
      <AuthNav />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
