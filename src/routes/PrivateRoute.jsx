/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../redux/api/auth/authApi";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector(({ authState }) => authState);
  const userId = localStorage.getItem("userId");
  const { isLoading } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user && !userId) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default PrivateRoute;
