import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import editIcon from "../../../assets/edit_icon.svg";
import addFileIcon from "../../../assets/add_file_icon.svg";
import { useCallback, useEffect, useState } from "react";
import AddJobForm from "../../employee/workExperience/AddJobForm";
import CustomModal from "../../../ui/CustomModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { EMPLOYEE_WORK_EXPREIENCE_PATH } from "../../../routes/paths";
import ExperienceCard from "./ExperienceCard";

const WorkExperienceOverview = () => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const userId = userInfo.id;
  // Success State
  const [jobSuccess, setJobSuccess] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(true);

  // Fetching Data feature
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        user_id: userId,
      },
    };

    try {
      const response = await axiosInstance.get(`experience`, config);
      setFetchedData(response.data.payload);
      // console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const defaultValues = {
    position: "",
    company: "",
    joinedDate: null,
    leftDate: null,
    description: "",
    current: false,
  };

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(defaultValues);

  const handleAddJobBtn = () => {
    setOpen(true);
    setSelectedData(defaultValues);
    setOpenEdit(false);
  };
  const handleClose = () => setOpen(false);

  const successHandler = (status) => {
    setJobSuccess(status);
    handleClickSnack();
  };

  // Edit Job feature
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditBtn = (data) => {
    setOpen(true);
    setSelectedData(data);
    setOpenEdit(true);
  };

  // Delete Job feature
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
      const response = await axiosInstance.delete(`experience`, config);
      setLoading(true);
      handleCloseDialog();
      setJobSuccess(true);
      handleClickSnack();
      fetchData();
      console.log(response.data);
    } catch (error) {
      setJobSuccess(false);
      handleClickSnack();
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [jobId, fetchData, token]);

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

      <CustomModal open={open} onClose={handleClose} title="add job">
        <AddJobForm
          onClose={handleClose}
          data={selectedData}
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
        <DialogTitle id="alert-dialog-title">
          {"Confirm Experience Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this experience?
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
            {fetchedData.length < 1 ? (
              <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <img src={addFileIcon} alt="Add file icon" />

                <Typography variant="h3" color="#788894" my="20px">
                  Your Work Experience information is empty
                </Typography>
              </Stack>
            ) : (
              <Box
                className="tableContent__section"
                sx={{
                  height: { xs: "420px", lg: "450px" },
                  overflowY: "auto",
                  pr: 2,
                }}
              >
                <Link to={EMPLOYEE_WORK_EXPREIENCE_PATH}>
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

                {fetchedData.map((work, index) => (
                  <ExperienceCard
                    onEdit={handleEditBtn}
                    onDelete={handleOpenDialog}
                    key={`${work.id}-${index}`}
                    data={work}
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

export default WorkExperienceOverview;
