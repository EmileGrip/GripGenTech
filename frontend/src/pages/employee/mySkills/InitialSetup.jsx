import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import cameraLogo from "../../../assets/camera_icon.svg";
import Uppy from "@uppy/core";
import ResumeUploader from "./ResumeUploader";
import DropContainer from "../../../components/DropContainer";
import EditForm from "./EditForm";

import { EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE } from "../../../routes/paths";
import { useFormik } from "formik";
import PhotoDropContainer from "./PhotoDropContainer";
import { fileValidationSchema } from "./validations/validationSchema";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../../redux/slices/admin/companyProfile/companyProfileSlice";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";

const acceptTypes = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  // "application/vnd.ms-powerpoint": [".ppt"],
  // "application/vnd.openxmlformats-officedocument.presentationml.presentation":
  //   [".pptx"],
};

const initialValues = {
  photo: null,
  resume: null,
  linkedIn: "",
};

const WrapperStackStyle = {
  flexDirection: "row",
  alignItems: "baseline",
  gap: { xs: "20px", lg: "40px", xl: "60px" },
  flex: 1,
  mb: 2,
};

const labelStyle = {
  fontWeight: "500",
  color: "secondary.main",
};

const InitialSetup = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const { token, userInfo } = useSelector((state) => state.auth);
  const { fetchedData } = useSelector((state) => state.companyProfile);
  const { user, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Fetching company Data
  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserById(userInfo.id));
    }
  }, [token, dispatch]);

  const resumeUploadForm = useFormik({
    initialValues: {
      resume: null,
    },
    validationSchema: fileValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      setTimeout(() => {
        // submit to the server
        sendResume(token, values.resume);
        setSubmitting(false);
      }, 1000);
    },
  });

  const sendResume = useCallback(
    async (token, resumeFile) => {
      const formData = new FormData();
      formData.append("file", resumeFile);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
          use_as: "resume",
        },
      };

      try {
        const response = await axiosInstance.post(`files`, formData, config);
        console.log(response.data);
        // navigate(EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE);
        // onSuccess(true);
        // onClose();
        // onFetch();
      } catch (error) {
        // onSuccess(false);
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        // dispatch(fetchData(token));
        // closeModal();
      }
    },
    [token]
  );

  return (
    <>
      <Typography variant="h3" component="h2" mb={8.25} color={"primary.main"}>
        Initial Setup -{" "}
        <Typography
          variant="h3"
          component="span"
          mb={3}
          color={"primary.main"}
          sx={{ fontWeight: "400" }}
        >
          Basic Info
        </Typography>
      </Typography>

      <Stack
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: { xs: "30px", md: "53px" },
          alignItems: { md: "center" },
          mb: { xs: 3.5, md: 7.75 },
        }}
      >
        <PhotoDropContainer name="profile_pic" />

        <Typography
          variant="body1"
          color="secondary"
          sx={{ fontSize: { xs: "36px", md: "40px", lg: "48px" } }}
        >
          Hi{" "}
          <span style={{ textTransform: "capitalize" }}>
            {userInfo.first_name}
          </span>
          ,
          <br />
          welcome to{" "}
          <span style={{ textTransform: "capitalize" }}>
            {fetchedData?.name}
          </span>
        </Typography>
      </Stack>

      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          mb: { xs: 5.375 },
          gap: { xs: "62.5px", lg: "125px" },
        }}
      >
        <form onSubmit={resumeUploadForm.handleSubmit}>
          <Stack sx={{ gap: 5.375 }}>
            <Box sx={{ flex: { lg: 1 } }}>
              <Typography
                variant="h4"
                color="secondary.main"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Upload Resume
              </Typography>
              <DropContainer
                title={"Drag Resumé Here"}
                fileTypes={acceptTypes}
                formik={resumeUploadForm}
                name={"resume"}
              />
            </Box>

            <Stack flexDirection="row" gap="53px" alignItems="baseline">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ px: "50px", textTransform: "capitalize" }}
              >
                Finish
              </Button>
              <Link
                style={{
                  color: "#66C1FF",
                  textDecoration: "1px underline ",
                }}
                to={EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE}
              >
                Skip
              </Link>
            </Stack>
          </Stack>
        </form>

        {/* <Box sx={{ mr: { xs: 0 } }} flex={2}>
          <Typography
            variant="h4"
            color="secondary.main"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Connect your Linkedin Profile
          </Typography>

          <Box sx={{ pr: { xs: 0 } }}>
            <TextField
              id="Linkedin URL"
              label="Linkedin URL"
              name="linkedin_url"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: { xs: 1.5, lg: 0 },
                maxWidth: "600px",
                "> div": {
                  paddingRight: 0,
                },
                background: "#f2f2f2",
                "& .MuiOutlinedInput-notchedOutline ": {
                  borderRadius: "8px !important",
                  borderColor: "rgba(242, 242, 242, 0.9) !important",
                },
                "& .MuiInputBase-input": {
                  background: "#f2f2f2",
                  opacity: "0.9",
                },
              }}
              InputProps={{
                endAdornment: (
                  <>
                    {mdMatches && (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          color="secondary"
                          disableElevation
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "400",
                            px: "41px",
                          }}
                        >
                          Connect
                        </Button>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
            />
            {!mdMatches && (
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "400",
                  px: "41px",
                }}
              >
                Connect
              </Button>
            )}
          </Box>
        </Box> */}

        <EditForm />
      </Stack>
    </>
  );
};

export default InitialSetup;
