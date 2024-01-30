import {
  Alert,
  Box,
  List,
  ListItem,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import editIcon from "../../../assets/edit_icon.svg";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";
import { useState } from "react";

const containerStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
  width: { xs: "167px", lg: "383px" },
  height: "38px",
};

const fileTypes = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

const DropResume = ({ title, name }) => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [jobSuccess, setJobSuccess] = useState(null);

  const successHandler = (status) => {
    setJobSuccess(status);
    handleClickSnack();
  };

  // Snackbar handlers
  const [openSnack, setOpenSnack] = useState(false);
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

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
      setJobSuccess(false);
      try {
        setJobSuccess(true);
        const response = await axiosInstance.post(`files`, formData, config);
        successHandler(true);
        console.log(response.data);
        // navigate(EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE);
        // onSuccess(true);
        // onClose();
        // onFetch();
      } catch (error) {
        // onSuccess(false);
        successHandler(true);
        setJobSuccess(false);
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchUserById(userInfo.id));
        // closeModal();
      }
    },
    [token]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      sendResume(token, file);
    },
    [name]
  );

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      accept: fileTypes,
      maxFiles: 1,
      maxSize: 4 * 10 ** 6,
    });

  const files = acceptedFiles.map((file, index) => (
    <Typography
      key={index}
      variant="span"
      color={"secondary.main"}
      fontWeight={"700"}
    >
      {file.path}
    </Typography>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Box key={file.path}>
      <Typography variant="h5" color={"secondary.main"} fontWeight={"400"}>
        Selected File:{" "}
        <Typography variant="span" color={"secondary.main"} fontWeight={"700"}>
          {file.path}
        </Typography>
      </Typography>
      <List>
        {errors.map((e) => (
          <ListItem key={e.code} sx={{ color: "warning.main" }}>
            {e.message}
          </ListItem>
        ))}
      </List>
    </Box>
  ));

  return (
    <>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={jobSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {jobSuccess ? "Resume successfully uploaded" : "Failed operation"}
        </Alert>
      </Snackbar>

      <Box id="employee__step__1" className="container" sx={containerStyle}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            px: "22px",
            py: "7px",
          }}
        >
          <Box
            sx={{
              width: { xs: "100px", lg: "auto" },
              textAlign: "center",
              mb: 1,
            }}
            title={title}
          >
            <input {...getInputProps()} />
            <Typography
              variant="body1"
              color="secondary.main"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
          </Box>

          <Box
            {...getRootProps({ className: "dropzone" })}
            sx={{ cursor: "pointer" }}
          >
            <img src={editIcon} alt="Edit icon" />
          </Box>
        </Stack>
        {fileRejectionItems}
      </Box>
    </>
  );
};

export default DropResume;
