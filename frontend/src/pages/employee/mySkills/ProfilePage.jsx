import {
  Alert,
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dateIcon from "../../../assets/date_icon.svg";
import callIcon from "../../../assets/call_icon.svg";
import locationIcon from "../../../assets/location_icon.svg";
import departmentIcon from "../../../assets/department_icon.svg";
import mailIcon from "../../../assets/mail_icon.svg";
import editIcon from "../../../assets/edit_icon.svg";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  editUser,
  fetchUserById,
} from "../../../redux/slices/admin/users/usersActions";
import DropResume from "./DropResume";
import moment from "moment";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SkillsOverview from "./SkillsOverview";
import { Link } from "react-router-dom";
import {
  EMPLOYEE_LEARNING_EXPREIENCE_PATH,
  EMPLOYEE_MY_SKILLS_ROUTE,
  EMPLOYEE_WORK_EXPREIENCE_PATH,
} from "../../../routes/paths";
import MockContent from "../development/MockContent";
import WorkExperienceOverview from "./WorkExperienceOverview";
import EducationOverview from "./EducationOverview";
import CoursesOverview from "./CoursesOverview";
import CustomModal from "../../../ui/CustomModal";
import EditForm from "./EditForm";
import { setResponse } from "../../../redux/slices/admin/users/usersSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import DropPhoto from "./DropPhoto";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

