import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import TransitionsModal from "../components/modal";
import CustomizedAlert from "../components/alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import PictureModal from "../components/pictureModal";
import PictureModalAll from "../components/pictureModalAll";
import DatePicker from "../components/datePicker";

const NewsListDetail = () => {
  let editorTopRef = React.useRef(null);
  let editorBottomRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [openAll, setOpenAll] = React.useState(false);
  const [valueTop, setValueTop] = React.useState(0);
  const [showImg, setShowImg] = React.useState("/images/empty.jpg");
  const [showImgs, setShowImgs] = React.useState(["/images/empty.jpg"]);
  const [openFinalModal, setOpenFinalModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [Alert, setAlert] = React.useState(false);
  const [priority, setPriority] = React.useState();
  const [priorityInSideBar, setPriorityInSideBar] = React.useState();
  const [activeInSideBar, setActiveInSideBar] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [defaultData, setDefaultData] = React.useState("");
  const [isLosding, setIsLoading] = React.useState(false);
  const [coverMediaId, setCoverMediaId] = React.useState(0);
  const [coverMediaUrl, setCoverMediaUrl] = React.useState(null);
  const [dateTime, setDateTime] = React.useState("");
  const [d, setD] = React.useState("");
  const params = useParams();
  const [windowDimenion, detectHW] = React.useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  React.useEffect(() => {
    if (params.id === "addNews") {
      setDefaultData({
        title: "",
        Description: "",
        upperContent: "",
        downContent: "",
        isFeatured: false,
        isFeaturedPriority: false,
        featuredPriority: 0,
        priority: 0,
        coverMediaId: 0,
        coverMediaUrl: null,
        medias: [0],
      });
      setTitle("");
      setDescription("");
      setPriority(0);
      setPriorityInSideBar(0);
      setActive(false);
      setActiveInSideBar(false);
      setIsLoading(true);
      setCoverMediaId(0);
      setShowImgs([0]);
      setCoverMediaUrl(null);
    } else {
      fetch(`https://plansbox.ir/api/NewsCast/GetById/?id=${params.id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDefaultData(data.content);
          setTitle(data.content.title);
          setDescription(data.content.description);
          setPriority(data.content.priority);
          setPriorityInSideBar(data.content.featuredPriority);
          setActive(data.content.isFeatured);
          setActiveInSideBar(data.content.isFeaturedPriority);
          setShowImgs(data.content.medias);
          setCoverMediaId(data.content.coverMediaId);
          setCoverMediaUrl(data.content.coverMediaUrl);
          setDateTime(data.content.creatDate);
          setD(data.content.creatDate);
          editorTopRef = data.content.upperContent;
          editorBottomRef = data.content.downContent;
          setIsLoading(true);
        });
    }
  }, []);

  console.log(d);

  React.useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  const handleChangeTop = (event, newValue) => {
    setValueTop(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const check = (e, newValue) => {
    setActive(newValue);
  };

  const checkSide = (e, newValue) => {
    setActiveInSideBar(newValue);
  };

  const finalButton = () => {
    if (title === "" || !dateTime) {
      setValidation(true);
      setAlert(true);
    } else {
      setOpenFinalModal(true);
    }
  };

  if (isLosding === false) return <Loader />;

  return (
    <>
      {defaultData && (
        <Box sx={{ width: "100%", mb: "15em" }}>
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <Button
              variant="contained"
              sx={{
                fontSize: "1.25rem",
                width: "8em",
                fontWeight: "bold",
                mt: 2,
                mb: 2,
              }}
              onClick={finalButton}
            >
              ثبت
            </Button>
            <Tabs
              value={valueTop}
              onChange={handleChangeTop}
              sx={{ direction: "ltr" }}
              orientation={
                windowDimenion.winWidth < "641" ? "vertical" : "horizontal"
              }
            >
              <Tab label="اطلاعات پایه" sx={{ fontWeight: "bold" }} />
              <Tab label="متن بالای تصویر" sx={{ fontWeight: "bold" }} />
              <Tab label="متن پایین تصویر" sx={{ fontWeight: "bold" }} />
              <Tab label="تصاویر" sx={{ fontWeight: "bold" }} />
            </Tabs>
          </Box>
          <Box sx={{ width: { sm: "auto", xs: "17.5em" } }}>
            <Box
              sx={{
                display: `${valueTop === 0 ? "flex" : "none"}`,
                flexDirection: "column",
                width: "95%",
                gap: "2em",
                mt: 2,
              }}
            >
              <TextField
                error={validation}
                label="عنوان"
                sx={{ width: "50%" }}
                variant="filled"
                defaultValue={defaultData.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setValidation(false);
                }}
              />
              <TextField
                label="توضیحات مختصر"
                defaultValue={defaultData.description}
                multiline
                rows={7}
                sx={{ width: "100%" }}
                variant="filled"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box sx={{ display: { md: "flex", xs: "block" }, gap: "2em" }}>
                <Box sx={{ display: "flex", gap: "2em" }}>
                  <TextField
                    label="الویت"
                    sx={{ width: "10em" }}
                    type="number"
                    variant="filled"
                    defaultValue={defaultData.priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <TextField
                    label="الویت در نوار"
                    sx={{ width: "15em" }}
                    type="number"
                    variant="filled"
                    defaultValue={defaultData.featuredPriority}
                    onChange={(e) => setPriorityInSideBar(e.target.value)}
                  />
                </Box>
                <FormGroup
                  sx={{
                    display: "flex",
                    gap: "2em",
                    flexDirection: "row",
                    mt: { md: "0", xs: "2em" },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={check}
                        defaultChecked={defaultData.isFeatured}
                      />
                    }
                    label="فعال"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={checkSide}
                        defaultChecked={defaultData.isFeaturedPriority}
                      />
                    }
                    label="فعال در نوار"
                  />
                </FormGroup>
                <DatePicker setDateTime={setDateTime} dateTime={d} />
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: `${valueTop === 1 ? "flex" : "none"}`,
                justifyContent: "center",
                flexDirection: "column",
                gap: ".5em",
              }}
            >
              <Editor
                onInit={(evt, editor) => (editorTopRef.current = editor)}
                apiKey="qih2px1wds42lyotd7ozvyv4qn23cdcnomt0ezo09rwira4w"
                initialValue={defaultData.upperContent}
                init={{
                  height: 500,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  skin: "oxide-dark",
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #f6f6f6; }",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
                display: `${valueTop === 2 ? "flex" : "none"}`,
                justifyContent: "center",
                flexDirection: "column",
                gap: ".5em",
              }}
            >
              <Editor
                onInit={(evt, editor) => (editorBottomRef.current = editor)}
                apiKey="qih2px1wds42lyotd7ozvyv4qn23cdcnomt0ezo09rwira4w"
                initialValue={defaultData.downContent}
                init={{
                  height: 500,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  skin: "oxide-dark",
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #f6f6f6; }",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
                display: `${valueTop === 3 ? "flex" : "none"}`,
                gap: "1em",
                flexDirection: { sm: "row", xs: "column" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2em",
                  width: "60%",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    height: "5em",
                  }}
                  component="label"
                  variant="contained"
                  onClick={() => setOpenAll(true)}
                >
                  <Typography fontSize={18} fontWeight={"bold"}>
                    انتخاب تصاویر
                  </Typography>
                </Button>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {Array.isArray(showImgs) &&
                    showImgs.map((item, i) => {
                      return (
                        <Box key={item.url} sx={{ display: "flex" }}>
                          <img
                            src={item.url}
                            height={105}
                            width={105}
                            style={{ marginLeft: ".5em", cursor: "pointer" }}
                          />
                          <DeleteIcon
                            sx={{
                              ml: "-1.25em",
                              color: "white",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              const clone = [...showImgs];
                              clone.splice(i, 1);
                              setShowImgs(clone);
                            }}
                          />
                        </Box>
                      );
                    })}
                </Box>
              </Box>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  p: ".5em",
                  gap: ".5em",
                  ml: { sm: "auto", xs: "none" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "17em",
                    width: "17em",
                  }}
                  image={showImg}
                  onError={(e) => (e.target.src = "/images/empty.jpg")}
                />
                <CardContent sx={{ display: "flex", gap: "1.5em" }}>
                  <Button variant="outlined" onClick={handleOpen}>
                    انتخاب کاور
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setShowImg("/images/empty.jpg")}
                    color={"error"}
                  >
                    حذف کاور
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <PictureModal
            openImageModal={open}
            setOpenImageModal={handleClose}
            setPicture={setShowImg}
            setCoverMediaId={setCoverMediaId}
            setCoverMediaUrl={setCoverMediaUrl}
            coverMediaUrl={coverMediaUrl}
          />
          <PictureModalAll
            openImageModal={openAll}
            setOpenImageModal={setOpenAll}
            setPicture={setShowImgs}
            setCoverMediaId={setCoverMediaId}
          />
          <TransitionsModal
            open={openFinalModal}
            setOpen={setOpenFinalModal}
            text={
              params.id === "addNews"
                ? "آیا از افزودن خبر اطمینان دارید ؟"
                : "آیا از اعمال تغییرات اطمینان دارید ؟"
            }
            snackText={
              params.id === "addNews"
                ? "خبر با موفقیت افزوده شد"
                : "تغییرات با موفقیت ثبت شد"
            }
            title={title}
            params={params}
            description={description}
            priority={priority}
            priorityInSideBar={priorityInSideBar}
            active={active}
            activeInSideBar={activeInSideBar}
            editorTopRef={editorTopRef}
            editorBottomRef={editorBottomRef}
            coverMediaId={coverMediaId}
            medias={showImgs}
            dateTime={dateTime}
          />
          <CustomizedAlert
            open={Alert}
            text={"لطفا عنوان و تاریخ را وارد کنید"}
            setOpen={setAlert}
          />
        </Box>
      )}
    </>
  );
};

export default NewsListDetail;
