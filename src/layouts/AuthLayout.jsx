import { Outlet } from "react-router-dom";
import AuthNav from "../utils/AuthNav";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <AuthNav />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
