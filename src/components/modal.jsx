import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomizedSnackbars from "./snackBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#545454",
  color: "whitesmoke",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function TransitionsModal({
  open,
  setOpen,
  text,
  snackText,
  title,
  description,
  editorBottomRef,
  editorTopRef,
  active,
  activeInSideBar,
  priority,
  priorityInSideBar,
  params,
  coverMediaId,
  medias,
  dateTime,
}) {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const navigate = useNavigate();

  const config = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const confirmButton = () => {
    console.log(dateTime);
    var dt = new Date(dateTime);
    dt.toISOString();
    let clone = [0];
    if (medias[0] !== 0) {
      console.log("object");
      clone = medias.map((item) => item.id);
    }
    console.log(clone);
    if (params.id === "addNews") {
      axios
        .post(
          "https://plansbox.ir/api/NewsCast/Add",
          {
            title: title,
            Description: description,
            upperContent: editorTopRef.current.getContent(),
            downContent: editorBottomRef.current.getContent(),
            isFeatured: active,
            isFeaturedPriority: activeInSideBar,
            featuredPriority: Number(priorityInSideBar),
            priority: Number(priority),
            coverMediaId: coverMediaId,
            medias: clone,
            creatDate: dt,
          },
          config
        )
        .then((res) => {
          console.log(res);
          setOpen(false);
          setOpenSnackBar(true);
          setTimeout(() => {
            navigate(`/newsListDetail/${res.data.content.id}`);
          }, 1600);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          "https://plansbox.ir/api/NewsCast/Edit",
          {
            id: Number(params.id),
            title: title,
            Description: description,
            upperContent: editorTopRef.current.getContent(),
            downContent: editorBottomRef.current.getContent(),
            isFeatured: active,
            isFeaturedPriority: activeInSideBar,
            featuredPriority: Number(priorityInSideBar),
            priority: Number(priority),
            coverMediaId: coverMediaId,
            medias: clone,
            creatDate: dt,
          },
          config
        )
        .then((res) => {
          console.log(res);
          setOpen(false);
          setOpenSnackBar(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              dir="rtl"
              sx={{ textAlign: "center" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              {text}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1em",
                mt: 2,
                direction: "ltr",
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "50%" }}
                onClick={confirmButton}
              >
                بله
              </Button>
              <Button
                variant="contained"
                sx={{ width: "50%" }}
                onClick={() => setOpen(false)}
              >
                خیر
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CustomizedSnackbars
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        text={snackText}
      />
    </div>
  );
}
