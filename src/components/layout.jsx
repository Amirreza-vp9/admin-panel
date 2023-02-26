import React from "react";
import MiniDrawer from "./drawer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <MiniDrawer main={<Outlet />} />
    </>
  );
};

export default Layout;