const ProfilePage = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const { token, userInfo } = useSelector((state) => state.auth);
  const { user, loading, response } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [openSkills, setOpenSkills] = useState(lgMatches);
  const [openWorkExperience, setOpenWorkExperience] = useState(lgMatches);
  const [openEducation, setOpenEducation] = useState(lgMatches);
  const [openCourses, setOpenCourses] = useState(lgMatches);
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editFormLoading, setEditFormLoading] = useState(false);

  const formattedDate = moment(user?.created_at).format("MMM DD YYYY");

  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserById(userInfo.id));
    }
  }, [token, dispatch]);

  // Clear the response data when the component mounts
  useEffect(() => {
    return () => {
      dispatch(setResponse({ success: false, message: "" }));
    };
  }, [token, dispatch]);

  useEffect(() => {
    formik.setValues({
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      phone: user?.phone || "",
      location: user?.location || "",
      gender: user?.gender ? [user?.gender] : [],
    });
  }, [user]);

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
      dispatch(editUser({ id: userInfo.id, ...values }))
        .then(() => {
          dispatch(
            setResponse({ success: true, message: "User updated successfully" })
          );
          dispatch(fetchUserById(userInfo.id));
          handleClick();
        })
        .catch(() => {
          dispatch(setResponse({ success: true, message: "Operation failed" }));
          handleClick();
        })
        .finally(() => {
          setEditFormLoading(false);
          setSubmitting(false);
          handleCloseEditForm();
        });
    },
  });

  const handleOpenSkills = () => {
    if (!lgMatches) {
      setOpenSkills((prev) => !prev);
    }
  };
  const handleOpenWorkExperience = () => {
    if (!lgMatches) {
      setOpenWorkExperience((prev) => !prev);
    }
  };
  const handleOpenEducation = () => {
    if (!lgMatches) {
      setOpenEducation((prev) => !prev);
    }
  };
  const handleOpenCourses = () => {
    if (!lgMatches) {
      setOpenCourses((prev) => !prev);
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
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

      <Stack
        sx={{
          position: "relative",
          flexDirection: { lg: "row" },
          alignItems: { lg: "center" },
          background: "#E1FAED",
          borderRadius: "10px",
          p: 2,
          mb: 2,
        }}
      >
        <img
          onClick={handleOpenEditForm}
          src={editIcon}
          alt="Edit icon"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            cursor: "pointer",
          }}
        />

        <Stack sx={{ flex: 2 }}>
          <Stack
            sx={{
              flexDirection: { xs: "column", lg: "row" },
              alignItems: { xs: "center" },
              mb: { xs: "50px", lg: "70px" },
              gap: { xs: "12px", lg: "57px" },
            }}
          >
            {loading && <CircularProgress />}
            {!loading && (
              <>
                <DropPhoto name="profile_pic" />

                <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
                  <Typography
                    variant="h2"
                    sx={{
                      textTransform: "capitalize",
                      color: "#1E394C",
                    }}
                  >
                    {`${user?.first_name} ${user?.last_name}`}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#788894",
                      fontSize: { xs: "13px", lg: "20px" },
                      textTransform: "capitalize",
                      textAlign: { xs: "center", lg: "left" },
                    }}
                  >
                    {user?.role?.title && user?.role?.title !== "0"
                      ? user?.role?.title
                      : "No Title"}
                  </Typography>
                </Box>
              </>
            )}
          </Stack>

          <Stack sx={{ mb: { xs: 4, lg: 0 } }}>
            <Box sx={{ flex: { lg: 1 } }}>
              <Typography
                variant="h4"
                color="secondary.main"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Resume
              </Typography>
              <DropResume
                title={
                  user?.resume?.name
                    ? `CV ${user?.resume?.name}`
                    : "Upload Resume"
                }
                name="resume"
              />
            </Box>
          </Stack>
        </Stack>

        <Stack sx={{ flex: 1, gap: "22px" }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <img src={dateIcon} alt="Date icon" />
            <Typography
              variant="h4"
              sx={{
                textTransform: "capitalize",
                color: "#1E394C",
              }}
            >
              {formattedDate ? formattedDate : ""}
            </Typography>
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <img src={callIcon} alt="Call icon" />
            <Typography
              variant="h4"
              sx={{
                textTransform: "capitalize",
                color: "#1E394C",
              }}
            >
              {user?.phone ? user?.phone : ""}
            </Typography>
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <img src={locationIcon} alt="Location icon" />
            <Typography
              variant="h4"
              sx={{
                textTransform: "capitalize",
                color: "#1E394C",
              }}
            >
              {user?.location ? user?.location : ""}
            </Typography>
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <img src={departmentIcon} alt="Department icon" />
            <Typography
              variant="h4"
              sx={{
                textTransform: "capitalize",
                color: "#1E394C",
              }}
            >
              {user?.role?.department ? user?.role?.department : ""}
            </Typography>
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <img src={mailIcon} alt="Mail icon" />
            <Typography
              variant="h4"
              sx={{
                textTransform: "capitalize",
                color: "#1E394C",
              }}
            >
              {user?.email ? user?.email : ""}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Grid2 container spacing={2} mb={2}>
        <Grid2 item xs={12} lg={6}>
          <Stack spacing={2}>
            <Stack
              sx={{
                position: "relative",
                backgroundColor: "#FAFAFA",
                border: "1px solid #EEEEEE",
                borderRadius: "10px",
                height: openSkills ? "400px" : "68px",
                p: "24px",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    color: "#1E394C",
                  }}
                >
                  skills
                </Typography>

                {!lgMatches && (
                  <IconButton onClick={handleOpenSkills}>
                    {openSkills ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </Stack>

              {lgMatches ? (
                <SkillsOverview />
              ) : (
                <Collapse in={openSkills} timeout="auto" unmountOnExit>
                  <SkillsOverview />
                </Collapse>
              )}

              {openSkills && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: "25px", lg: "10px" },
                  }}
                >
                  <Link to={EMPLOYEE_MY_SKILLS_ROUTE}>
                    <Fab
                      sx={{
                        background: "#6AE6A4",
                        "&:hover": {
                          background: "#6AE6A4",
                        },
                      }}
                    >
                      <AddIcon sx={{ color: "#FFFFFF" }} />
                    </Fab>
                  </Link>
                </Box>
              )}
            </Stack>

            <Stack
              sx={{
                position: "relative",
                backgroundColor: "#FAFAFA",
                border: "1px solid #EEEEEE",
                borderRadius: "10px",
                height: openWorkExperience ? "600px" : "68px",
                p: "24px",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    color: "#1E394C",
                  }}
                >
                  work experience
                </Typography>

                {!lgMatches && (
                  <IconButton onClick={handleOpenWorkExperience}>
                    {openWorkExperience ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                )}
              </Stack>

              {lgMatches ? (
                <WorkExperienceOverview />
              ) : (
                <Collapse in={openWorkExperience} timeout="auto" unmountOnExit>
                  <WorkExperienceOverview />
                </Collapse>
              )}

              {openWorkExperience && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: "25px", lg: "10px" },
                  }}
                >
                  <Link to={EMPLOYEE_WORK_EXPREIENCE_PATH}>
                    <Fab
                      sx={{
                        background: "#6AE6A4",
                        "&:hover": {
                          background: "#6AE6A4",
                        },
                      }}
                    >
                      <AddIcon sx={{ color: "#FFFFFF" }} />
                    </Fab>
                  </Link>
                </Box>
              )}
            </Stack>
          </Stack>
        </Grid2>

        <Grid2 item xs={12} lg={6}>
          <Stack spacing={2}>
            <Stack
              sx={{
                position: "relative",
                backgroundColor: "#FAFAFA",
                border: "1px solid #EEEEEE",
                borderRadius: "10px",
                height: openEducation ? "500px" : "68px",
                p: "24px",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    color: "#1E394C",
                  }}
                >
                  education
                </Typography>

                {!lgMatches && (
                  <IconButton onClick={handleOpenEducation}>
                    {openEducation ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </Stack>

              {lgMatches ? (
                <EducationOverview />
              ) : (
                <Collapse in={openEducation} timeout="auto" unmountOnExit>
                  <EducationOverview />
                </Collapse>
              )}

              {openEducation && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: "25px", lg: "10px" },
                  }}
                >
                  <Link to={EMPLOYEE_LEARNING_EXPREIENCE_PATH}>
                    <Fab
                      sx={{
                        background: "#6AE6A4",
                        "&:hover": {
                          background: "#6AE6A4",
                        },
                      }}
                    >
                      <AddIcon sx={{ color: "#FFFFFF" }} />
                    </Fab>
                  </Link>
                </Box>
              )}
            </Stack>

            <Stack
              sx={{
                position: "relative",
                backgroundColor: "#FAFAFA",
                border: "1px solid #EEEEEE",
                borderRadius: "10px",
                height: openCourses ? "500px" : "68px",
                p: "24px",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    color: "#1E394C",
                  }}
                >
                  courses
                </Typography>

                {!lgMatches && (
                  <IconButton onClick={handleOpenCourses}>
                    {openCourses ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </Stack>

              {lgMatches ? (
                <CoursesOverview />
              ) : (
                <Collapse in={openCourses} timeout="auto" unmountOnExit>
                  <CoursesOverview />
                </Collapse>
              )}

              {openCourses && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: "25px", lg: "10px" },
                  }}
                >
                  <Link to={EMPLOYEE_LEARNING_EXPREIENCE_PATH}>
                    <Fab
                      sx={{
                        background: "#6AE6A4",
                        "&:hover": {
                          background: "#6AE6A4",
                        },
                      }}
                    >
                      <AddIcon sx={{ color: "#FFFFFF" }} />
                    </Fab>
                  </Link>
                </Box>
              )}
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>

      <Typography
        variant="h2"
        sx={{
          textTransform: "capitalize",
          color: "#1E394C",
        }}
      >
        career path
      </Typography>

      <MockContent />
    </>
  );
};

export default ProfilePage;
