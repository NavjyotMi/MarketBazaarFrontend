import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
function VendorHome() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default VendorHome;
