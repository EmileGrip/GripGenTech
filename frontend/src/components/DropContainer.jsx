import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import file_icon from "../assets/file_icon.svg";
import { useCallback } from "react";

const containerStyle = {
  backgroundColor: "#F3F3F3",
  borderRadius: "10px",
  maxWidth: "464px",
  width: "100%",
  paddingTop: "22px",
  paddingBottom: "14px",
};

const DropContainer = ({ title, fileTypes, formik, name }) => {
  const [path, setPath] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      formik.setFieldValue(name, file);
      setPath(URL.createObjectURL(file));
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
    <section className="container" style={containerStyle}>
      <Stack>
        <Box
          {...getRootProps({ className: "dropzone" })}
          sx={{ textAlign: "center", mb: 1 }}
        >
          <input {...getInputProps()} />
          <img src={file_icon} alt="file img" />
          <Typography variant="body1" color="secondary.main" mt={1.25}>
            {title}
          </Typography>
          <Typography
            variant="span"
            sx={{ fontSize: "12px", opacity: "0.5" }}
            color="secondary.main"
          >
            or, click to browse (4MB max)
          </Typography>
        </Box>
        <Box sx={{ pl: 2 }}>
          {!!formik.initialValues.files && acceptedFiles.length === 0 && (
            <Typography
              variant="h5"
              color={"secondary.main"}
              fontWeight={"400"}
            >
              Selected File:
              <Typography
                variant="span"
                color={"secondary.main"}
                fontWeight={"700"}
                sx={{ wordBreak: "break-all" }}
              >
                {formik.initialValues.files}
              </Typography>
            </Typography>
          )}
          {!!path && (
            <Typography
              variant="h5"
              color={"secondary.main"}
              fontWeight={"400"}
            >
              Selected File: {files}
            </Typography>
          )}
          {fileRejectionItems}
        </Box>
      </Stack>
    </section>
  );
};

export default DropContainer;
