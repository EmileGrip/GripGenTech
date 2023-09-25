import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import mailIcon from "../../../assets/mail_icon.svg";
import dateIcon from "../../../assets/date_icon.svg";
import menuIcon from "../../../assets/description_menu_icon.svg";
import hoursIcon from "../../../assets/hours_icon.svg";
import dollarIcon from "../../../assets/dollar_icon.svg";
import {
  ADMIN_NEW_PROJECT_ROUTE,
  ADMIN_PROJECTS_ROUTE,
  EMPLOYEE_NEW_PROJECT_ROUTE,
  EMPLOYEE_PROJECTS_ROUTE,
  MANAGER_NEW_PROJECT_ROUTE,
  MANAGER_PROJECTS_ROUTE,
} from "../../../routes/paths";
import { Link } from "react-router-dom";
import { jobs } from "../../../data/jobsData";
import RatingBar from "../../RatingBar";
import { skillsTable } from "../../../data/skillsData";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";

const boxStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const ProjectOverview = () => {
  //   const [hoveredRoles, setHoveredRoles] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const detailsRef = useRef(null);
  const {
    name,
    department,
    startDate,
    endDate,
    description,
    role,
    roleStartDate,
    roleEndDate,
    hours,
    salary,
    roleDescription,
  } = useSelector((state) => state.addProjectForm);

  useEffect(() => {
    // Add an event listener to close details when clicking outside.
    function handleClickOutside(event) {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        closeDetails();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openDetails = (service) => {
    setShowDetails(true);
    setSelectedRole(service);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedRole(null);
  };

  //   const handleMouseEnter = (title) => {
  //     setHoveredRoles((prevState) => ({
  //       ...prevState,
  //       [title]: true,
  //     }));
  //   };

  //   const handleMouseLeave = (title) => {
  //     setHoveredRoles((prevState) => ({
  //       ...prevState,
  //       [title]: false,
  //     }));
  //   };

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const newProjectLink =
    currentFlow === "employee"
      ? EMPLOYEE_NEW_PROJECT_ROUTE
      : currentFlow === "manager"
      ? MANAGER_NEW_PROJECT_ROUTE
      : currentFlow === "admin"
      ? ADMIN_NEW_PROJECT_ROUTE
      : "/"; // Default URL or handle other cases here

  const projectsLink =
    currentFlow === "employee"
      ? EMPLOYEE_PROJECTS_ROUTE
      : currentFlow === "manager"
      ? MANAGER_PROJECTS_ROUTE
      : currentFlow === "admin"
      ? ADMIN_PROJECTS_ROUTE
      : "/"; // Default URL or handle other cases here

  return (
    <Stack sx={{ position: "relative", gap: 3 }}>
      <Typography variant="h2" color="#173433" textTransform="capitalize">
        Insurance Website and App
      </Typography>

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
                {name}
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
                Start Date: {startDate}
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
                End Date: {endDate}
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
            {description}
          </Typography>
        </Box>
      </Stack>

      <Typography variant="h2" color="#173433">
        Roles
      </Typography>

      <Grid2
        container
        rowSpacing={"28px"}
        columnSpacing={"20px"}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 16 }}
      >
        {jobs.length >= 1 &&
          jobs.map((job) => (
            <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
              <Box>
                {showDetails && selectedRole && (
                  <Stack
                    ref={detailsRef}
                    sx={{
                      width: { xs: "100%", sm: "420px" },
                      height: "270px",
                      background: "#F5F5F5",
                      borderRadius: "10px",
                      position: "absolute",
                      bottom: "195px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      p: 2,
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img src={hoursIcon} alt="Hours icon" />

                      <Typography
                        variant="h5"
                        color="#AAAAAA"
                        textTransform="capitalize"
                      >
                        Hours: {selectedRole.kind}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img src={dateIcon} alt="Date icon" />

                      <Typography variant="h5" color="#AAAAAA">
                        Start date: {selectedRole.startDate}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img src={dollarIcon} alt="Dollar icon" />

                      <Typography variant="h5" color="#AAAAAA">
                        USD ${selectedRole.salary}
                      </Typography>
                    </Box>

                    <Box
                      className="tableContent__section"
                      sx={{
                        height: { xs: "200px", sm: "230px", lg: "250px" },
                        overflowY: "auto",
                        pr: 2,
                      }}
                    >
                      {skillsTable.map((skill) => (
                        <Box
                          key={skill.skillName}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h5"
                            color="#737373"
                            title={skill.skillName}
                            sx={{
                              textTransform: "capitalize",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "60%",
                            }}
                          >
                            {skill.skillName}
                          </Typography>

                          <Tooltip
                            title={
                              <>
                                <div style={{ textAlign: "center" }}>
                                  Proficiency needed
                                </div>
                                <RatingBar initialValue={skill.status} />
                              </>
                            }
                            placement="top-start"
                            followCursor
                          >
                            <span
                              style={{
                                marginTop: "7px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                              }}
                            >
                              <RatingBar initialValue={skill.currentProf} />
                            </span>
                          </Tooltip>
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                )}

                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#FAFAFA",
                    border: "2px solid #EEEEEE",
                    borderRadius: "10px",
                    height: "50px",
                    py: "12px",
                    px: "20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="darkGreen"
                    title={job.title}
                    sx={{
                      fontSize: "18px",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "80%",
                    }}
                  >
                    {job.title}
                  </Typography>

                  <IconButton
                    //   onMouseEnter={() => handleMouseEnter(job.title)}
                    //   onMouseLeave={() => handleMouseLeave(job.title)}
                    onClick={() => openDetails(job)}
                  >
                    <ExpandLessIcon sx={{ color: "#788894" }} />
                  </IconButton>
                </Stack>
              </Box>
            </Grid2>
          ))}
      </Grid2>

      <Divider sx={{ borderBottom: "2px solid #EEEEEE" }} />

      <Stack sx={{ flexDirection: { sm: "row" }, gap: { xs: 2, sm: 4 } }}>
        <Link to={projectsLink}>
          <Button
            sx={{
              width: { xs: "100%", sm: "190px" },
              background: (theme) => theme.palette.accent,
            }}
          >
            <Typography variant="h6" textTransform="none" py={0.5}>
              Submit for approval
            </Typography>
          </Button>
        </Link>

        <Link to={newProjectLink}>
          <Button
            sx={{
              width: { xs: "100%", sm: "190px" },
              border: "1px solid #788894",
            }}
          >
            <Typography
              variant="h6"
              textTransform="none"
              color="#788894"
              py={0.5}
            >
              Edit
            </Typography>
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default ProjectOverview;
