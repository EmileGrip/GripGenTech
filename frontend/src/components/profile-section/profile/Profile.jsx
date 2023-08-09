import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { skillsTableHeaders as headers } from "../../../data/mySkillsProfileData";
import { skillsTable as dataTable } from "../../../data/mySkillsProfileData";
import profileImage from "../../../assets/avatar blue 1.svg";
import employee_0 from "../../../assets/employee_0.jpg";
import employee_1 from "../../../assets/employee_1.jpg";
import WorkExperience from "./WorkExpSection";
import LearningExperience from "./LearningExpSection";
import CareerPath from "./CareerPath";
import SkillHeadersRow from "../../SkillHeadersRow";
import SkillTableRow from "../../SkillTableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSkillsData,
  fetchSkillsWishlistData,
} from "../../../redux/slices/Employee/mySkills/mySkillsActions";
import SkillWishTableRow from "../../SkillWishTableRow";
import { useState } from "react";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";
import ExpCard from "../../ExpCard";
import EducationCard from "../../EducationCard";
import CourseCard from "../../CourseCard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MockContent from "../../../pages/employee/development/MockContent";

const Profile = () => {
  const { id } = useParams();
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.down("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.down("lg"));
  const { token } = useSelector((state) => state.auth);
  const { skills, skillsWishlist, skillsDataLoading, skillsWishlistLoading } =
    useSelector((state) => state.mySkills);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, id]);

  useEffect(() => {
    if (token) {
      dispatch(fetchSkillsData(id));
      dispatch(fetchSkillsWishlistData(id));
    }
  }, [token, dispatch]);

  const sortedSkills = skills
    ?.slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  const sortedSkillsWishlist = skillsWishlist
    ?.slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  // Loading State
  const [loading, setLoading] = useState(true);
  // Fetching work experience Data
  const [user, setUser] = useState([]);

  // Loading State
  const [workExpLoading, setWorkExpLoading] = useState(true);
  // Fetching work experience Data
  const [experienceFetchedData, setExperienceFetchedData] = useState([]);

  // Loading State
  const [educationLoading, setEducationLoading] = useState(true);
  // Fetching education Data
  const [educationFetchedData, setEducationFetchedData] = useState([]);

  // Loading State
  const [coursesLoading, setCoursesLoading] = useState(true);
  // Fetching courses Data
  const [coursesFetchedData, setCoursesFetchedData] = useState([]);

  const fetchUserData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
      },
    };

    try {
      const response = await axiosInstance.get("user", config);
      setUser(response.data.payload.data[0]);
      // console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  const fetchData = useCallback(
    async (api) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: id,
        },
      };

      try {
        const response = await axiosInstance.get(api, config);
        if (api === "experience") {
          setExperienceFetchedData(response.data.payload);
        } else if (api === "education") {
          setEducationFetchedData(response.data.payload);
        } else if (api === "course") {
          setCoursesFetchedData(response.data.payload);
        }
        // console.log(response.data.payload);
      } catch (error) {
        console.log(error);
      } finally {
        if (api === "experience") {
          setWorkExpLoading(false);
        } else if (api === "education") {
          setEducationLoading(false);
        } else if (api === "course") {
          setCoursesLoading(false);
        }
      }
    },
    [token, id]
  );

  useEffect(() => {
    fetchData("experience");
    fetchData("education");
    fetchData("course");
  }, [fetchData]);

  return (
    <>
      <Stack
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "center" },
          mb: { xs: "50px", lg: "70px" },
          gap: { xs: "12px", lg: "57px" },
        }}
      >
        {loading && <CircularProgress />}
        {!loading && (
          <>
            <Avatar
              src={user?.profile_picture?.url}
              alt={user?.profile_picture?.name}
              sx={{
                width: { xs: "112px", lg: "227px" },
                height: { xs: "112px", lg: "227px" },
              }}
            />
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="h3"
                sx={{
                  textTransform: "capitalize",
                  color: "#1E394C",
                  fontSize: { xs: "18px", lg: "30px" },
                  fontWeight: 400,
                }}
              >
                {`${user?.first_name} ${user?.last_name}`}
              </Typography>
              <Stack
                sx={{
                  flexDirection: { xs: "row", lg: "column" },
                  justifyContent: "flex-start",
                  alignItems: { xs: "center", lg: "flex-start" },
                  gap: "15px",
                }}
              >
                <Typography
                  sx={{
                    color: "#1E394C",
                    fontSize: { xs: "13px", lg: "20px" },
                    textTransform: "capitalize",
                  }}
                >
                  {user?.role?.title && user?.role?.title !== "0"
                    ? user?.role?.title
                    : "No Title"}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    opacity: 0.5,
                    fontSize: { xs: "12px", lg: "20px" },
                  }}
                >
                  {user?.gender}
                </Typography>
              </Stack>
            </Box>
          </>
        )}
      </Stack>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "20px", lg: "32px" },
          mb: { xs: "24px", lg: "48px" },
          color: "primary.main",
        }}
      >
        Skill profile
      </Typography>

      <Stack className="displayData__section" sx={{ width: "100%" }}>
        {skillsDataLoading && <CircularProgress />}
        {!skillsDataLoading && (
          <>
            {sortedSkills.length < 1 ? (
              <Typography variant="h3" color="primary" mb={3.125}>
                No skills found
              </Typography>
            ) : (
              <Box className="tableContent__section">
                <SkillHeadersRow data={headers} isProfile={true} />
                {sortedSkills.map((skill) => (
                  <SkillTableRow
                    skill={skill}
                    key={skill.id}
                    isProfile={true}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Stack>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "20px", lg: "32px" },
          mb: { xs: "24px", lg: "48px" },
          color: "primary.main",
        }}
      >
        Skill wishlist profile
      </Typography>

      <Stack className="displayData__section" sx={{ width: "100%" }}>
        {skillsWishlistLoading && <CircularProgress />}
        {!skillsWishlistLoading && (
          <>
            {sortedSkillsWishlist.length < 1 ? (
              <Typography variant="h3" color="primary" mb={3.125}>
                No skills found
              </Typography>
            ) : (
              <Box className="tableContent__section">
                {sortedSkillsWishlist.map((skill, index) => (
                  <SkillWishTableRow
                    skill={skill}
                    key={skill.id}
                    isProfile={true}
                    index={index}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Stack>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "20px", lg: "32px" },
          mb: { xs: "24px", lg: "48px" },
          color: "primary.main",
        }}
      >
        Work Experience
      </Typography>

      <Stack className="displayData__section" sx={{ width: "100%" }}>
        {workExpLoading && <CircularProgress />}
        {!workExpLoading && (
          <>
            {experienceFetchedData.length < 1 ? (
              <Typography variant="h3" color="primary" mb={3.125}>
                No work experience found
              </Typography>
            ) : (
              <>
                {experienceFetchedData.map((work, index) => (
                  <ExpCard
                    data={work}
                    hideOptions={true}
                    key={`${work.id}-${index}`}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>

      <Grid2
        container
        rowSpacing={2.5}
        columnSpacing={3.375}
        sx={{ mb: { xs: 3, md: 6.75 } }}
      >
        <Grid2 xs={12} md={6}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "20px", lg: "32px" },
              my: { xs: "24px", lg: "48px" },
              color: "primary.main",
            }}
          >
            Education
          </Typography>

          <Stack className="displayData__section" sx={{ width: "100%" }}>
            {educationLoading && <CircularProgress />}
            {!educationLoading && (
              <>
                {educationFetchedData.length < 1 ? (
                  <>
                    <Typography variant="h3" color="primary">
                      No education found
                    </Typography>
                  </>
                ) : (
                  <>
                    {educationFetchedData.map((card) => (
                      <EducationCard
                        data={card}
                        hideOptions={true}
                        key={card.id}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </Stack>
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "20px", lg: "32px" },
              my: { xs: "24px", lg: "48px" },
              color: "primary.main",
            }}
          >
            Courses
          </Typography>

          <Stack className="displayData__section" sx={{ width: "100%" }}>
            {coursesLoading && <CircularProgress />}
            {!coursesLoading && (
              <>
                {coursesFetchedData.length < 1 ? (
                  <>
                    <Typography variant="h3" color="primary">
                      No courses found
                    </Typography>
                  </>
                ) : (
                  <>
                    {coursesFetchedData.map((card) => (
                      <CourseCard
                        data={card}
                        hideOptions={true}
                        key={card.id}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </Stack>
        </Grid2>
      </Grid2>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "20px", lg: "32px" },
          mb: { xs: "24px", lg: "48px" },
          color: "primary.main",
        }}
      >
        Career Path
      </Typography>

      <MockContent isProfile={true} userId={id} />
      {/* <WorkExperience /> */}
      {/* <LearningExperience /> */}
      {/* <CareerPath /> */}
    </>
  );
};

export default Profile;
