import {
  Avatar,
  Box,
  Button,
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

const Profile = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.down("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.down("lg"));

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
        <Avatar
          src={employee_1}
          alt="avatar image"
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
            maximiliam bellingham
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
              }}
            >
              Senior UI Developer
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                opacity: 0.5,
                fontSize: { xs: "12px", lg: "20px" },
              }}
            >
              He / Him
            </Typography>
          </Stack>
        </Box>
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
        <SkillHeadersRow data={headers} />
        <Box className="tableContent__section">
          {dataTable.map((skill, index) => (
            <SkillTableRow skill={skill} key={skill.skillName} index={index} />
          ))}
        </Box>
      </Stack>
      <WorkExperience />
      <LearningExperience />
      <CareerPath />
    </>
  );
};

export default Profile;
