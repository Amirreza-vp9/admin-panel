import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  indexDel,
  aboutData,
  setAboutData,
}) {
  const confirmButton = () => {
    const clone = [...aboutData];
    clone.splice(indexDel, 1);
    setAboutData(clone);
    setOpen(false);
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
    </div>
  );
}
