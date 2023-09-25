import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  Snackbar,
  Stack,
  Box,
} from "@mui/material";
import editIcon from "../../../assets/edit_icon.svg";
import addFileIcon from "../../../assets/add_file_icon.svg";
import { useState, useCallback, useEffect } from "react";
import CustomModal from "../../../ui/CustomModal";
import AddCourseForm from "../learningExperience/AddCourseForm";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { Link } from "react-router-dom";
import { EMPLOYEE_LEARNING_EXPREIENCE_PATH } from "../../../routes/paths";
import CouCard from "./CouCard";

const CoursesOverview = () => {
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
  const [coursesFetchedData, setCoursesFetchedData] = useState([]);

  const { token, userInfo } = useSelector((state) => state.auth);

  const fetchData = useCallback(async () => {
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
      const response = await axiosInstance.get("course", config);
      console.log(response);
      setCoursesFetchedData(response.data.payload);
      console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Detect which mode is active (Add or Edit) states
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // Add & Edit Courses
  const coursesDefaultValuesForm = {
    degree: "",
    institution: "",
    level: "",
    started: null,
    finished: null,
  };

  const [coursesDataFrom, setCoursesDataForm] = useState(
    coursesDefaultValuesForm
  );

  const [openEdit, setOpenEdit] = useState(false);

  const addBtnHandler = () => {
    setOpen(true);
    setCoursesDataForm(coursesDefaultValuesForm);
    setOpenEdit(false);
  };

  const editBtnHandler = (data) => {
    setOpen(true);
    setCoursesDataForm(data);
    setOpenEdit(true);
  };

  // Delete Feature
  const [openDialog, setOpenDialog] = useState(false);
  const [jobId, setJobId] = useState(null);

  const handleOpenDialog = (data) => {
    setOpenDialog(true);
    setJobId(data);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteJobHandler = useCallback(async () => {
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
      const response = await axiosInstance.delete("course", config);
      handleCloseDialog();
      handleClickSnack();
      fetchData();
      setJobSuccess(true);
      console.log(response.data);
    } catch (error) {
      setJobSuccess(false);
      handleClickSnack();
      console.log(error);
    }
  }, [jobId, fetchData]);

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

      <CustomModal open={open} onClose={handleClose} title={`add course`}>
        <AddCourseForm
          onClose={handleClose}
          data={coursesDataFrom}
          onSuccess={successHandler}
          onFetch={fetchData}
          editMode={openEdit}
        />
      </CustomModal>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Course Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            cancel
          </Button>
          <Button onClick={deleteJobHandler} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Stack className="displayData__section" sx={{ width: "100%" }}>
        {loading && <CircularProgress />}
        {!loading && (
          <>
            {coursesFetchedData.length < 1 ? (
              <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <img src={addFileIcon} alt="Add file icon" />

                <Typography variant="h3" color="#788894" my="20px">
                  Your Course information is empty
                </Typography>
              </Stack>
            ) : (
              <Box
                className="tableContent__section"
                sx={{
                  height: { xs: "320px", lg: "350px" },
                  overflowY: "auto",
                  pr: 2,
                }}
              >
                <Link to={EMPLOYEE_LEARNING_EXPREIENCE_PATH}>
                  <img
                    src={editIcon}
                    alt="Edit icon"
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      cursor: "pointer",
                    }}
                  />
                </Link>

                {coursesFetchedData.map((card) => (
                  <CouCard
                    key={card.id}
                    onDelete={handleOpenDialog}
                    onEdit={editBtnHandler}
                    data={card}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Stack>
    </>
  );
};
export default CoursesOverview;
