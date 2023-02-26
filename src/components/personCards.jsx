import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import AboutUsPicture from "./pictureModalAboutUs";
import TransitionsModal from "./aboutModal";

const PersonCards = ({ aboutData, setAboutData }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [indexDel, setIndexDel] = useState(0);

  const changeFullName = (e, i) => {
    const nameClone = [...aboutData];
    nameClone[i].fullName = e.target.value;
    setAboutData(nameClone);
  };

  const changeGroupName = (e, i) => {
    const groupClone = [...aboutData];
    groupClone[i].groupName = e.target.value;
    setAboutData(groupClone);
  };

  const changeJobTitle = (e, i) => {
    const jobTitleClone = [...aboutData];
    jobTitleClone[i].jobTitle = e.target.value;
    setAboutData(jobTitleClone);
  };

  const changePriority = (e, i) => {
    const priorityClone = [...aboutData];
    priorityClone[i].priority = Number(e.target.value);
    setAboutData(priorityClone);
  };

  // const changeCoverMedaiId = (e, i) => {
  //   const coverMedaiIdClone = [...aboutData];
  //   coverMedaiIdClone[i].coverMediaId = 0;
  //   setAboutData(coverMedaiIdClone);
  // };

  const deletePersonByi = (i) => {
    setOpenSnackBar(true);
    setIndexDel(i);
  };

  console.log(aboutData);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {aboutData.map((person, i) => {
          return (
            <Grid item key={i} sx={{ width: "20em" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: ".5em",
                  p: 1,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "17em",
                    width: "17em",
                    borderRadius: ".5em",
                  }}
                  image={
                    person.coverMediaUrl
                      ? person.coverMediaUrl
                      : "/images/emtyprofile.jpg"
                  }
                  // onChange={(e) => changeCoverMedaiId(e, i)}
                  onError={(e) => (e.target.src = "/images/emtyprofile.jpg")}
                />
                <AboutUsPicture
                  openImageModal={openImageModal}
                  setOpenImageModal={setOpenImageModal}
                  aboutData={aboutData}
                  index={index}
                  setAboutData={setAboutData}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.25em",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    onClick={() => {
                      setOpenImageModal(true);
                      setIndex(i);
                    }}
                  >
                    <Typography fontSize={18} fontWeight={"bold"}>
                      آپلود عکس
                    </Typography>
                  </Button>
                  <TextField
                    label="نام و نام خانوادگی"
                    defaultValue={person.fullName}
                    onChange={(e) => changeFullName(e, i)}
                  />
                  <TextField
                    label="عنوان گروه"
                    multiline
                    rows={4}
                    fullWidth
                    variant="filled"
                    defaultValue={person.groupName}
                    onChange={(e) => changeGroupName(e, i)}
                  />
                  <TextField
                    label="نقش"
                    multiline
                    rows={4}
                    fullWidth
                    variant="filled"
                    defaultValue={person.jobTitle}
                    onChange={(e) => changeJobTitle(e, i)}
                  />
                  <TextField
                    label="الویت"
                    sx={{ width: "10em" }}
                    type="number"
                    variant="filled"
                    defaultValue={Number(person.priority)}
                    onChange={(e) => changePriority(e, i)}
                  />
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    onClick={() => deletePersonByi(i)}
                  >
                    حذف عضو
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <TransitionsModal
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        index={indexDel}
        aboutData={aboutData}
        setAboutData={setAboutData}
        text={"آیا از حذف این عضو اطمینان دارید ؟"}
      />
    </>
  );
};

export default PersonCards;
