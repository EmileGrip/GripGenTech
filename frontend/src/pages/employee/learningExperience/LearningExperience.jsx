import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import CustomModal from "../../../ui/CustomModal";
import { learningExperienceData as data } from "../../../data/ExperienceData";
import EducationCard from "./EducationCard";
import CourseCard from "./CourseCard";
import AddEducationForm from "./AddEducationForm";
import { useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";
import AddCourseForm from "./AddCourseForm";

const LearningExperience = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);

  const educationDefaultValues = {
    degree: "",
    institution: "",
    level: "",
    started: Date.now(),
    finished: Date.now(),
  };
  const courseDefaultValues = {
    degree: "",
    institution: "",
    started: Date.now(),
    finished: Date.now(),
  };

  const [open, setOpen] = useState(false);
  const [educationData, setEducationData] = useState(educationDefaultValues);
  const [courseData, setCourseData] = useState(courseDefaultValues);
  const [btnType, setBtnType] = useState("");

  const addEducationBtnHandler = (btn) => {
    setOpen(true);
    setBtnType(btn);
    setEducationData(educationDefaultValues);
  };
  const editEducationBtnHandler = (data, btn) => {
    setOpen(true);
    setEducationData(data);
    setBtnType(btn);
  };
  const addCourseBtnHandler = (btn) => {
    setOpen(true);
    setBtnType(btn);
    setCourseData(courseDefaultValues);
  };
  const editCourseBtnHandler = (data, btn) => {
    setOpen(true);
    setBtnType(btn);
    setCourseData(data);
  };
  const handleClose = () => setOpen(false);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (btn) => {
    setOpenDialog(true);
    setBtnType(btn);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <CustomModal open={open} onClose={handleClose} title={`add ${btnType}`}>
        {btnType === "Education" ? (
          <AddEducationForm onClose={handleClose} data={educationData} />
        ) : (
          <AddCourseForm onClose={handleClose} data={courseData} />
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
          <Button onClick={handleCloseDialog} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2.5}
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
            mt: 1,
            fontSize: "14px",
          }}
          endIcon={<AddIcon />}
          onClick={() => addEducationBtnHandler("Education")}
        >
          add education
        </Button>
      </Stack>
      <Grid2 container rowSpacing={2.5} columnSpacing={3.375} mb={6.75}>
        {data.education.map((card) => (
          <Grid2 xs={12} lg={6} key={card.id}>
            <EducationCard
              onDelete={handleOpenDialog}
              onEdit={editEducationBtnHandler}
              {...card}
            />
          </Grid2>
        ))}
      </Grid2>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2.5}
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
            mt: 1,
            fontSize: "14px",
          }}
          endIcon={<AddIcon />}
          onClick={() => addCourseBtnHandler("Course")}
        >
          add course
        </Button>
      </Stack>
      <Grid2 container rowSpacing={2.5} columnSpacing={3.375}>
        {data.courses.map((card) => (
          <Grid2 xs={12} lg={6} key={card.id}>
            <CourseCard
              onDelete={handleOpenDialog}
              onEdit={editCourseBtnHandler}
              {...card}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
export default LearningExperience;
