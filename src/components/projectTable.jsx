import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CustomizedSnackbars from "./snackBar";
import moment from "jalali-moment";
import axios from "axios";
import Loader from "./loader";

String.prototype.toPersianDigits = function () {
  var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return this.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};

const headCells = [
  {
    id: "id",
    label: "شناسه",
  },
  {
    id: "title",
    label: "عنوان",
  },
  {
    id: "city",
    label: "شهر",
  },
  {
    id: "state",
    label: "وضعیت",
  },
  {
    id: "type",
    label: "نوع",
  },
  {
    id: "active",
    label: "فعال",
  },
  {
    id: "priority",
    label: "الویت",
  },
  {
    id: "operation",
    label: "عملیات",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            borderLeftWidth: "2px",
            borderRightWidth: "1px",
            borderTopWidth: "1px",
            borderBottomWidth: ".5px",
            borderStyle: "solid",
            borderColor: "rgb(212, 212, 212)",
          }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{
              borderLeftWidth: "1px",
              borderRightWidth: "1px",
              borderBottomWidth: ".5px ",
              borderTopWidth: ".5px",
              borderStyle: "solid",
              borderColor: "rgb(212, 212, 212)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                cursor: "default",
                "&:hover": {
                  opacity: ".8",
                },
              }}
            >
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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

function EnhancedTableToolbar(props) {
  const { numSelected, numSelectedList } = props;
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const config = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const confirmButton = () => {
    axios
      .post(
        "https://plansbox.ir/api/Project/DeleteList",
        numSelectedList,
        config
      )
      .then((res) => {
        console.log(res);
        setDeleteModal(false);
        setOpenSnackBar(true);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%", fontWeight: "bold" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} انتخاب شده
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%", fontWeight: "bold" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            لیست پروژه ها
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="حذف">
            <IconButton>
              <DeleteIcon onClick={() => setDeleteModal(true)} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          open={deleteModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={deleteModal}>
            <Box sx={style}>
              <Typography
                dir="rtl"
                sx={{ textAlign: "center" }}
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                آیا از حذف پروژه های انتخاب شده اطمینان دارید ؟
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
                  onClick={() => setDeleteModal(false)}
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
          text={"پروژه با موفقیت حذف شد"}
        />
      </div>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  numSelectedList: PropTypes.array.isRequired,
};

export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetch("https://plansbox.ir/api/project/GetAllAddmin", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRows(data.content);
        setIsLoading(true);
        console.log(data.content);
      });
  }, []);

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

  const navigate = useNavigate();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  if (isLoading === false) return <Loader />;

  return (
    <>
      {rows && (
        <Box
          sx={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              mr: "auto",
              mb: "2em",
              fontSize: "1.25rem",
              width: "10em",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/projectListDetail/addProject")}
          >
            افزودن پروژه
          </Button>
          <Paper sx={{ width: { md: "100%", sm: "32em", xs: "17em" }, mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              numSelectedList={selected}
            />
            <TableContainer>
              <Table
                sx={{ background: "#f6f6f6" }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={rows.length}
                />
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell
                            padding="checkbox"
                            sx={{
                              borderLeftWidth: "2px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            sx={{
                              cursor: "default",
                              textAlign: "center",
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                            }}
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              cursor: "default",
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            {row.title}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              cursor: "default",
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            {row.cityTitle}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              cursor: "default",
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            {enumState[row.state - 1].text}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              cursor: "default",
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            {enumType[row.type - 1].text}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              cursor: "default",
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            <Checkbox
                              disabled
                              checked={row.isFeatured ? true : false}
                            />
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              cursor: "default",
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            {row.priority}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              borderLeftWidth: "1px",
                              borderRightWidth: "1px",
                              borderTopWidth: "0",
                              borderBottomWidth: ".5px",
                              borderStyle: "solid",
                              borderColor: "rgb(212, 212, 212)",
                              textAlign: "center",
                            }}
                          >
                            <a
                              href={`https://web.plansbox.ir/#/project/${row.id}`}
                            >
                              <VisibilityTwoToneIcon
                                sx={{
                                  "&:hover": {
                                    color: "#149487",
                                    cursor: "pointer",
                                    zIndex: "10",
                                  },
                                }}
                              />
                            </a>
                            <EditTwoToneIcon
                              sx={{
                                "&:hover": {
                                  color: "#149487",
                                  cursor: "pointer",
                                  zIndex: "10",
                                },
                              }}
                              onClick={() =>
                                navigate(`/projectListDetail/${row.id}`)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage={"تعداد در هر صفحه"}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ background: "#f1f1f1" }}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
