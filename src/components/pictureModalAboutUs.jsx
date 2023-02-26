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

const AboutUsPicture = ({
  openImageModal,
  setOpenImageModal,
  aboutData,
  index,
  setAboutData,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectImage, setSelectImage] = useState([]);
  const [chosenImage, setChosenImage] = useState("/images/empty.jpg");
  const [showSideChosenImage, setShowSideChosenImage] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    fetch("https://plansbox.ir/api/File/GetAllImage", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectImage(data.content);
      });
  }, []);

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseImageModal = () => {
    setChosenImage("/images/empty.jpg");
    setShowUploadImage([]);
    setShowSideChosenImage(false);
    setOpenImageModal(false);
  };

  const onSelectImage = (img) => {
    setChosenImage(img);
    setShowSideChosenImage(true);
  };

  const removeImageForever = () => {
    // if (chosenImage !== "/images/empty.jpg") {
    //   const removable = selectImage.indexOf(chosenImage);
    //   const clone = [...selectImage];
    //   clone.splice(removable, 1);
    //   setSelectImage(clone);
    //   setChosenImage("/images/empty.jpg");
    // }
  };

  const onChoosePicture = () => {
    const clone = [...aboutData];
    clone[index].coverMediaId = chosenImage.id;
    setAboutData(clone);
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

  const config = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const finalImageUploadSetup = (item, i) => {
    showUploadImage[i].isSelected = true;
    const clone = [...aboutData];
    clone[index].coverMediaId = item.src;
    setAboutData(clone);
    setOpenSnackBar(true);
    let formData = new FormData();
    formData.append("file", item.actualData);
    formData.append("MediaType", 0);
    console.log(formData);
    axios
      .post("https://plansbox.ir/api/File/Upload", formData, config)
      .then((res) => console.log(res))
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
                image={chosenImage}
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
                  حذف
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
                backgroundColor: "#f6f6f6",
                height: "17em",
                overflow: "auto",
              }}
            >
              {selectImage.map((img, i) => {
                return (
                  <img
                    key={i}
                    src={img}
                    height={105}
                    width={105}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectImage(img)}
                  />
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

export default AboutUsPicture;
