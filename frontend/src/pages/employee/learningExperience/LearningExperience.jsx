import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  Snackbar,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState, useCallback, useEffect } from "react";
import CustomModal from "../../../ui/CustomModal";
import { learningExperienceData as data } from "../../../data/ExperienceData";
import EducationCard from "../../../components/EducationCard";
import CourseCard from "../../../components/CourseCard";
import AddEducationForm from "./AddEducationForm";
import { useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";
import AddCourseForm from "./AddCourseForm";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";

const LearningExperience = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);

  // Success State
  const [jobSuccess, setJobSuccess] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(true);

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

  const successHandler = (status) => {
    setJobSuccess(status);
    handleClickSnack();
  };

  // Fetching Data feature
  const [educationFetchedData, setEducationFetchedData] = useState([]);
  const [coursesFetchedData, setCoursesFetchedData] = useState([]);

  const { token, userInfo } = useSelector((state) => state.auth);

  const fetchData = useCallback(async (api) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        user_id: userInfo.id,
      },
    };

    try {
      const response = await axiosInstance.get(api, config);
      console.log(response);
      if (api === "education") {
        setEducationFetchedData(response.data.payload);
      } else if (api === "course") {
        setCoursesFetchedData(response.data.payload);
      }
      console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData("education");
    fetchData("course");
  }, [fetchData]);

  // Detect which mode is active (Add or Edit) states
  const [open, setOpen] = useState(false);
  const [btnType, setBtnType] = useState("");
  const handleClose = () => setOpen(false);

  // Add & Edit Education
  const educationDefaultValuesForm = {
    degree: "",
    institution: "",
    level: "",
    started: null,
    finished: null,
  };

  const [educationDataFrom, setEducationDataForm] = useState(
    educationDefaultValuesForm
  );

  const [openEdit, setOpenEdit] = useState(false);

  const addBtnHandler = (btn) => {
    setOpen(true);
    setBtnType(btn);
    if (btn === "Education") {
      setEducationDataForm(educationDefaultValuesForm);
    } else if (btn === "Course") {
      setCourseDataForm(courseDefaultValuesForm);
    }
    setOpenEdit(false);
  };

  const editBtnHandler = (data, btn) => {
    setOpen(true);
    if (btn === "Education") {
      setEducationDataForm(data);
    } else if (btn === "Course") {
      setCourseDataForm(data);
    }
    setBtnType(btn);
    setOpenEdit(true);
  };

  // Add & Edit Course
  const courseDefaultValuesForm = {
    degree: "",
    institution: "",
    started: null,
    finished: null,
  };

  const [courseDataForm, setCourseDataForm] = useState(courseDefaultValuesForm);

  // Delete Feature
  const [openDialog, setOpenDialog] = useState(false);
  const [jobId, setJobId] = useState(null);

  const handleOpenDialog = (btn, data) => {
    setOpenDialog(true);
    setBtnType(btn);
    setJobId(data);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteJobHandler = useCallback(
    async (api) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        params: {
          id: jobId,
        },
      };
      setJobSuccess(false);
      try {
        const response = await axiosInstance.delete(api, config);
        handleCloseDialog();
        handleClickSnack();
        fetchData(api);
        setJobSuccess(true);
        console.log(response.data);
      } catch (error) {
        setJobSuccess(false);
        handleClickSnack();
        console.log(error);
      }
    },
    [jobId, fetchData]
  );

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
          {jobSuccess ? "Success operation" : "Failed operation"}
        </Alert>
      </Snackbar>

      <CustomModal open={open} onClose={handleClose} title={`add ${btnType}`}>
        {btnType === "Education" ? (
          <AddEducationForm
            onClose={handleClose}
            data={educationDataFrom}
            onSuccess={successHandler}
            onFetch={() => fetchData("education")}
            editMode={openEdit}
          />
        ) : (
          <AddCourseForm
            onClose={handleClose}
            data={courseDataForm}
            onSuccess={successHandler}
            onFetch={() => fetchData("course")}
            editMode={openEdit}
          />
        )}
      </CustomModal>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Confirm ${btnType} Delete`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete this ${btnType}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            cancel
          </Button>
          <Button
            onClick={() =>
              btnType === "Degree"
                ? deleteJobHandler("education")
                : deleteJobHandler("course")
            }
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1.5}
      >
        <Typography variant="h3" component="h2" color={"primary.main"}>
          Education
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            alignSelf: "flex-start",
            textTransform: "capitalize",
            fontSize: "14px",
            width: "160px",
          }}
          endIcon={<AddIcon />}
          onClick={() => addBtnHandler("Education")}
        >
          add education
        </Button>
      </Stack>

      <Box pb={2.5}>
        <Typography variant="body2" color="secondary.main">
          Add education to your profile.
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {!loading && (
        <Grid2
          container
          rowSpacing={2.5}
          columnSpacing={3.375}
          sx={{ mb: { xs: 3, md: 6.75 } }}
        >
          {educationFetchedData.length !== 0 ? (
            educationFetchedData?.map((card) => (
              <Grid2 xs={12} lg={6} key={card.id}>
                <EducationCard
                  onDelete={handleOpenDialog}
                  onEdit={editBtnHandler}
                  data={card}
                />
              </Grid2>
            ))
          ) : (
            <Grid2 xs={12}>
              <Typography variant="h3" color="primary">
                Add your Education
              </Typography>
            </Grid2>
          )}
        </Grid2>
      )}

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1.5}
      >
        <Typography variant="h3" component="h2" color={"primary.main"}>
          Courses
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            alignSelf: "flex-start",
            textTransform: "capitalize",
            fontSize: "14px",
            width: "160px",
          }}
          endIcon={<AddIcon />}
          onClick={() => addBtnHandler("Course")}
        >
          add course
        </Button>
      </Stack>

      <Box pb={2.5}>
        <Typography variant="body2" color="secondary.main">
          Add courses to your profile.
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {!loading && (
        <Grid2 container rowSpacing={2.5} columnSpacing={3.375}>
          {coursesFetchedData.length !== 0 ? (
            coursesFetchedData?.map((card) => (
              <Grid2 xs={12} lg={6} key={card.id}>
                <CourseCard
                  onDelete={handleOpenDialog}
                  onEdit={editBtnHandler}
                  data={card}
                />
              </Grid2>
            ))
          ) : (
            <Grid2 xs={12}>
              <Typography variant="h3" color="primary">
                Add your Course
              </Typography>
            </Grid2>
          )}
        </Grid2>
      )}
    </>
  );
};
export default LearningExperience;
