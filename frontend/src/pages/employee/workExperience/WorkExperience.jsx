import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { workExperienceData as data } from "../../../data/ExperienceData";
import ExpCard from "./ExpCard";
import { useState } from "react";
import AddJobForm from "./AddJobForm";
import CustomModal from "../../../ui/CustomModal";
import { useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";

const WorkExperience = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);

  const defaultValues = {
    position: "",
    company: "",
    joinedDate: Date.now(),
    leftDate: Date.now(),
    description: "",
  };
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(defaultValues);
  const handleAddJobBtn = () => {
    setOpen(true);
    setSelectedData(defaultValues);
  };
  const handleClose = () => setOpen(false);
  const handleEditBtn = (data) => {
    setOpen(true);
    setSelectedData(data);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="add job">
        <AddJobForm onClose={handleClose} data={selectedData} />
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
          <Button onClick={handleCloseDialog} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Stack flexDirection="row" justifyContent="space-between" mb={5.875}>
        <Typography variant="h3" component="h2" color={"primary.main"}>
          Work Experience
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            alignSelf: "flex-start",
            textTransform: "capitalize",
            mt: 1,
            fontSize: "14px",
          }}
          endIcon={<AddIcon />}
          onClick={handleAddJobBtn}
        >
          add job
        </Button>
      </Stack>

      <Stack spacing={3.125}>
        {data.map((work) => (
          <ExpCard
            onEdit={handleEditBtn}
            onDelete={handleOpenDialog}
            key={work.id}
            {...work}
          />
        ))}
      </Stack>
    </>
  );
};

export default WorkExperience;
