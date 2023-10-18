import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import fourSquare from "../../../assets/fourSquare_icon.svg";
import menu from "../../../assets/menu_icon.svg";
import filter from "../../../assets/filter.svg";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import {
  ADMIN_NEW_JOB_ROUTE,
  ADMIN_NEW_PROJECT_ROUTE,
  EMPLOYEE_NEW_JOB_ROUTE,
  EMPLOYEE_NEW_PROJECT_ROUTE,
  MANAGER_NEW_JOB_ROUTE,
  MANAGER_NEW_PROJECT_ROUTE,
} from "../../../routes/paths";
import { Link } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import AddJobForm from "./AddJobForm";
import { fetchJobs } from "../../../redux/slices/internalMobility/addJobFormSlice";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import AddProjectForm from "../projects/AddProjectForm";
import { setOpenProjectSnack } from "../../../redux/slices/internalMobility/addProjectFormSlice";

const Jobs = ({ projects = false }) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("allItems");
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const { jobs, loading } = useSelector((state) => state.addJobForm);
  const {
    projects: projectsData,
    projectsLoading,
    openSnack: openProjectSnack,
    response: projectResponse,
  } = useSelector((state) => state.addProjectForm);
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

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const initialJobsToDisplay = lgMatches ? 3 : 2;

  const newJobLink =
    currentFlow === "employee"
      ? projects
        ? EMPLOYEE_NEW_PROJECT_ROUTE
        : EMPLOYEE_NEW_JOB_ROUTE
      : currentFlow === "manager"
      ? projects
        ? MANAGER_NEW_PROJECT_ROUTE
        : MANAGER_NEW_JOB_ROUTE
      : currentFlow === "admin"
      ? projects
        ? ADMIN_NEW_PROJECT_ROUTE
        : ADMIN_NEW_JOB_ROUTE
      : "/"; // Default URL or handle other cases here

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.name);
    handleMenuClose();
  };

  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const [clickedJobId, setClickedJobId] = useState(null);
  const getClickedJobId = (value) => {
    setClickedJobId(value);
  };

  // Snackbar handlers
  const [openSnack, setOpenSnack] = useState(false);
  const [response, setResponse] = useState(null);

  const handleClickSnack = (response) => {
    setResponse(response);
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
        open={projects ? openProjectSnack : openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={
          projects
            ? () => dispatch(setOpenProjectSnack(false))
            : handleCloseSnack
        }
      >
        <Alert
          onClose={
            projects
              ? () => dispatch(setOpenProjectSnack(false))
              : handleCloseSnack
          }
          severity={
            projects
              ? projectResponse?.success
                ? "success"
                : "error"
              : response?.success
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {projects ? projectResponse?.message : response?.message}
        </Alert>
      </Snackbar>

      {editOpen ? (
        <>
          {projects ? (
            <AddProjectForm
              onEdit={editOpen}
              handleEditClose={handleEditClose}
              data={data}
              id={clickedJobId}
            />
          ) : (
            <AddJobForm
              onEdit={editOpen}
              handleEditClose={handleEditClose}
              data={data}
              id={clickedJobId}
              onSuccess={handleClickSnack}
            />
          )}
        </>
      ) : (
        <>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "25px",
              borderBottom: currentFlow !== "employee" && "2px solid #e9e9e9",
              mb: currentFlow !== "employee" && 3,
            }}
          >
            {currentFlow !== "employee" && (
              <Stack sx={{ flexDirection: "row", gap: "12px" }}>
                <Typography variant="h3" color="darkGreen">
                  108
                </Typography>

                <Typography variant="h4" color="darkGreen">
                  Total {projects ? "Projects" : "Jobs"}
                </Typography>
              </Stack>
            )}

            {currentFlow === "employee" && (
              <Typography variant="h2" sx={{ mb: { xs: 2, md: 0 } }}>
                {projects ? "Projects" : "Jobs"}
              </Typography>
            )}

            {mdMatches && (
              <Stack sx={{ flexDirection: "row" }}>
                <IconButton>
                  <img src={fourSquare} alt="Four square icon" />
                </IconButton>

                <IconButton>
                  <img src={menu} alt="Menu icon" />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {currentFlow === "admin" && (
            <>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h2">
                  {projects ? "Projects" : "Jobs"}
                </Typography>

                <Button
                  onClick={handleMenuOpen}
                  sx={{
                    alignSelf: "center",
                    textTransform: "none",
                    border: "2px solid #e9e9e9 ",
                    borderRadius: "4px",
                    color: "primary.main",
                    fontWeight: "400",
                    px: 3,
                    "&: hover": {
                      border: "2px solid #e9e9e9 ",
                    },
                  }}
                  disableElevation
                  disableRipple
                  startIcon={<img src={filter} alt="Filter icon" />}
                  variant="outlined"
                  aria-controls="filter-menu"
                  aria-haspopup="true"
                >
                  {selectedFilter === "allItems" ? "All items" : selectedFilter}
                </Button>
              </Stack>

              <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  style: {
                    width: "210px",
                  },
                }}
              >
                <FormGroup>
                  <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFilter === "allItems"}
                          onChange={handleFilterChange}
                          name="allItems"
                        />
                      }
                      label="All items"
                    />
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFilter === "Pending"}
                          onChange={handleFilterChange}
                          name="Pending"
                        />
                      }
                      label="Pending"
                    />
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFilter === "Approved"}
                          onChange={handleFilterChange}
                          name="Approved"
                        />
                      }
                      label="Approved"
                    />
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFilter === "Declined"}
                          onChange={handleFilterChange}
                          name="Declined"
                        />
                      }
                      label="Declined"
                    />
                  </MenuItem>
                </FormGroup>
              </Menu>
            </>
          )}

          {currentFlow === "manager" && (
            <Stack
              sx={{
                flexDirection: { sm: "row" },
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography variant="h2" sx={{ mb: { xs: 2, md: 0 } }}>
                {projects ? "Projects" : "Jobs"}
              </Typography>

              <Link to={newJobLink}>
                <Button
                  sx={{
                    width: "220px",
                    background: (theme) => theme.palette.accent,
                  }}
                >
                  <Typography variant="h6" textTransform="none">
                    Post New {projects ? "Project" : "Job"}
                  </Typography>

                  <AddIcon />
                </Button>
              </Link>
            </Stack>
          )}

          {currentFlow === "employee" && (
            <Typography variant="h5" color="#707070" sx={{ mb: 3 }}>
              Matches based on your current profile
            </Typography>
          )}

          {dataLoading && <CircularProgress size={20} />}
          {!dataLoading && (
            <Stack sx={{ gap: "20px", mb: 3 }}>
              {data.length < 1 ? (
                <Typography variant="h3" color="primary" mb={3.125}>
                  No jobs found
                </Typography>
              ) : (
                <>
                  <Grid2
                    container
                    rowSpacing={"28px"}
                    columnSpacing={"20px"}
                    columns={{ xs: 4, md: 8, xl: 12 }}
                  >
                    {currentFlow === "employee"
                      ? showMore1
                        ? data.map((job) => (
                            <Grid2 xs={4} key={job.id}>
                              <JobCard
                                key={job.id}
                                data={job}
                                projects={projects}
                                handleEditOpen={handleEditOpen}
                                getClickedJobId={getClickedJobId}
                                onSuccess={handleClickSnack}
                              />
                            </Grid2>
                          ))
                        : data.slice(0, initialJobsToDisplay).map((job) => (
                            <Grid2 xs={4} key={job.id}>
                              <JobCard
                                key={job.id}
                                data={job}
                                projects={projects}
                                handleEditOpen={handleEditOpen}
                                getClickedJobId={getClickedJobId}
                                onSuccess={handleClickSnack}
                              />
                            </Grid2>
                          ))
                      : data.map((job) => (
                          <Grid2 xs={4} key={job.id}>
                            <JobCard
                              key={job.title}
                              data={job}
                              projects={projects}
                              handleEditOpen={handleEditOpen}
                              getClickedJobId={getClickedJobId}
                              onSuccess={handleClickSnack}
                            />
                          </Grid2>
                        ))}
                  </Grid2>

                  {currentFlow === "employee" && jobs?.length >= 1 && (
                    <Button
                      disableRipple={true}
                      variant="text"
                      sx={{
                        color: "#66C1FF",
                        alignSelf: "flex-start",
                        textTransform: "capitalize",
                        fontWeight: "400",
                        lineHeight: "1.5",
                        "&: hover": {
                          backgroundColor: "transparent",
                        },
                        fontSize: { xs: "12px", md: "16px" },
                        mt: { xs: -1 },
                      }}
                      onClick={() => setShowMore1(!showMore1)}
                    >
                      {showMore1 ? "Show less..." : "Show more..."}
                    </Button>
                  )}
                </>
              )}
            </Stack>
          )}

          {currentFlow === "employee" && (
            <>
              <Typography variant="h5" color="#707070" sx={{ mb: 3 }}>
                Matches based on your career path
              </Typography>

              <Stack sx={{ gap: "20px" }}>
                <Grid2
                  container
                  rowSpacing={"28px"}
                  columnSpacing={"20px"}
                  columns={{ xs: 4, md: 8, xl: 12 }}
                >
                  {currentFlow === "employee"
                    ? showMore2
                      ? data.map((job) => (
                          <Grid2 xs={4} key={job.id}>
                            <JobCard
                              key={job.id}
                              data={job}
                              projects={projects}
                              handleEditOpen={handleEditOpen}
                              getClickedJobId={getClickedJobId}
                              onSuccess={handleClickSnack}
                            />
                          </Grid2>
                        ))
                      : data.slice(0, initialJobsToDisplay).map((job) => (
                          <Grid2 xs={4} key={job.id}>
                            <JobCard
                              key={job.id}
                              data={job}
                              projects={projects}
                              handleEditOpen={handleEditOpen}
                              getClickedJobId={getClickedJobId}
                              onSuccess={handleClickSnack}
                            />
                          </Grid2>
                        ))
                    : data.map((job) => (
                        <Grid2 xs={4} key={job.id}>
                          <JobCard
                            key={job.title}
                            data={job}
                            projects={projects}
                            handleEditOpen={handleEditOpen}
                            getClickedJobId={getClickedJobId}
                            onSuccess={handleClickSnack}
                          />
                        </Grid2>
                      ))}
                </Grid2>

                {currentFlow === "employee" && jobs?.length >= 1 && (
                  <Button
                    disableRipple={true}
                    variant="text"
                    sx={{
                      color: "#66C1FF",
                      alignSelf: "flex-start",
                      textTransform: "capitalize",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      "&: hover": {
                        backgroundColor: "transparent",
                      },
                      fontSize: { xs: "12px", md: "16px" },
                      mt: { xs: -1 },
                    }}
                    onClick={() => setShowMore2(!showMore2)}
                  >
                    {showMore2 ? "Show less..." : "Show more..."}
                  </Button>
                )}
              </Stack>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Jobs;
