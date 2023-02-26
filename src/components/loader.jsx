import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        width: "100%",
        heigth: "100%",
        textAlign: "center",
      }}
    >
      <LinearProgress />
      <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold", mt: 1 }}>
        در حال بارگذاری اطلاعات
      </Typography>
    </Box>
  );
}
