import React, { useRef, useEffect, useState, useContext } from "react";
import "../styles/login.css";
import * as TfiIcons from "react-icons/tfi";
import * as FiIcons from "react-icons/fi";
import * as TbIcons from "react-icons/tb";
import { DataContext } from "../dataProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [counter, setCounter] = useState(0);
  const [username, setUsername] = useState("");
  const ref = useRef();
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      const e = Number(ref.current.id);
      ref.current.id = e + 1;
      if (Number(ref.current.id) > 2) {
        ref.current.id = "0";
      }
      setCounter(Number(ref.current.id));
    }, 10000);
  }, []);

  const signIn = () => {
    const clone = { ...data };
    clone.currentUser = username;
    setData(clone);
    navigate("/home");
  };

  return (
    <div className="login">
      <div className="pictures" ref={ref} id={0}>
        {counter === 0 ? (
          <img src="../images/books.jpeg" className="login-img" />
        ) : (
          ""
        )}
        {counter === 1 ? (
          <img src="../images/old-mountain.jpg" className="login-img" />
        ) : (
          ""
        )}
        {counter === 2 ? (
          <img src="../images/spring-mountain.jpg" className="login-img" />
        ) : (
          ""
        )}
      </div>
      <div className="form">
        <h2 className="login-title">پنل مدیریت ناگا</h2>
        <h2 className="login-name">ورود</h2>
        <p className="text">
          جهت ورود لطفا نام کاربری و رمز عبور خود را وارد نمایید، در صورت بروز
          هرگونه مشکل مورد سریعا به بخش پشتیبانی اعلام نمایید تا در اسرع وقت
          برطرف گردد
        </p>
        <div className="login-inputs">
          <div className="login-left-input">
            <input placeholder="رمز ورود" type="password" className="box" />
            <div className="under-login-left-input">
              <button onClick={signIn}>ورود به سیستم</button>
              <p>رمز خود را فراموش کردم</p>
            </div>
          </div>
          <div className="login-right-input">
            <input
              className="box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری یا ایمیل یا شماره تلفن"
            />
            <div className="under-login-right-input">
              <p>مرا به خاطر بسپار</p>
              <input type="checkbox" className="checkbox" />
            </div>
          </div>
        </div>
        <footer className="login-footer">
          <p>تمامی حقوق این محصول متعلق به شرکت آویژه می باشد ©</p>
          <div className="icons">
            <TbIcons.TbBallVolleyball />
            <TfiIcons.TfiTwitter />
            <FiIcons.FiFacebook />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
