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
import { Link, useNavigate } from "react-router-dom";
import { jobs } from "../../../data/jobsData";
import RatingBar from "../../RatingBar";
import { skillsTable } from "../../../data/skillsData";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import {
  setOpenProjectSnack,
  setProjectFormInfo,
  setProjectResponse,
} from "../../../redux/slices/internalMobility/addProjectFormSlice";

const boxStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

function isDateValid(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

const ProjectOverview = () => {
  //   const [hoveredRoles, setHoveredRoles] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const detailsRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { name, department, startDate, endDate, description, roles } =
    useSelector((state) => state.addProjectForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      // setLoading(true);
      const response = await axiosInstance.post(
        `project_vacancy`,
        {
          name,
          department,
          start_date: isDateValid(startDate) ? startDate : null,
          end_date: isDateValid(endDate) ? endDate : null,
          description,
          roles,
        },
        config
      );
      console.log(response.data);
      dispatch(setOpenProjectSnack(true));
      dispatch(setProjectResponse(response.data));
    } catch (error) {
      dispatch(setOpenProjectSnack(true));
      dispatch(setProjectResponse(error?.response.data));
      console.log(error?.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchProjects());
      dispatch(
        setProjectFormInfo({
          name: "",
          department: "",
          startDate: null,
          endDate: null,
          description: "",
          roles: "",
          role: "",
          roleStartDate: null,
          roleEndDate: null,
          hours: "",
          salary: "",
          roleDescription: "",
        })
      );
      navigate(projectsLink);
    }
  }, [token]);

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
        {name}
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
                Start Date: {isDateValid(startDate) ? startDate : ""}
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
                End Date: {isDateValid(endDate) ? endDate : ""}
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
        {roles?.length >= 1 &&
          roles?.map((role) => (
            <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={role.id}>
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
                        Hours: {selectedRole.hours}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img src={dateIcon} alt="Date icon" />

                      <Typography variant="h5" color="#AAAAAA">
                        Start date: {selectedRole.start_date}
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
                      {role.skills?.map((skill) => (
                        <Box
                          key={skill.title}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h5"
                            color="#737373"
                            title={skill.title}
                            sx={{
                              textTransform: "capitalize",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "60%",
                            }}
                          >
                            {skill.title}
                          </Typography>

                          <Tooltip
                            title={
                              <>
                                <div style={{ textAlign: "center" }}>
                                  Proficiency needed
                                </div>
                                <RatingBar
                                  initialValue={skill.level}
                                  requiredLevel={skill.level}
                                />
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
                              <RatingBar
                                initialValue={skill.level}
                                requiredLevel={skill.level}
                              />
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
                    title={role.title}
                    sx={{
                      fontSize: "18px",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "80%",
                    }}
                  >
                    {role.title}
                  </Typography>

                  <IconButton
                    //   onMouseEnter={() => handleMouseEnter(role.title)}
                    //   onMouseLeave={() => handleMouseLeave(role.title)}
                    onClick={() => openDetails(role)}
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
        <Button
          onClick={sendData}
          sx={{
            width: { xs: "100%", sm: "190px" },
            background: (theme) => theme.palette.accent,
          }}
        >
          <Typography variant="h6" textTransform="none" py={0.5}>
            Submit for approval
          </Typography>
        </Button>

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
