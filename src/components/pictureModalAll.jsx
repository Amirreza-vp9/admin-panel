import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Modal,
  Tabs,
  Tab,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomizedSnackbars from "./snackBar";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: "1em",
  backgroundColor: "#f6f6f6",
};

const PictureModalAll = ({ openImageModal, setOpenImageModal, setPicture }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectImage, setSelectImage] = useState([]);
  const [chosenImage, setChosenImage] = useState({ url: "/images/empty.jpg" });
  const [showSideChosenImage, setShowSideChosenImage] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const config = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch("https://plansbox.ir/api/File/GetAllImage", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newArr = data.content.map((v) => ({ ...v, isSelected: false }));
        setSelectImage(newArr);
      });
  }, []);

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseImageModal = () => {
    setChosenImage({ url: "/images/empty.jpg" });
    setShowUploadImage([]);
    setShowSideChosenImage(false);
    setOpenImageModal(false);
  };

  const onSelectImage = (img, i) => {
    const clone = [...selectImage];
    clone[i].isSelected = !clone[i].isSelected;
    setSelectImage(clone);
    setChosenImage(img);
    setShowSideChosenImage(true);
  };

  const removeImageForever = () => {
    axios
      .post(
        `https://plansbox.ir/api/file/${chosenImage.id}/Delete/`,
        {},
        config
      )
      .then((res) => {
        console.log(res);
        setChosenImage({ url: "/images/empty.jpg" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChoosePicture = () => {
    const clone = selectImage.filter((item) => item.isSelected === true);
    setPicture(clone);
    setOpenImageModal(false);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowUploadImage([
        ...showUploadImage,
        {
          src: URL.createObjectURL(event.target.files[0]),
          isSelected: false,
          actualData: event.target.files[0],
        },
      ]);
    }
  };

  const configUpload = {
    "Access-Control-Allow-Origin": "*",
    "content-type": "multipart/form-data",
  };

  const finalImageUploadSetup = (item, i) => {
    showUploadImage[i].isSelected = true;
    setPicture(item.src);
    let formData = new FormData();
    formData.append("file", item.actualData);
    formData.append("MediaType", 0);
    axios
      .post("https://plansbox.ir/api/File/Upload", formData, configUpload)
      .then((res) => {
        console.log(res);
        setOpenSnackBar(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal open={openImageModal} onClose={handleCloseImageModal}>
        <Box sx={style}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTabValue}
              sx={{ direction: "ltr" }}
            >
              <Tab label="انتخاب تصویر" sx={{ fontWeight: "bold" }} />
              <Tab label="آپلود تصویر" sx={{ fontWeight: "bold" }} />
            </Tabs>
          </Box>
          <Box
            sx={{
              display: `${tabValue === 0 ? "flex" : "none"}`,
              gap: "1em",
              mt: 1,
            }}
          >
            <Card
              sx={{
                width: "50%",
                p: 1,
                display: `${showSideChosenImage ? "block" : "none"}`,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: "15em",
                  width: "100%",
                  borderRadius: ".5em",
                }}
                image={chosenImage.url}
              />
              <CardContent
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "1em",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ width: "50%" }}
                  onClick={removeImageForever}
                >
                  حذف برای همیشه
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: "50%" }}
                  onClick={onChoosePicture}
                >
                  انتخاب
                </Button>
              </CardContent>
            </Card>
            <Box
              sx={{
                width: `${showSideChosenImage ? "50%" : "100%"}`,
                direction: "ltr",
                display: "flex",
                flexWrap: "wrap",
                gap: ".25em",
                height: "24em",
                overflow: "auto",
                backgroundColor: "#f6f6f6",
              }}
            >
              {selectImage.map((img, i) => {
                return (
                  <Box key={i} sx={{ display: "flex" }}>
                    <CheckCircleIcon
                      color="primary"
                      sx={{
                        position: "absolute",
                        display: `${img.isSelected ? "block" : "none"}`,
                        ml: "-1em",
                      }}
                    />
                    <img
                      src={img.url}
                      height={105}
                      width={105}
                      style={{ cursor: "pointer" }}
                      onClick={() => onSelectImage(img, i)}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: `${tabValue === 1 ? "flex" : "none"}`, mt: 1 }}>
            <Button
              variant="contained"
              component="label"
              sx={{ width: "100%", height: "17em" }}
            >
              <Typography fontSize={18} fontWeight={"bold"}>
                آپلود
              </Typography>
              <input
                type="file"
                hidden
                onChange={onImageChange}
                className="filetype"
              />
            </Button>
            {showUploadImage ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "5em",
                  left: "1.5em",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ".5em",
                }}
              >
                {showUploadImage.map((item, i) => {
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <CheckCircleIcon
                        color="primary"
                        sx={{
                          position: "absolute",
                          display: `${item.isSelected ? "block" : "none"}`,
                          ml: "-1em",
                        }}
                      />
                      <img
                        src={item.src}
                        height={105}
                        width={105}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => finalImageUploadSetup(item, i)}
                      />
                    </Box>
                  );
                })}
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Modal>
      <CustomizedSnackbars
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        text={"عکس با موفقیت آپلود شد"}
      />
    </div>
  );
};

export default PictureModalAll;
