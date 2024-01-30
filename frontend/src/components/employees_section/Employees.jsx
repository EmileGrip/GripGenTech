import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { employeeData as data } from "../../data/employeeData";
import rightArrows from "../../assets/chevrons-right.svg";
import filter from "../../assets/filter.svg";
import search from "../../assets/search.svg";
// import "./custom_styles.css";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CardEmployee from "../CardEmployee";
import { useState } from "react";
import CustomModal from "../../ui/CustomModal";
import EmployeeProfile from "../EmployeeProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  fetchUsers,
} from "../../redux/slices/admin/users/usersActions";
import { setResponse } from "../../redux/slices/admin/users/usersSlice";
import AssignRoleForm from "../../pages/admin/organigram/AssignRoleForm";
import { useFormik } from "formik";
import * as yup from "yup";
import EditForm from "../../pages/employee/mySkills/EditForm";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

const Employees = () => {
  const location = useLocation();
  const [title, setTitle] = useOutletContext();
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedEmployeeData, setClickedEmployeeData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { response } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [openSnack, setOpenSnack] = useState(false);
  const handleClick = () => {
    setOpenSnack(true);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  // Edit functionalities
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editFormLoading, setEditFormLoading] = useState(false);

  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  // Clear the response data when the component mounts
  useEffect(() => {
    return () => {
      dispatch(setResponse({ success: false, message: "" }));
    };
  }, [token, dispatch]);

  useEffect(() => {
    formik.setValues({
      firstName: clickedEmployeeData?.first_name || "",
      lastName: clickedEmployeeData?.last_name || "",
      phone: clickedEmployeeData?.phone || "",
      location: clickedEmployeeData?.location || "",
      gender: clickedEmployeeData?.gender ? [clickedEmployeeData?.gender] : [],
    });
  }, [clickedEmployeeData]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      gender: [],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // submit to the server
      // Assuming the editUser function returns a promise
      setEditFormLoading(true);
      dispatch(editUser({ id: clickedEmployeeData.id, ...values }))
        .then(() => {
          dispatch(
            setResponse({ success: true, message: "User updated successfully" })
          );
          handleClick();
        })
        .catch(() => {
          dispatch(setResponse({ success: true, message: "Operation failed" }));
          handleClick();
        })
        .finally(() => {
          dispatch(fetchUsers(token));
          setEditFormLoading(false);
          setSubmitting(false);
          handleCloseEditForm();
        });
    },
  });

  const handleFilterClick = () => {
    // Toggle the sorting order
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setTitle(location.pathname.split("/").at(-1));
  }, [location, setTitle]);

  const { data: fetchedUsersData, loading } = useSelector(
    (state) => state.users
  );

  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(data.emlopyees[0]);
  const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false);

  const handleAssignRoleOpen = () => setIsAssignRoleOpen(true);
  const handleAssignRoleClose = () => setIsAssignRoleOpen(false);

  // fetch employess data  from api
  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token, dispatch]);

  const dialogHanlder = (selectedData) => {
    setOpen(true);
    setDialogData(selectedData);
  };

  const handleClose = () => setOpen(false);

  const modifiedUsersData = fetchedUsersData?.data
    ?.slice()
    ?.sort((a, b) => {
      if (sortOrder === "asc") {
        return a?.first_name?.localeCompare(b?.first_name);
      } else {
        return b?.first_name?.localeCompare(a?.first_name);
      }
    })
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={!response?.success ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {response?.message}
        </Alert>
      </Snackbar>

      <CustomModal
        open={openEditForm}
        onClose={handleCloseEditForm}
        title={`edit information`}
      >
        <EditForm formik={formik} loading={editFormLoading} />
      </CustomModal>

      {/* <CustomDialog open={open} onClose={handleClose} data={dialogData} /> */}
      <CustomModal
        open={isAssignRoleOpen}
        onClose={handleAssignRoleClose}
        title="Add Employee"
      >
        <AssignRoleForm closeModal={handleAssignRoleClose} />
      </CustomModal>

      <CustomModal open={open} onClose={handleClose} title=" ">
        <EmployeeProfile data={dialogData} />
      </CustomModal>

      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              pb: "25px",
              borderBottom: { xs: "none", md: "2px solid #e9e9e9" },
            }}
          >
            <Stack sx={{ flexDirection: "row", gap: "12px" }}>
              <Typography variant="h3" color="darkGreen">
                {fetchedUsersData?.data?.length}
              </Typography>

              <Typography variant="h4" color="darkGreen">
                Total Employees
              </Typography>
            </Stack>
            {/* <Typography variant="body1" color="primary" sx={{ mr: "24px" }}>
              <Typography
                variant="span"
                color="primary"
                sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
              >
                {fetchedUsersData?.data?.length}
              </Typography>
              Total Employees
            </Typography> */}
            {/* {mdMatches && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{ width: "2px", mr: "24px" }}
              />
            )}
            <Typography variant="body1" color="primary" sx={{ mr: "24px" }}>
              <Typography
                variant="span"
                color="primary"
                sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
              >
                {data["activeEmployees"]}
              </Typography>
              Total Active Employees
            </Typography>
            {mdMatches && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{ width: "2px", mr: "24px" }}
              />
            )}
            <Typography variant="body1" color="primary" sx={{ mr: "16px" }}>
              <Typography
                variant="span"
                color="primary"
                sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
              >
                {data["archivedEmployees"]}
              </Typography>
              Achived Employees
            </Typography>
            {mdMatches && <img src={rightArrows} alt="chevrons-right" />} */}
          </Stack>

          <Stack
            justifyContent="space-between"
            sx={{
              mt: "32px",
              mb: "42px",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              color="primary"
              sx={{ mb: { xs: 2 } }}
            >
              Overview
            </Typography>

            <Stack
              sx={{
                flexDirection: { xs: "column-reverse", md: "row" },
                gap: "20px",
              }}
            >
              <Stack flexDirection="row" gap="20px" alignItems="center">
                <TextField
                  name="search_employee"
                  fullWidth
                  size="small"
                  type="search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={
                    {
                      // background: "#f2f2f2",
                      // opacity: 0.9,
                      // "& .MuiOutlinedInput-notchedOutline": {
                      //   borderRadius: "8px !important",
                      //   borderColor: " rgba(242, 242, 242, 0.9) !important",
                      // },
                      // "& .MuiInputBase-input": {
                      //   background: "#f2f2f2",
                      //   opacity: 0.9,
                      // },
                    }
                  }
                  placeholder="Search Employee"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={search} alt="search icon" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  onClick={handleFilterClick}
                  sx={{
                    alignSelf: "center",
                    textTransform: "capitalize",
                    border: "2px solid #e9e9e9 ",
                    borderRadius: "4px",
                    color: "primary.main",
                    fontWeight: "400",
                    px: 3,
                    "&: hover": {
                      border: "2px solid #e9e9e9 ",
                    },
                  }}
                  disableElevation
                  disableRipple
                  startIcon={<img src={filter} alt="filter icon" />}
                  variant="outlined"
                >
                  Filter
                </Button>
              </Stack>

              <Button
                onClick={handleAssignRoleOpen}
                variant="contained"
                color="secondary"
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  px: "28px",
                  height: "41.2px",
                }}
              >
                add employee
              </Button>
            </Stack>
          </Stack>

          <Grid2
            container
            rowSpacing={"28px"}
            columnSpacing={"20px"}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 20 }}
          >
            {modifiedUsersData?.length > 0 ? (
              modifiedUsersData.map((employee, index) => (
                <Grid2
                  id={index === 0 ? "manager__step__1" : `${employee.id}`}
                  xs={4}
                  key={index}
                >
                  <CardEmployee
                    onOpen={dialogHanlder}
                    data={employee}
                    handleOpenEditForm={handleOpenEditForm}
                    setClickedEmployeeData={setClickedEmployeeData}
                  />
                </Grid2>
              ))
            ) : (
              <Grid2>
                <Typography variant="h3" color="primary">
                  No Employees found
                </Typography>
              </Grid2>
            )}
          </Grid2>
        </>
      )}
    </>
  );
};

export default Employees;
