import React, { useState, useContext } from "react";
import "../styles/navbar.css";
import * as GiIcons from "react-icons/gi";
import Menu from "./menu";
import { DataContext } from "../dataProvider";

const Navbar = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(DataContext);
  const { data } = useContext(DataContext);

  const openMenu = () => {
    setMenuIsOpen(true);
  };

  return (
    <header className="header">
      <div className="current-user">
        <div className="point-icon"></div>
        <div className="name">{data.currentUser}</div>
        <img
          className="img"
          src="../images/profile.jpg"
          height={40}
          width={40}
        />
      </div>
      <GiIcons.GiHamburgerMenu
        className={menuIsOpen ? "menu-icon-close" : "menu-icon"}
        onClick={openMenu}
      />
      <Menu />
    </header>
  );
};

export default Navbar;
