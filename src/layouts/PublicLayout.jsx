import { Outlet } from "react-router-dom";
import Navbar from "../utils/Navbar";
import { useEffect, useState } from "react";

const PublicLayout = () => {
  const [navBg, setNavBg] = useState("");

  const isScroll = window.screenY;

  useEffect(() => {
    if (isScroll > 0) {
      setNavBg("bg-black/10");
    }
  }, [isScroll]);
  return (
    <>
      <Navbar navBg={navBg} />
      <Outlet />
    </>
  );
};

export default PublicLayout;
