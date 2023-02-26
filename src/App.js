import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contactUs";
import CooperateDetail from "./pages/cooperateDetail";
import CooperateList from "./pages/cooperateList";
import Login from "./pages/login";
import NewsList from "./pages/newsList";
import NewsListDetail from "./pages/newsListDetail";
import ProjectDetail from "./pages/projectDetail";
import ProjectsList from "./pages/projectsList";
import CityList from "./pages/cityList";
import CityListDetail from "./pages/cityListDetail";
import Home from "./pages/home";
import { Box, Typography } from "@mui/material";

export default function App() {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    const condition = localStorage.getItem("adminAuthCheck");
    if (condition === true) {
      setAuth(true);
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={auth ? <Layout /> : <Login />}>
          <Route path="/" element={<Home />} />
          <Route path="/newsList" element={<NewsList />} />
          <Route path="/newsListDetail/:id" element={<NewsListDetail />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/projectsList" element={<ProjectsList />} />
          <Route path="/projectListDetail/:id" element={<ProjectDetail />} />
          <Route path="/cooperateList" element={<CooperateList />} />
          <Route path="/cooperateDetail/:id" element={<CooperateDetail />} />
          <Route path="/cityList" element={<CityList />} />
          <Route path="/cityListDetail/:id" element={<CityListDetail />} />
        </Route>

        <Route
          path="*"
          element={
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                color={"primary"}
                sx={{ fontSize: "10rem", fontWeight: "bold" }}
              >
                404
              </Typography>
              <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                صفحه مورد نظر یافت نشد
              </Typography>
            </Box>
          }
        />
      </Routes>
    </HashRouter>
  );
}
