import { Avatar, Box, List, ListItem, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../../assets/edit_icon.svg";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";

const fileTypes = {
  "image/*": [".jpeg", ".jpg", ".png"],
};

const DropPhoto = ({ name }) => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

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
    <Box sx={{ position: "relative" }}>
      <input {...getInputProps()} />
      <Box
        {...getRootProps({ className: "dropzone" })}
        sx={{
          width: "35px",
          height: "35px",
          background: "#FFFFFF",
          borderRadius: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "0px",
          right: "0px",
          cursor: "pointer",
          zIndex: 3,
        }}
      >
        <img src={editIcon} alt="Edit icon" />
      </Box>

      <Avatar
        src={user?.profile_picture?.url}
        alt={user?.profile_picture?.name}
        sx={{ width: "114px", height: "114px" }}
      />

      {fileRejectionItems}
    </Box>
  );
};

export default DropPhoto;
