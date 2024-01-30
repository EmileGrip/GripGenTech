import { Box, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import course0 from "../../../assets/course0.png";
import course1 from "../../../assets/course1.png";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";
import { fetchSkillsData } from "../../../redux/slices/Employee/mySkills/mySkillsActions";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { setOpenMain, setOpenSub } from "../../../redux/slices/sideBarSlice";
import ProfileInfo from "./ProfileInfo";
import SkillsSection from "./SkillsSection";
import CoursesSection from "./CoursesSection";
import ProjectsSection from "./ProjectsSection";
import JobsSection from "./JobsSection";
import axiosInstance from "../../../helper/axiosInstance";

const courses = [
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    status: "finished",
    price: 80,
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    status: "in progress",
    price: 100,
  },
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    status: "finished",
    price: 80,
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    status: "finished",
    price: 100,
  },
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    status: "finished",
    price: 80,
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    status: "finished",
    price: 100,
  },
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    status: "finished",
    price: 80,
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    status: "finished",
    price: 100,
  },
];

const HomePage = () => {
  const location = useLocation();
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle(location.pathname.split("/").at(-1));
  }, [setTitle, location]);

  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const xlMatches = useMediaQuery(theme.breakpoints.up("xl"));
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [girdRowValue1, setGirdRowValue1] = useState("1/3");
  const [girdRowValue2, setGirdRowValue2] = useState("1/3");
  const [girdRowValue3, setGirdRowValue3] = useState("1/3");
  const [projectsData, setProjectsData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const { token, userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const { skills, skillsDataLoading } = useSelector((state) => state.mySkills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserById(userInfo.id));
      dispatch(fetchSkillsData(userInfo.id));
      fetchRecommendationsData(token, "project");
      fetchRecommendationsData(token, "job");
    }
  }, [token, dispatch]);

  const fetchRecommendationsData = useCallback(
    async (token, value) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: "vacancy",
          value,
        },
      };

      try {
        const response = await axiosInstance.get(`recommendations`, config);
        console.log(response.data);
        if (value === "project") {
          setProjectsData(response.data.payload);
        } else {
          setJobsData(response.data.payload);
        }
      } catch (error) {
        console.log(error?.response.data);
      }
    },
    [token]
  );

  const handleNavigation = (activeMain, activeSub, path) => {
    dispatch(setOpenMain(activeMain));
    dispatch(setOpenSub(activeSub));
    navigate(path);
  };

  const sortedSkills = skills
    .slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  const handleClick = (id) => {
    if (expandedComponent === id) {
      return setExpandedComponent(null);
    } else {
      if (id === 1) {
        setGirdRowValue2("1/2");
        setGirdRowValue3("2/3");
      } else if (id === 2) {
        setGirdRowValue1("1/2");
        setGirdRowValue3("2/3");
      } else if (id === 3) {
        setGirdRowValue1("1/2");
        setGirdRowValue2("2/3");
      }
    }

    setExpandedComponent(id);
  };

  const startedCourses = xlMatches ? courses.slice(0, 3) : courses.slice(0, 2);
  const coursesData = xlMatches ? courses.slice(0, 4) : courses.slice(0, 3);

  return (
    <>
      <Grid container spacing="20px">
        <Grid item xs={12} lg={4}>
          <ProfileInfo user={user} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <SkillsSection
            skillsDataLoading={skillsDataLoading}
            sortedSkills={sortedSkills}
            handleNavigation={handleNavigation}
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: lgMatches
                ? `repeat(${expandedComponent === null ? 3 : 4}, 1fr)`
                : `repeat(1, 1fr)`,
              gridTemplateRows: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {lgMatches ? (
              <>
                <CoursesSection
                  expandedComponent={expandedComponent}
                  girdRowValue1={girdRowValue1}
                  handleClick={handleClick}
                  handleNavigation={handleNavigation}
                  startedCourses={startedCourses}
                  coursesData={coursesData}
                />

                <ProjectsSection
                  expandedComponent={expandedComponent}
                  girdRowValue2={girdRowValue2}
                  handleClick={handleClick}
                  handleNavigation={handleNavigation}
                  projectsData={projectsData}
                />

                <JobsSection
                  expandedComponent={expandedComponent}
                  girdRowValue3={girdRowValue3}
                  handleClick={handleClick}
                  handleNavigation={handleNavigation}
                  jobsData={jobsData}
                />
              </>
            ) : (
              <Stack gap="20px">
                <CoursesSection
                  expandedComponent={expandedComponent}
                  girdRowValue1={girdRowValue1}
                  handleClick={handleClick}
                  handleNavigation={handleNavigation}
                  startedCourses={startedCourses}
                  coursesData={coursesData}
                />

                <ProjectsSection
                  expandedComponent={expandedComponent}
                  girdRowValue2={girdRowValue2}
                  handleClick={handleClick}
                  handleNavigation={handleNavigation}
                  projectsData={projectsData}
                />

                <JobsSection
                  expandedComponent={expandedComponent}
                  girdRowValue3={girdRowValue3}
                  handleClick={handleClick}
                  handleNavigation={handleNavigation}
                  jobsData={jobsData}
                />
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
