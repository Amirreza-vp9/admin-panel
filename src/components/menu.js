import React, { useState, useContext } from "react";
import "../styles/menu.css";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import { DataContext } from "../dataProvider";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [titleIsOpen1, setTitleIsOpen1] = useState(false);
  const [titleIsOpen2, setTitleIsOpen2] = useState(false);
  const [titleIsOpen3, setTitleIsOpen3] = useState(false);
  const { menuIsOpen, setMenuIsOpen } = useContext(DataContext);
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  const titleSelect1 = () => {
    titleIsOpen1 ? setTitleIsOpen1(false) : setTitleIsOpen1(true);
    setTitleIsOpen2(false);
    setTitleIsOpen3(false);
  };
  const titleSelect2 = () => {
    titleIsOpen2 ? setTitleIsOpen2(false) : setTitleIsOpen2(true);
    setTitleIsOpen1(false);
    setTitleIsOpen3(false);
  };
  const titleSelect3 = () => {
    titleIsOpen3 ? setTitleIsOpen3(false) : setTitleIsOpen3(true);
    setTitleIsOpen1(false);
    setTitleIsOpen2(false);
  };

  return (
    <div className={menuIsOpen ? "menu" : "menu-hidden"}>
      <div className="menu-head">
        <AiIcons.AiOutlineClose className="menu-icon" onClick={closeMenu} />
      </div>
      <div className="menu-title" onClick={titleSelect1}>
        <div className={titleIsOpen1 ? "point-icon2" : "point-icon"}></div>
        <p>اخبار</p>
        <IoIcons.IoNewspaperSharp className="icon" />
      </div>
      <div
        onClick={() => navigate("/home/addNews")}
        className={titleIsOpen1 ? "menu-category" : "menu-category-hidden"}
      >
        <p>افزودن خبر</p>
      </div>
      <div
        onClick={() => navigate("/home/newsList")}
        className={titleIsOpen1 ? "menu-category" : "menu-category-hidden"}
      >
        <p>لیست اخبار</p>
      </div>
      <div className="menu-title" onClick={titleSelect2}>
        <div className={titleIsOpen2 ? "point-icon2" : "point-icon"}></div>
        <p>پروژه ها</p>
        <AiIcons.AiOutlineProject className="icon" />
      </div>
      <div className={titleIsOpen2 ? "menu-category" : "menu-category-hidden"}>
        <p>پروژه ها</p>
      </div>
      <div className="menu-title" onClick={titleSelect3}>
        <div className={titleIsOpen3 ? "point-icon2" : "point-icon"}></div>
        <p>تنظیمات</p>
        <IoIcons.IoNewspaperSharp className="icon" />
      </div>
      <div className={titleIsOpen3 ? "menu-category" : "menu-category-hidden"}>
        <p>درباره ما</p>
      </div>
      <div className={titleIsOpen3 ? "menu-category" : "menu-category-hidden"}>
        <p>ارتباط با ما</p>
      </div>
      <div
        onClick={() => navigate("/home/contactUs")}
        className={titleIsOpen3 ? "menu-category" : "menu-category-hidden"}
      >
        <p>تماس با ما</p>
      </div>
    </div>
  );
};

export default Menu;
