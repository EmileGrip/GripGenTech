import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import cameraLogo from "../../../assets/camera_icon.svg";
import Uppy from "@uppy/core";
import ResumeUploader from "./ResumeUploader";
import DropContainer from "./DropContainer";

import { EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE } from "../../../routes/paths";

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

const InitialSetup = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE);
  };

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

      <form onSubmit={submitHandler}>
        <Stack flexDirection="row" gap="53px" alignItems="center" mb={7.75}>
          <Stack spacing={2}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "189px",
                height: "189px",
                background: "#D9D9D9",
                borderRadius: "50%",
              }}
            >
              <img src={cameraLogo} alt="camera-icon" />
            </Stack>
            <Button
              variant="outlined"
              sx={{ border: "none !important", textTransform: "capitalize" }}
              component="label"
            >
              Upload Photo
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Stack>

          <Typography variant="body1" fontSize={"48px"} color="secondary">
            Hi Maximiliam,
            <br />
            welcome to grip
          </Typography>
        </Stack>

        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              xl: "row",
            },
            mb: 5.375,
          }}
          gap="125px"
        >
          <Box>
            <Typography
              variant="h4"
              color="secondary.main"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Upload Resume
            </Typography>
            <DropContainer title={"Drag Resumé Here"} fileTypes={acceptTypes} />
          </Box>

          <Box mr={4} flex={1}>
            <Typography
              variant="h4"
              color="secondary.main"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Connect your Linkedin Profile
            </Typography>

            <Box sx={{ pr: 5 }}>
              <TextField
                id="Linkedin URL"
                label="Linkedin URL"
                name="linkedin_url"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
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
                  ),
                }}
              />
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
