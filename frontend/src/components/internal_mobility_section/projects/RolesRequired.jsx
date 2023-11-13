import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import leftArrow from "../../../assets/arrow_left_icon.svg";
import mailIcon from "../../../assets/mail_icon.svg";
import dateIcon from "../../../assets/date_icon.svg";
import hoursIcon from "../../../assets/hours_icon.svg";
import dollarIcon from "../../../assets/dollar_icon.svg";
import menuIcon from "../../../assets/description_menu_icon.svg";
import {
  ADMIN_PROJECT_DETAILS_ROUTE,
  EMPLOYEE_PROJECT_DETAILS_ROUTE,
  MANAGER_PROJECT_DETAILS_ROUTE,
} from "../../../routes/paths";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../../../data/jobsData";
import { skillsTable } from "../../../data/skillsData";
import SkillRow from "../jobs/SkillRow";
import EmployeeCard from "../jobs/EmployeeCard";
import JobCard from "../jobs/JobCard";
import { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";

const boxStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const RolesRequired = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { id, roleId } = useParams();
  const { projects, projectsLoading } = useSelector(
    (state) => state.addProjectForm
  );
  const project = projects?.filter((project) => project.id == id)[0];
  const role = projects
    ?.filter((project) => project.id == id)[0]
    ?.roles?.filter((role) => role.id == roleId)[0];
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [recommendationsData, setRecommendationsData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const fetchRecommendationsData = useCallback(
    async (token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: "role_candidate",
          value: roleId,
        },
      };

      try {
        // setRecommendationsDataLoading(true);
        const response = await axiosInstance.get(`recommendations`, config);
        console.log(response.data);
        setRecommendationsData(response.data.payload);
      } catch (error) {
        console.log(error?.response.data);
      } finally {
        // setRecommendationsDataLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    dispatch(fetchProjects());
    if (currentFlow !== "employee") {
      fetchRecommendationsData(token);
    }
  }, [dispatch]);

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const initialJobsToDisplay = lgMatches ? 2 : 1;

  const goBackToPreviousPage = () => {
    if (currentFlow === "manager") {
      navigate(`${MANAGER_PROJECT_DETAILS_ROUTE}/${project.id}`);
    } else if (currentFlow === "employee") {
      navigate(`${EMPLOYEE_PROJECT_DETAILS_ROUTE}/${project.id}`);
    } else {
      navigate(`${ADMIN_PROJECT_DETAILS_ROUTE}/${project.id}`);
    }
  };

  return (
    <>
      {projectsLoading && <CircularProgress />}
      {!projectsLoading && (
        <Stack sx={{ gap: 3 }}>
          {currentFlow === "employee" ? (
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
                  {role?.title}
                </Typography>
              </Box>

              <Link to={`mailto:${project?.email}`}>
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
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton onClick={goBackToPreviousPage}>
                <img src={leftArrow} alt="Return back icon" />
              </IconButton>

              <Typography
                variant="h2"
                color="#173433"
                textTransform="capitalize"
              >
                {role?.title}
              </Typography>
            </Box>
          )}

          {currentFlow === "employee" && (
            <Link
              // to={"/"}
              style={{
                textDecoration: "underline",
                color: "#0C1716",
                marginLeft: "56px",
                marginTop: "-24px",
              }}
            >
              <Typography variant="body1" textTransform="capitalize">
                {project?.name}
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
                    {role?.title}
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
                    Start Date: {role?.start_date}
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
                    End Date: {role?.end_date}
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
                    Hours: {role?.hours}
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
                    Salary: USD ${role?.salary}
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
                {role?.description}
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
              Skills required
            </Typography>

            <Box
              className="tableContent__section"
              sx={{
                maxHeight: { xs: "200px", sm: "230px", lg: "250px" },
                overflowY: "auto",
                pr: 2,
              }}
            >
              {role?.skills?.map((skill) => (
                <SkillRow skill={skill} key={skill.id} />
              ))}
            </Box>
          </Stack>

          {currentFlow !== "employee" && (
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

              {recommendationsData?.role_based?.length < 1 ? (
                <Typography variant="h3" color="primary" mb={3.125}>
                  No matches found
                </Typography>
              ) : (
                <Grid2
                  container
                  rowSpacing={"28px"}
                  columnSpacing={"20px"}
                  columns={{ xs: 4, lg: 8 }}
                >
                  {showMore
                    ? recommendationsData?.role_based?.map((job) => (
                        <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
                          <EmployeeCard data={job} />
                        </Grid2>
                      ))
                    : recommendationsData?.role_based
                        ?.slice(0, initialJobsToDisplay)
                        .map((job) => (
                          <Grid2
                            xs={4}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                            key={job.id}
                          >
                            <EmployeeCard data={job} />
                          </Grid2>
                        ))}
                </Grid2>
              )}

              {recommendationsData?.role_based?.length >
                initialJobsToDisplay && (
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
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less..." : "Show more..."}
                </Button>
              )}
            </Stack>
          )}

          {/* {currentFlow === "employee" && (
            <>
              <Typography variant="h5" color="#707070" fontSize="18px">
                Additional matches based on your current profile
              </Typography>

              <Stack sx={{ gap: "20px" }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  {showMore
                    ? jobs.map((job) => <JobCard data={job} key={job.id} />)
                    : jobs
                        .slice(0, initialJobsToDisplay)
                        .map((job) => <JobCard data={job} key={job.id} />)}
                </Stack>

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
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less..." : "Show more..."}
                </Button>
              </Stack>
            </>
          )} */}
        </Stack>
      )}
    </>
  );
};

export default RolesRequired;
