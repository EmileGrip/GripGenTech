import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import downloadIcon from "../../../assets/Group 19.svg";
import tableImage from "../../../assets/table 1.png";
import DropContainer from "../../../components/DropContainer";
import { bulkUploadValidationSchema } from "./validations/validationSchema";

const boxStyle = {
  minHeight: "408px",
};

const BulkUploadForm = () => {
  const [currentTab, setCurrentTab] = useState("download");
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleTab = (value) => {
    setCurrentTab(value);
  };

  const handleDownloadClick = () => {
    // Set the button to disabled
    setIsDisabled(true);
    // Do something else
    // const link = document.createElement("a");
    // link.download = `download.txt`;
    // link.href = "./download.txt";
    // link.click();
    // ...
    console.log("Downloading...");
    // Set the button back to enabled
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      files: null,
    },
    validationSchema: bulkUploadValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        console.log("Uploaded successfully", values);
        // Set the isSubmitting value to false after the request is done
        setSubmitting(false);
      }, 1000);
    },
  });

  const acceptTypes = {
    "text/csv": [".csv"],
  };

  return (
    <Box sx={{ px: { xs: 2.5 } }}>
      <Stack
        direction="row"
        gap={{ xs: 0, sm: 25.25 }}
        mb={{ xs: 9.375, md: 9.375 }}
      >
        <Button
          onClick={() => toggleTab("download")}
          mb={2.5}
          sx={{ borderRadius: 1 }}
        >
          <Typography
            variant="h3"
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 600,
              color:
                currentTab === "download" ? "#1E394C" : "rgba(30, 57, 76, 0.5)",
              borderBottom: currentTab === "download" && "2px solid #1E394C",
            }}
          >
            download template
          </Typography>
        </Button>

        <Button
          onClick={() => toggleTab("upload")}
          mb={2.5}
          sx={{ borderRadius: 1 }}
        >
          <Typography
            variant="h3"
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 600,
              color:
                currentTab === "upload" ? "#1E394C" : "rgba(30, 57, 76, 0.5)",
              borderBottom: currentTab === "upload" && "2px solid #1E394C",
            }}
          >
            upload template
          </Typography>
        </Button>
      </Stack>

      {currentTab === "download" ? (
        <Box sx={boxStyle}>
          <img style={{ width: "100%" }} src={tableImage} alt="table" />

          <Typography
            variant="h5"
            mb="36px"
            sx={{
              textTransform: "capitalize",
              width: { sm: "544px" },
              color: "secondary.main",
            }}
          >
            Download and fill out the Organigram Template to automatically set
            your company’s workforce in their respecive departments, levels, and
            positions
          </Typography>

          <Button
            onClick={handleDownloadClick}
            disabled={isDisabled}
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              fontSize: "14px",
              px: 2,
            }}
            startIcon={<img src={downloadIcon} alt="download grip template" />}
          >
            download grip template
          </Button>
        </Box>
      ) : (
        <Box sx={boxStyle}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Box
                sx={{
                  mb: 3,
                  flex: { md: "1" },
                }}
                className="formControl__wrapper leftSide"
              >
                <DropContainer
                  title={"Drag CSV Here"}
                  fileTypes={acceptTypes}
                  formik={formik}
                  name="files"
                />
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  mb="36px"
                  sx={{
                    textTransform: "capitalize",
                    width: { sm: "544px" },
                    color: "secondary.main",
                  }}
                >
                  Upload your filled out Organigram Template to automatically
                  set your company’s workforce in their respecive departments,
                  levels, and positions
                </Typography>
              </Box>

              <Box>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  variant="contained"
                  color="secondary"
                  sx={{
                    alignSelf: "flex-start",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    px: 2,
                  }}
                  startIcon={
                    <img src={downloadIcon} alt="upload grip template" />
                  }
                >
                  upload grip template
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default BulkUploadForm;
