import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CustomizedSnackbars from "../components/snackBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomizedAlert from "../components/alert";
import Loader from "../components/loader";
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

const CityListDetail = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState();
  const [active, setActive] = useState(false);
  const [validation, setValidation] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData] = useState("");
  const [isLosding, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const check = (e, newValue) => {
    setActive(newValue);
  };

  const finalClick = () => {
    if (title === "") {
      setValidation(true);
    } else {
      setOpen(true);
    }
  };

  const config = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const confirmButton = () => {
    if (params.id === "addCity") {
      axios
        .post(
          "https://plansbox.ir/api/City/Add",
          {
            title: title,
            isFeatured: active,
            priority: Number(priority),
          },
          config
        )
        .then((res) => {
          console.log(res);
          navigate(`/cityListDetail/${res.data.content.id}`);
          setOpenSnackBar(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setOpen(false);
    } else {
      axios
        .post(
          "https://plansbox.ir/api/City/edit",
          {
            id: Number(params.id),
            title: title,
            isFeatured: active,
            priority: Number(priority),
          },
          config
        )
        .then((res) => {
          console.log(res);
          setOpenSnackBar(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (params.id === "addCity") {
      setDefaultData({
        title: "",
        priority: 0,
        isFeatured: false,
      });
      setTitle("");
      setPriority(0);
      setActive(false);
      setIsLoading(true);
    } else {
      fetch(`https://plansbox.ir/api/City/GetById/?id=${params.id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDefaultData(data.content);
          setTitle(data.content.title);
          setPriority(data.content.priority);
          setActive(data.content.isFeatured);
          setIsLoading(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (isLosding === false) return <Loader />;

  return (
    <>
      {defaultData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "2em",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "10em", fontSize: "1.25rem", fontWeight: "bold" }}
            onClick={finalClick}
          >
            ثبت
          </Button>
          <TextField
            error={validation}
            label="نام شهر"
            sx={{ width: "50%" }}
            variant="filled"
            defaultValue={defaultData.title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValidation(false);
            }}
          />
          <Box sx={{ display: "flex", gap: "3em" }}>
            <TextField
              label="الویت"
              sx={{ width: "10em" }}
              type="number"
              defaultValue={defaultData.priority}
              variant="filled"
              onChange={(e) => setPriority(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={defaultData.isFeatured}
                  onChange={check}
                />
              }
              label="فعال"
            />
          </Box>
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
                    آیا از افزودن شهر اطمینان داری ؟
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
              text={"شهر با موفقیت ثبت شد"}
            />
          </div>
        </Box>
      )}
      <CustomizedAlert
        open={validation}
        text={"لطفا نام شهر را وارد کنید"}
        setOpen={setValidation}
      />
    </>
  );
};

export default CityListDetail;
