import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import cameraLogo from "../../../assets/camera_icon.svg";

const fileTypes = {
  "image/*": [".jpeg", ".jpg", ".png", ".avif", ".svg", ".webp"],
};

const containerStyle = {
  maxWidth: "464px",
  width: "100%",
  paddingTop: "22px",
  paddingBottom: "14px",
};

const PhotoDropContainer = ({ formik, name }) => {
  const [path, setPath] = useState(null);
  console.log(path);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      formik.setFieldValue(name, acceptedFiles[0].path);
      setPath(URL.createObjectURL(acceptedFiles[0]));
    },
    [name, formik]
  );
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      accept: fileTypes,
      maxFiles: 1,
      maxSize: 4 * 10 ** 6,
    });

  return (
    <Box className="container" sx={containerStyle}>
      <Box
        {...getRootProps({ className: "dropzone" })}
        sx={{ textAlign: "center", mb: 1 }}
      >
        <input {...getInputProps()} />
        <Stack spacing={2} sx={{ alignItems: "center" }}>
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
          </Button>
        </Stack>
        {!!path && (
          <Box sx={{ width: "100%" }}>
            <img style={{ width: "100%" }} src={path} alt="file img" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PhotoDropContainer;
