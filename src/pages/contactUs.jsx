import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, TextField, Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import DraftsIcon from "@mui/icons-material/Drafts";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f6f6f6",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#242424",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1em",
}));

const ContactUs = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Button
        sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        variant="contained"
      >
        اعمال تغییرات
      </Button>
      <Grid
        container
        spacing={{ xs: 2, md: 1 }}
        columns={{ xs: 2.5, sm: 7, md: 13 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Item>
            <CallIcon color="primary" sx={{ fontSize: "2.5rem" }} />
            <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              تلفن
            </Typography>
            <TextField
              type="number"
              variant={"filled"}
              sx={{ direction: "rtl", width: "90%" }}
            />
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item>
            <LocationOnIcon color="primary" sx={{ fontSize: "2.5rem" }} />
            <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              نشانی
            </Typography>
            <TextField
              variant={"filled"}
              multiline
              rows={4}
              sx={{ width: "90%" }}
            />
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item>
            <DraftsIcon color="primary" sx={{ fontSize: "2.5rem" }} />
            <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              ایمیل
            </Typography>
            <TextField
              variant={"filled"}
              sx={{ direction: "rtl", width: "90%" }}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
