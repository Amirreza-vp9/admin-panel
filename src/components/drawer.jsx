import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "transparent",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMoreIcon sx={{ fontSize: "1.25rem", color: "whitesmoke" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  color: "whitesmoke",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0.5),
  },
  "&:hover": {
    backgroundColor: "#646464",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f6f6f6",
  cursor: "pointer",
  color: "#242424",
  "&:hover": {
    backgroundColor: "#dedede",
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#545454",
  color: "whitesmoke",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#545454",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ main }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState("");
  const [expanded2, setExpanded2] = React.useState("");
  const [expanded3, setExpanded3] = React.useState("");
  const [expanded4, setExpanded4] = React.useState("");
  const navigate = useNavigate();

  const accordion1 = (event, newExpanded) => {
    setExpanded1(newExpanded);
    setExpanded2(false);
    setExpanded3(false);
    setExpanded4(false);
  };

  const accordion2 = (event, newExpanded) => {
    setExpanded2(newExpanded);
    setExpanded1(false);
    setExpanded3(false);
    setExpanded4(false);
  };

  const accordion3 = (event, newExpanded) => {
    setExpanded3(newExpanded);
    setExpanded1(false);
    setExpanded2(false);
    setExpanded4(false);
  };

  const accordion4 = (event, newExpanded) => {
    setExpanded4(newExpanded);
    setExpanded1(false);
    setExpanded2(false);
    setExpanded3(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setExpanded1(false);
    setExpanded2(false);
    setExpanded3(false);
    setExpanded4(false);
  };

  const newsIcon = () => {
    setOpen(true);
    setExpanded1(true);
  };

  const projectIcon = () => {
    setOpen(true);
    setExpanded2(true);
  };

  const cityIcon = () => {
    setOpen(true);
    setExpanded3(true);
  };

  const peopleIcon = () => {
    setOpen(true);
    setExpanded4(true);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="innerhit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: "whitesmoke" }} />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              پنل مدیریت سایت
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "whitesmoke" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "whitesmoke" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "whitesmoke", height: "1.25px" }} />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              {open ? (
                <Accordion expanded={expanded1} onChange={accordion1}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>اخبار</Typography>
                  </AccordionSummary>
                  <AccordionDetails onClick={() => navigate("/newsList")}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      لیست اخبار
                    </Typography>
                  </AccordionDetails>
                  <AccordionDetails
                    onClick={() => {
                      if (window.location.href.includes("newsListDetail")) {
                        navigate("/newsListDetail/addNews");
                        window.location.reload();
                      } else {
                        navigate("/newsListDetail/addNews");
                      }
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      افزودن خبر
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={newsIcon}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "whitesmoke",
                    }}
                  >
                    <FeedOutlinedIcon />
                  </ListItemIcon>
                </ListItemButton>
              )}
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              {open ? (
                <Accordion expanded={expanded2} onChange={accordion2}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>پروژه ها</Typography>
                  </AccordionSummary>
                  <AccordionDetails onClick={() => navigate("/projectsList")}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      لیست پروژه ها
                    </Typography>
                  </AccordionDetails>
                  <AccordionDetails
                    onClick={() => {
                      if (window.location.href.includes("projectListDetail")) {
                        navigate("/projectListDetail/addProject");
                        window.location.reload();
                      } else {
                        navigate("/projectListDetail/addProject");
                      }
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      افزودن پروژه
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={projectIcon}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "whitesmoke",
                    }}
                  >
                    <AccountTreeOutlinedIcon />
                  </ListItemIcon>
                </ListItemButton>
              )}
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              {open ? (
                <Accordion expanded={expanded3} onChange={accordion3}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>شهر ها</Typography>
                  </AccordionSummary>
                  <AccordionDetails onClick={() => navigate("/cityList")}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      لیست شهر ها
                    </Typography>
                  </AccordionDetails>
                  <AccordionDetails
                    onClick={() => navigate("/cityListDetail/addCity")}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      افزودن شهر
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={cityIcon}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "whitesmoke",
                    }}
                  >
                    <LocationCityOutlinedIcon />
                  </ListItemIcon>
                </ListItemButton>
              )}
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              {open ? (
                <Accordion expanded={expanded4} onChange={accordion4}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>مناقصات</Typography>
                  </AccordionSummary>
                  <AccordionDetails onClick={() => navigate("/cooperateList")}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      لیست مناقصات
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={peopleIcon}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "whitesmoke",
                    }}
                  >
                    <PeopleOutlineOutlinedIcon />
                  </ListItemIcon>
                </ListItemButton>
              )}
            </ListItem>
          </List>
          <Divider sx={{ backgroundColor: "whitesmoke", height: "2px" }} />
          <List>
            {[
              {
                text: "درباره ی ما",
                icon: <InfoOutlinedIcon />,
                route: "aboutUs",
              },
              {
                text: "ارتباط با ما",
                icon: <LocalPhoneOutlinedIcon />,
                route: "contactUs",
              },
              {
                text: "خانه",
                icon: <HomeOutlinedIcon />,
                route: "/",
              },
              {
                text: "خروج",
                icon: <LoginOutlinedIcon />,
                route: "/",
              },
            ].map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate(item.route);
                    setExpanded1(false);
                    setExpanded2(false);
                    setExpanded3(false);
                    setExpanded4(false);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "whitesmoke",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DrawerHeader />
          {main}
        </Box>
      </Box>
    </>
  );
}
