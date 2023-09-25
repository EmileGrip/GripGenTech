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
import AddIcon from "@mui/icons-material/Add";
import ExpCard from "../../../components/ExpCard";
import { useCallback, useEffect, useState } from "react";
import AddJobForm from "./AddJobForm";
import CustomModal from "../../../ui/CustomModal";
import { useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";

const WorkExperience = () => {
  // Page Title State
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);

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
      {loading && <CircularProgress />}
      {!loading && (
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

          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-between" },
              mb: 1.5,
            }}
          >
            <Typography variant="h3" component="h2" color={"primary.main"}>
              Work Experience
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                alignSelf: "flex-start",
                textTransform: "capitalize",
                fontSize: "14px",
              }}
              endIcon={<AddIcon />}
              onClick={handleAddJobBtn}
            >
              add job
            </Button>
          </Stack>

          <Box pb={{ xs: 2.5, lg: 5.875 }}>
            <Typography variant="body2" color="secondary.main">
              Add work experience to your profile.
            </Typography>
          </Box>

          <Stack spacing={3.125}>
            {fetchedData.length !== 0 ? (
              fetchedData.map((work, index) => (
                <ExpCard
                  onEdit={handleEditBtn}
                  onDelete={handleOpenDialog}
                  key={`${work.id}-${index}`}
                  data={work}
                />
              ))
            ) : (
              <Typography variant="h3" color="primary">
                Add your work experience
              </Typography>
            )}
          </Stack>
        </>
      )}
    </>
  );
};

export default WorkExperience;
