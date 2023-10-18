import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import editIcon from "../../../assets/edit_icon.svg";
import leftArrow from "../../../assets/arrow_left_icon.svg";
import mailIcon from "../../../assets/mail_icon.svg";
import dateIcon from "../../../assets/date_icon.svg";
import hoursIcon from "../../../assets/hours_icon.svg";
import dollarIcon from "../../../assets/dollar_icon.svg";
import menuIcon from "../../../assets/description_menu_icon.svg";
import {
  EMPLOYEE_JOBS_ROUTE,
  EMPLOYEE_PROJECTS_ROUTE,
} from "../../../routes/paths";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../../../data/jobsData";
import { skillsTable } from "../../../data/skillsData";
import SkillRow from "./SkillRow";
import EmployeeCard from "./EmployeeCard";
import JobCard from "./JobCard";
import { useCallback, useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";

const boxStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const JobDetails = ({ projects = false }) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { id } = useParams();
  const job = jobs.filter((job) => job.id == id)[0];
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const [fetchedData, setFetchedData] = useState([]);
  const jobDetails = fetchedData?.filter((job) => job.id == id)[0];

  const fetchData = useCallback(
    async (token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        setLoading(true);
        const response = await axiosInstance.get(`job_vacancy`, config);
        console.log(response.data);
        setFetchedData(response.data.payload);
      } catch (error) {
        console.log(error?.response.data);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchData(token);
  }, [token, fetchData]);

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const initialJobsToDisplay1 = lgMatches ? 3 : 1;
  const initialJobsToDisplay2 = lgMatches ? 2 : 1;

  const goBackToPreviousPage = () => {
    if (projects) {
      navigate(EMPLOYEE_PROJECTS_ROUTE);
    } else {
      navigate(EMPLOYEE_JOBS_ROUTE);
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      {loading && <CircularProgress size={20} />}
      {!loading && (
        <Stack sx={{ gap: 3 }}>
          {currentFlow === "admin" && (
            <Stack
              sx={{
                flexDirection: { md: "row" },
                alignItems: { md: "center" },
                gap: 3,
              }}
            >
              <Typography
                variant="h2"
                color="#173433"
                textTransform="capitalize"
              >
                {jobDetails?.role?.title}
              </Typography>

              <Box
                sx={{
                  width: "138px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  background: "#E5F3FC",
                  borderRadius: "40px",
                  textTransform: "capitalize",
                }}
              >
                <Typography variant="h6" color="#788894">
                  {jobDetails?.status}
                </Typography>

                <IconButton onClick={handleMenuOpen}>
                  <ExpandMoreIcon
                    sx={{
                      color: "primary",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  />
                </IconButton>
              </Box>

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
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
                    width: "155px",
                  },
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{
                    fontSize: "16px",
                    color: "#788894",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Approve
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{
                    fontSize: "16px",
                    color: "#788894",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Decline
                </MenuItem>
              </Menu>
            </Stack>
          )}

          {currentFlow === "manager" && (
            <Stack
              sx={{
                flexDirection: { md: "row" },
                justifyContent: "space-between",
                alignItems: { md: "center" },
                gap: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="h2"
                  color="#173433"
                  textTransform="capitalize"
                >
                  {jobDetails?.role?.title}
                </Typography>

                {mdMatches && (
                  <IconButton>
                    <img src={editIcon} alt="Edit icon" />
                  </IconButton>
                )}
              </Box>

              <Box
                sx={{
                  width: "114.455px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#E5F3FC",
                  borderRadius: "40px",
                  textTransform: "capitalize",
                }}
              >
                <Typography variant="h6" color="#788894">
                  {jobDetails?.status}
                </Typography>
              </Box>
            </Stack>
          )}

          {currentFlow === "employee" && (
            <Stack
              sx={{
                flexDirection: { md: "row" },
                justifyContent: "space-between",
                alignItems: { md: "center" },
                gap: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton onClick={goBackToPreviousPage}>
                  <img src={leftArrow} alt="Return back icon" />
                </IconButton>

                <Typography
                  variant="h2"
                  color="#173433"
                  textTransform="capitalize"
                >
                  {jobDetails?.role?.title}
                </Typography>
              </Box>

              <Link to={"/"}>
                <Button
                  sx={{
                    width: { xs: "100%", sm: "220px" },
                    background: (theme) => theme.palette.accent,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="darkGreen"
                    textTransform="none"
                    py={0.5}
                  >
                    Apply Now
                  </Typography>
                </Button>
              </Link>
            </Stack>
          )}

          {currentFlow === "employee" && projects && (
            <Link
              to={"/"}
              style={{
                textDecoration: "underline",
                color: "#0C1716",
                marginLeft: "56px",
                marginTop: "-24px",
              }}
            >
              <Typography variant="body1" textTransform="none">
                Insurance Web and App
              </Typography>
            </Link>
          )}

          <Stack
            sx={{
              background: "#FAFAFA",
              border: "2px solid #EEEEEE",
              borderRadius: "10px",
              gap: "20px",
              p: { xs: "12px", lg: "20px" },
            }}
          >
            <Typography variant="h3" color="#173433">
              Details
            </Typography>

            <Grid container spacing="20px" columns={12}>
              <Grid item xs={12} md={12}>
                <Box sx={boxStyles}>
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={mailIcon}
                    alt="Mail icon"
                  />

                  <Typography
                    variant="body1"
                    color="#788894"
                    textTransform="capitalize"
                  >
                    {jobDetails?.department}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={boxStyles}>
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={dateIcon}
                    alt="Date icon"
                  />

                  <Typography
                    variant="body1"
                    color="#788894"
                    textTransform="capitalize"
                  >
                    Start Date: {jobDetails?.role?.start_date}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={boxStyles}>
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={dateIcon}
                    alt="Date icon"
                  />

                  <Typography
                    variant="body1"
                    color="#788894"
                    textTransform="capitalize"
                  >
                    End Date: {jobDetails?.role?.end_date}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={boxStyles}>
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={hoursIcon}
                    alt="Hours icon"
                  />

                  <Typography
                    variant="body1"
                    color="#788894"
                    textTransform="capitalize"
                  >
                    Hours: {jobDetails?.role?.hours}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={boxStyles}>
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={dollarIcon}
                    alt="Dollar icon"
                  />

                  <Typography
                    variant="body1"
                    color="#788894"
                    textTransform="capitalize"
                  >
                    Salary: USD ${jobDetails?.role?.salary}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Stack>

          <Stack
            sx={{
              background: "#FAFAFA",
              border: "2px solid #EEEEEE",
              borderRadius: "10px",
              gap: "20px",
              p: { xs: "12px", lg: "20px" },
            }}
          >
            <Typography variant="h3" color="#173433">
              Description
            </Typography>

            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <img src={menuIcon} alt="Description Menu icon" />

              <Typography variant="body1" color="#788894" mt={1}>
                Description:
                <br />
                {jobDetails?.role?.description}
              </Typography>
            </Box>
          </Stack>

          <Stack
            sx={{
              background: "#FAFAFA",
              border: "2px solid #EEEEEE",
              borderRadius: "10px",
              gap: "20px",
              p: { xs: "12px", lg: "20px" },
            }}
          >
            <Typography variant="h3" color="#173433">
              Skills Required
            </Typography>

            <Box
              className="tableContent__section"
              sx={{
                maxHeight: { xs: "200px", sm: "230px", lg: "250px" },
                overflowY: "auto",
                pr: 2,
              }}
            >
              {jobDetails?.role?.skills?.length < 1 ? (
                <Typography color="primary" fontSize="16px" mb={3.125}>
                  No skills found
                </Typography>
              ) : (
                <>
                  {jobDetails?.role?.skills?.map((skill) => (
                    <SkillRow skill={skill} key={skill.id} />
                  ))}
                </>
              )}
            </Box>
          </Stack>

          {currentFlow === "manager" && (
            <Stack
              sx={{
                background: "#FAFAFA",
                border: "2px solid #EEEEEE",
                borderRadius: "10px",
                gap: "20px",
                p: { xs: "12px", lg: "20px" },
              }}
            >
              <Typography variant="h3" color="#173433">
                Matches -{" "}
                <span style={{ fontWeight: 400 }}>
                  here are the possible matches for your job posted
                </span>
              </Typography>

              <Grid2
                container
                rowSpacing={"28px"}
                columnSpacing={"20px"}
                columns={{ xs: 4, lg: 8 }}
              >
                {showMore1
                  ? jobs.map((job) => (
                      <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
                        <EmployeeCard data={job} />
                      </Grid2>
                    ))
                  : jobs.slice(0, initialJobsToDisplay2).map((job) => (
                      <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
                        <EmployeeCard data={job} />
                      </Grid2>
                    ))}
              </Grid2>

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
            </Stack>
          )}

          {currentFlow === "employee" && (
            <>
              <Typography variant="h5" color="#707070" fontSize="18px">
                Additional matches based on your current profile
              </Typography>

              <Stack sx={{ gap: "20px" }}>
                <Grid2
                  container
                  rowSpacing={"28px"}
                  columnSpacing={"20px"}
                  columns={{ xs: 4, md: 8, xl: 12 }}
                >
                  {showMore2
                    ? jobs.map((job) => (
                        <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
                          <JobCard data={job} />
                        </Grid2>
                      ))
                    : jobs.slice(0, initialJobsToDisplay1).map((job) => (
                        <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
                          <JobCard data={job} />
                        </Grid2>
                      ))}
                </Grid2>

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
              </Stack>
            </>
          )}
        </Stack>
      )}
    </>
  );
};

export default JobDetails;
