import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cameraLogo from "../../../assets/camera_icon.svg";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchData } from "../../../redux/slices/admin/companyProfile/companyProfileSlice";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";
import { EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE } from "../../../routes/paths";

const fileTypes = {
  "image/*": [".jpeg", ".jpg", ".png"],
};

const containerStyle = {
  maxWidth: "464px",
  width: "100%",
  paddingTop: "22px",
  paddingBottom: "14px",
};

const PhotoDropContainer = ({ name, logo }) => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sendPhoto = useCallback(
    async (token, photoFile) => {
      const formData = new FormData();
      formData.append("file", photoFile);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
          use_as: name,
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
        if (logo) {
          dispatch(fetchData(token));
        } else {
          dispatch(fetchUserById(userInfo.id));
        }
        // closeModal();
      }
    },
    [token]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      sendPhoto(token, file);
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
    <Box className="container" sx={containerStyle}>
      <Box
        {...getRootProps({ className: "dropzone" })}
        sx={{ textAlign: "center", mb: 1 }}
      >
        <input {...getInputProps()} />
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          {user?.profile_picture?.url || logo?.url ? (
            <img
              src={logo?.url ? logo?.url : user?.profile_picture?.url}
              alt={logo?.url ? logo?.name : user?.profile_picture?.name}
              style={{
                width: "189px",
                height: "189px",
                border: "1px solid #EEEEEE",
                borderRadius: "50%",
                objectFit: "contain",
              }}
            />
          ) : (
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
          )}

          <Button
            variant="outlined"
            sx={{ border: "none !important", textTransform: "capitalize" }}
            component="label"
          >
            {logo ? "Upload logo" : "Upload photo"}
          </Button>
        </Stack>
      </Box>
      {fileRejectionItems}
    </Box>
  );
};

export default PhotoDropContainer;
