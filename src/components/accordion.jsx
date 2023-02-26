import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  color: "#242424",
  "&:hover": {
    backgroundColor: "#dedede",
  },
}));

export default function CustomizedAccordions({ index, text, icon, detail }) {
  const [expanded1, setExpanded1] = React.useState("");
  const [expanded2, setExpanded2] = React.useState("");
  const navigate = useNavigate();

  const accordion1 = (event, newExpanded) => {
    setExpanded1(newExpanded);
    setExpanded2(false);
  };

  const accordion2 = (event, newExpanded) => {
    setExpanded2(newExpanded);
    setExpanded1(false);
  };

  return (
    <>
      <Accordion expanded={expanded1} onChange={accordion1}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>اخبار</Typography>
        </AccordionSummary>
        <AccordionDetails onClick={() => navigate("/newsList")}>
          <Typography sx={{ fontWeight: "bold" }}>لیست اخبار</Typography>
        </AccordionDetails>
        <AccordionDetails onClick={() => navigate("/newsDetail/addNews")}>
          <Typography sx={{ fontWeight: "bold" }}>افزودن خبر</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded2} onChange={accordion2}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>پروژه ها</Typography>
        </AccordionSummary>
        <AccordionDetails onClick={() => navigate("/newsList")}>
          <Typography sx={{ fontWeight: "bold" }}>لیست پروژه ها</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
