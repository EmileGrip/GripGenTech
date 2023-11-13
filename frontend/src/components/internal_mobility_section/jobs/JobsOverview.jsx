import { CircularProgress, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../redux/slices/internalMobility/addJobFormSlice";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import JobCard from "./JobCard";

const JobsOverview = ({ projects = false }) => {
  const { jobs, loading } = useSelector((state) => state.addJobForm);
  const { projects: projectsData, projectsLoading } = useSelector(
    (state) => state.addProjectForm
  );
  const data = projects ? projectsData : jobs;
  const dataLoading = projects ? projectsLoading : loading;
  const dispatch = useDispatch();

  useEffect(() => {
    if (projects) {
      dispatch(fetchProjects());
    } else {
      dispatch(fetchJobs());
    }
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {projects ? "Projects" : "Jobs"}
      </Typography>

      {dataLoading && <CircularProgress size={20} />}
      {!dataLoading && (
        <Stack sx={{ gap: "20px", mb: 3 }}>
          {data.length < 1 ? (
            <Typography variant="h3" color="primary" mb={3.125}>
              {projects ? "No projects found" : "No jobs found"}
            </Typography>
          ) : (
            <Grid2
              container
              rowSpacing={"28px"}
              columnSpacing={"20px"}
              columns={{ xs: 4, md: 8, xl: 12 }}
            >
              {data.map((job) => (
                <Grid2 xs={4} key={job.id}>
                  <JobCard key={job.title} data={job} projects={projects} />
                </Grid2>
              ))}
            </Grid2>
          )}
        </Stack>
      )}
    </>
  );
};

export default JobsOverview;
