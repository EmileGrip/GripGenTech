import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { EMPLOYEE_DEVELOPMENT_ROUTE } from "../../../routes/paths";
import JobChip from "./JobChip";
import RecommendChip from "./RecommendChip";
import DashLine from "../../../ui/DashLine";
import addIcon from "../../../assets/addIcon.svg";
import useLocationChange from "../../../hooks/useLocationChange";
import CustomModal from "../../../ui/CustomModal";
import AddJobForm from "./AddJobForm";
import { suggestedJobs } from "../../../data/skillsData";
import InitialContent from "./InitialContent";
import MockContent from "./MockContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsRecommendationData } from "../../../redux/slices/Employee/development/developmentActions";

const DevelopmentPage = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const { data, jobsRecommendation, jobsRecommendationLoading } = useSelector(
    (state) => state.development
  );
  const dispatch = useDispatch();

  const job = data?.jobs?.filter((job) => job?.title === user?.role?.title)[0];

  useEffect(() => {
    if (token && job?.id) {
      dispatch(fetchJobsRecommendationData(job?.id));
    }
  }, [token, dispatch, job]);

  const modifiedJobsRecommendation = [];
  jobsRecommendation?.forEach((job) => {
    const percentage = job?.percentage;
    let matchStrength;

    if (percentage > 75) {
      matchStrength = "Very high";
    } else if (percentage >= 50 && percentage <= 75) {
      matchStrength = "High";
    } else if (percentage >= 35 && percentage < 50) {
      matchStrength = "Moderate";
    } else if (percentage >= 25 && percentage < 35) {
      matchStrength = "Low";
    } else {
      matchStrength = "Very low";
    }

    const transformedItem = {
      ...job,
      matchStrength: matchStrength,
    };

    modifiedJobsRecommendation.push(transformedItem);
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Job">
        <AddJobForm data={suggestedJobs} />
      </CustomModal>

      <Typography variant="h2" color={"primary.main"} pb={2}>
        Your Career path
      </Typography>

      <Box pb={3}>
        <Typography variant="body2" color="secondary.main">
          Develop your personal career path. Add new jobs to discover which
          skills you need to develop for a possible future position.
        </Typography>
      </Box>

      {/* <InitialContent /> */}
      <MockContent />
      <Box
        className="recommended__section"
        sx={{ borderTop: "2px solid #E9E9E9", pt: 2.375 }}
      >
        <Typography variant="h3" pb={2.375} color={"primary.main"}>
          Recommended For You
        </Typography>
        <Stack
          sx={{
            flexDirection: { xs: "column", lg: "row", flexWrap: "wrap" },
            gap: { xs: "20px", lg: "36px" },
          }}
        >
          {jobsRecommendationLoading && <CircularProgress />}
          {!jobsRecommendationLoading && (
            <>
              {jobsRecommendation.length < 1 ? (
                <Typography variant="h3" color="primary" mb={3.125}>
                  No jobs found
                </Typography>
              ) : (
                <>
                  {modifiedJobsRecommendation?.map((job) => (
                    <RecommendChip key={job.title} job={job} />
                  ))}
                </>
              )}
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default DevelopmentPage;
