import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";

function Layout() {
  const location = useLocation();
  const hidebar =
    location.pathname == "/login" || location.pathname == "/signup";
  return <div>{!hidebar && <Navbar />}</div>;
}

export default Layout;
