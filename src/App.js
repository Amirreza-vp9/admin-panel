import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./components/login";
import NewsList from "./components/newsList";
import AddNews from "./components/addNews";
import { DataContext } from "./dataProvider";
import ContactUs from "./components/contactUs";

export default function App() {
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("database"));
    setData(items);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Layout />}>
          <Route path="/home/newsList" element={<NewsList />} />
          <Route path="/home/addNews" element={<AddNews />} />
          <Route path="/home/contactUs" element={<ContactUs />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
