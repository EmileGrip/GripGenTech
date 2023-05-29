import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
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

import { EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE } from "../../../routes/paths";
import { useFormik } from "formik";
import PhotoDropContainer from "./PhotoDropContainer";
import { resumeValidationSchema } from "./validations/validationSchema";

const acceptTypes = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.ms-powerpoint": [".ppt"],
  // "application/vnd.openxmlformats-officedocument.presentationml.presentation":
  //   [".pptx"],
};

const initialValues = {
  photo: null,
  resume: null,
  linkedIn: "",
};

const InitialSetup = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resumeValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        alert(JSON.stringify(values, null, 2));
        // navigate("");
        setSubmitting(false);
      }, 1000);
    },
  });

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

      <form onSubmit={formik.handleSubmit}>
        <Stack
          sx={{
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: { xs: "30px", md: "53px" },
            alignItems: { md: "center" },
            mb: { xs: 3.5, md: 7.75 },
          }}
        >
          <PhotoDropContainer formik={formik} name="photo" />

          <Typography
            variant="body1"
            color="secondary"
            sx={{ fontSize: { xs: "36px", md: "40px", lg: "48px" } }}
          >
            Hi Maximiliam,
            <br />
            welcome to grip
          </Typography>
        </Stack>

        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            mb: { xs: 5.375 },
            gap: { xs: "62.5px", lg: "125px" },
          }}
        >
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
              formik={formik}
              name={"resume"}
            />
          </Box>

          <Box sx={{ mr: { xs: 0 } }} flex={2}>
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
          </Box>
        </Stack>

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
      </form>
    </>
  );
};

export default InitialSetup;
