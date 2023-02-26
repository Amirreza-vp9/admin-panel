import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import "./index.css";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      light: "#757ce8",
      main: "#149487",
      dark: "#12715e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#727070",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: `iranSerif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <App />
      </div>
    </ThemeProvider>
  </CacheProvider>
);
