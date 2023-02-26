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
import TransitionsModal from "../components/projectModal";
import CustomizedAlert from "../components/alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "../components/loader";
import Autocomplete from "@mui/material/Autocomplete";
import PictureModal from "../components/pictureModal";
import PictureModalAll from "../components/pictureModalAll";
// import DatePicker from "../components/datePicker";

const ProjectDetail = () => {
  let editorTopRef = React.useRef(null);
  let editorBottomRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [openAll, setOpenAll] = React.useState(false);
  const [valueTop, setValueTop] = React.useState(0);
  const [showImg, setShowImg] = React.useState("/images/empty.jpg");
  const [showImgs, setShowImgs] = React.useState([]);
  const [openFinalModal, setOpenFinalModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [Alert, setAlert] = React.useState(false);
  const [priority, setPriority] = React.useState();
  const [active, setActive] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [defaultData, setDefaultData] = React.useState("");
  const [state, setState] = React.useState(1);
  const [type, setType] = React.useState(1);
  const [cityList, setCityList] = React.useState([]);
  const [cityId, setCityId] = React.useState(0);
  const [cityTitle, setCityTitle] = React.useState("");
  const [dateTime, setDateTime] = React.useState("");
  const [isLosding, setIsLoading] = React.useState(false);
  const [coverMediaId, setCoverMediaId] = React.useState(0);
  const [coverMediaUrl, setCoverMediaUrl] = React.useState(null);
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

  const enumState = [
    {
      text: "پایان یافته",
      num: 1,
    },
    {
      text: "در حال اجرا",
      num: 2,
    },
  ];

  const enumType = [
    {
      text: "نظارت",
      num: 1,
    },
    {
      text: "طراحی",
      num: 2,
    },
    {
      text: "طراحی و نظارت",
      num: 3,
    },
  ];

  React.useEffect(() => {
    fetch("https://plansbox.ir/api/city/GetAll")
      .then((res) => res.json())
      .then((data) => setCityList(data.content))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (params.id === "addProject") {
      setDefaultData({
        title: "",
        Description: "",
        upperContent: "",
        downContent: "",
        state: 1,
        type: 1,
        isFeatured: false,
        priority: 0,
        cityId: 0,
        cityTitle: "",
        coverMediaId: 0,
        medias: [0],
      });
      setTitle("");
      setDescription("");
      setPriority(0);
      setActive(false);
      setType(1);
      setState(1);
      setCityId(0);
      setCityTitle("");
      setIsLoading(true);
      setCoverMediaId(0);
      setShowImgs([0]);
      setCoverMediaUrl(null);
    } else {
      fetch(`https://plansbox.ir/api/project/GetById/?id=${params.id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDefaultData(data.content);
          setCityId(data.content.cityId);
          setCityTitle(data.content.cityTitle);
          setTitle(data.content.title);
          setDescription(data.content.description);
          setPriority(data.content.priority);
          setActive(data.content.isFeatured);
          setType(data.content.type);
          setState(data.content.state);
          setShowImgs(data.content.medias);
          setCoverMediaId(data.content.coverMediaId);
          setCoverMediaUrl(data.content.coverMediaUrl);
          setCityTitle(data.content.cityTitle);
          editorTopRef = data.content.upperContent;
          editorBottomRef = data.content.downContent;
          setIsLoading(true);
        });
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  const handleChangeEnumState = (event) => {
    setState(event.target.value);
  };

  const handleChangeEnumType = (event) => {
    setType(event.target.value);
  };

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

  const finalButton = () => {
    if (title === "" || cityId == 0) {
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
              {/* <DatePicker setDateTime={setDateTime} /> */}
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
                  <FormControl variant="filled" sx={{ width: "10em" }}>
                    <InputLabel>وضعیت</InputLabel>
                    <Select value={state} onChange={handleChangeEnumState}>
                      {enumState.map((item) => {
                        return (
                          <MenuItem value={item.num}>{item.text}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <FormGroup
                  sx={{
                    display: "flex",
                    gap: "2em",
                    flexDirection: "row",
                    mt: { md: "0", xs: "2em" },
                    mb: "1em",
                  }}
                >
                  <FormControl variant="filled" sx={{ width: "10em" }}>
                    <InputLabel>نوع</InputLabel>
                    <Select value={type} onChange={handleChangeEnumType}>
                      {enumType.map((item) => {
                        return (
                          <MenuItem value={item.num}>{item.text}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </FormGroup>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: ".25em" }}
                >
                  <Autocomplete
                    sx={{ width: { xl: "20em" } }}
                    options={cityList}
                    getOptionLabel={(city) => city.title}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value.title
                    }
                    onChange={(event, newValue) => {
                      setCityId(Number(newValue.id));
                      setCityTitle(newValue.title);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={validation}
                        label="شهر"
                        variant="filled"
                      />
                    )}
                  />
                  <Box
                    sx={{
                      backgroundColor: "rgb(240, 240, 240)",
                      px: 1,
                      py: 2,
                      fontWeight: "bold",
                    }}
                  >
                    {cityTitle}
                  </Box>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={check}
                      defaultChecked={defaultData.isFeatured}
                    />
                  }
                  label="فعال"
                />
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
                              color: "black",
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
                  image={coverMediaId ? coverMediaUrl : showImg}
                  onError={(e) => (e.target.src = "/images/empty.jpg")}
                />
                <CardContent sx={{ display: "flex", gap: "1.5em" }}>
                  <Button variant="outlined" onClick={handleOpen}>
                    انتخاب کاور
                  </Button>
                  <Button
                    variant="outlined"
                    color={"error"}
                    onClick={() => setShowImg("/images/empty.jpg")}
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
              params.id === "addProject"
                ? "آیا از افزودن پروژه اطمینان دارید ؟"
                : "آیا از اعمال تغییرات اطمینان دارید ؟"
            }
            snackText={
              params.id === "addProject"
                ? "پروژه با موفقیت افزوده شد"
                : "تغییرات با موفقیت ثبت شد"
            }
            title={title}
            params={params}
            description={description}
            priority={priority}
            state={state}
            type={type}
            active={active}
            editorTopRef={editorTopRef}
            editorBottomRef={editorBottomRef}
            cityRef={cityId}
            coverMediaId={coverMediaId}
            medias={showImgs}
            dateTime={dateTime}
          />
          <CustomizedAlert
            open={Alert}
            text={"لطفا عنوان و شهر را وارد کنید"}
            setOpen={setAlert}
          />
        </Box>
      )}
    </>
  );
};

export default ProjectDetail;
