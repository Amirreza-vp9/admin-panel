import React, { useState, useEffect, useRef } from "react";
import TextEditor from "../components/textEditor";
import PersonCards from "../components/personCards";
import { Typography, Box, Button } from "@mui/material";
import CustomizedSnackbars from "../components/snackBar";
import axios from "axios";
import CustomizedAlert from "../components/alert";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState([]);
  const [addCondition, setAddCondition] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [fetchCondition, setFetchCondition] = useState(false);
  const [editId, setEditId] = useState(0);
  const [title, setTitle] = useState("");
  let editorRef = useRef(null);

  useEffect(() => {
    fetch("https://plansbox.ir/api/aboutus/GetAllAdmin", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.content.length === 0) {
          setFetchCondition(true);
          setAboutData([]);
        } else {
          setTitle(data.content[data.content.length - 1].title);
          setAboutData(data.content[data.content.length - 1].persons);
          console.log(data.content[data.content.length - 1].persons);
          setEditId(data.content[data.content.length - 1].id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const addPerson = () => {
    const clone = [...aboutData];
    clone.push({
      fullName: "",
      groupName: "",
      jobTitle: "",
      priority: 0,
      coverMediaUrl: "/images/emtyprofile.jpg",
      coverMediaId: 0,
    });
    setAboutData(clone);
    setAddCondition(true);
  };

  const addPersonConfirm = () => {
    setAddCondition(false);
  };

  const addPersonDecline = () => {
    const clone = [...aboutData];
    clone.pop();
    setAboutData(clone);
    setAddCondition(false);
  };

  const config = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const finalSetup = () => {
    const clone = [...aboutData];
    clone.map((item) => (item.coverMediaId = 0));
    setAboutData(clone);
    const badSituation = aboutData.filter((item) => item === "");
    console.log(badSituation.length);
    if (badSituation.length !== 0) {
      setOpenAlert(true);
    } else {
      if (fetchCondition) {
        axios
          .post(
            "https://plansbox.ir/api/aboutus/Add",
            {
              title: editorRef.current.getContent(),
              persons: aboutData,
            },
            config
          )
          .then((res) => {
            console.log(res);
            setEditId(res.data.content.id);
            setOpenSnackBar(true);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(
            "https://plansbox.ir/api/aboutus/edit",
            {
              id: editId,
              title: editorRef.current.getContent(),
              persons: aboutData,
            },
            config
          )
          .then((res) => {
            console.log(res);
            setEditId(res.data.content.id);
            setOpenSnackBar(true);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <Box sx={{ width: { sm: "100%", xs: "17em" } }}>
      {addCondition ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
            mr: "auto",
          }}
        >
          <Button
            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
            variant={"contained"}
            onClick={addPersonConfirm}
          >
            ثبت عضویت
          </Button>
          <Button
            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
            variant={"contained"}
            color={"error"}
            onClick={addPersonDecline}
          >
            لغو عضویت
          </Button>
        </Box>
      ) : (
        <Box sx={{ mr: "auto", display: "flex", gap: "1em" }}>
          <Button
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
            variant={"contained"}
            onClick={finalSetup}
          >
            اعمال تغییرات
          </Button>
          <Button
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
            variant={"contained"}
            onClick={addPerson}
          >
            افزودن عضو جدید
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2em",
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <Typography fontSize={"2rem"} fontWeight={"bold"}>
            توضیحات
          </Typography>
          <TextEditor editorRef={editorRef} title={title} />
        </Box>
        <Typography fontSize={"2rem"} fontWeight={"bold"}>
          اعضای شرکت
        </Typography>
        <PersonCards aboutData={aboutData} setAboutData={setAboutData} />
      </Box>
      <CustomizedSnackbars
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        text={"تغییرات با موفقیت اعمال شد"}
      />
      <CustomizedAlert
        open={openAlert}
        setOpen={setOpenAlert}
        text={"لطفا نام و نام خانوادگی را وارد کنید"}
      />
    </Box>
  );
};

export default AboutUs;
