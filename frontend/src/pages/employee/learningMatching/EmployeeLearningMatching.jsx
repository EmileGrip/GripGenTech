import { Stack, Typography } from "@mui/material";
import MyCourses from "./MyCourses";
import SearchWrapperBox from "./SearchWrapperBox";
import CategoriesCourses from "./CategoriesCourses";
import TagsWrapper from "./TagsWrapper";
import CoursesGrid from "./CoursesGrid";
import course0 from "../../../assets/course0.png";
import course1 from "../../../assets/course1.png";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { fetchSkillsData } from "../../../redux/slices/Employee/mySkills/mySkillsActions";
import axiosInstance from "../../../helper/axiosInstance";

const myCourses = [
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    status: "finished",
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    status: "in progress",
  },
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    status: "in progress",
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    status: "finished",
  },
];

const EmployeeLearningMatching = () => {
  const { userInfo, token } = useSelector((state) => state.auth);
  const { skills } = useSelector((state) => state.mySkills);
  const dispatch = useDispatch();
  const sortedSkills = skills
    .slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [selectedPage, setSelectedPage] = useState(1);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log({ selectedSkillId, selectedLevel, selectedPage });

  useEffect(() => {
    if (token) {
      dispatch(fetchSkillsData(userInfo.id));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (sortedSkills.length > 0 && !selectedSkillId) {
      setSelectedSkillId(sortedSkills[0].id);
    }
  }, [sortedSkills]);

  const fetchData = useCallback(
    async (skill_id, level = 1, page = 1) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          skill_id,
          level: level === "Beginner" ? 1 : level === "Intermediate" ? 2 : 3,
          page,
        },
      };

      try {
        setLoading(true);
        const response = await axiosInstance.get(`learning_matching`, config);
        setFetchedData(response.data.payload);
        // console.log(response.data.payload);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (selectedSkillId) {
      fetchData(selectedSkillId, selectedLevel, selectedPage);
    }
  }, [selectedSkillId, selectedLevel, selectedPage]);

  return (
    <Stack sx={{ gap: "24px" }}>
      <MyCourses myCourses={myCourses} />

      <SearchWrapperBox
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />

      <Typography
        sx={{
          color: "inactive.main",
          textAlign: "center",
        }}
        variant="body1"
      >
        Keep your skill profile updated for the most relevant learning matches
      </Typography>

      {/* <CategoriesCourses /> */}

      <TagsWrapper
        tags={sortedSkills}
        selectedSkillId={selectedSkillId}
        setSelectedSkillId={setSelectedSkillId}
      />

      <CoursesGrid />
    </Stack>
  );
};

export default EmployeeLearningMatching;
