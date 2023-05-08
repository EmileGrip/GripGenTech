import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import ProfileHeadersTable from "./ProfileHeadersTable";
import ProfileTableContent from "./ProfileTableContent";
import { skillsTableHeaders as headers } from "../../../data/mySkillsProfileData";
import profileImage from "../../../assets/avatar blue 1.svg";
import WorkExperience from "./WorkExperience";
import LearningExperience from "./LearningExperience";
import CareerPath from "./CareerPath";

const Profile = () => {
  return (
    <>
      <Stack
        spacing={7}
        direction={{ sm: "row" }}
        alignItems="center"
        mb="70px"
      >
        <Button
          sx={{
            width: "227px",
            height: "227px",
          }}
        >
          <img width="100%" src={profileImage} alt="Profile_Image" />
        </Button>
        {/* <img
          style={{ width: "227px", objectFit: "contain", height: "auto" }}
          src={profileImage}
          alt="Profile_Image"
        /> */}
        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            sx={{
              textTransform: "capitalize",
              color: "#1E394C",
              fontSize: { xs: "18px", sm: "30px" },
              lineHeight: { xs: "27px", sm: "45px" },
            }}
          >
            maximiliam bellingham
          </Typography>
          <Stack
            direction={{ xs: "row", sm: "column" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", sm: "flex-start" }}
          >
            <Typography
              sx={{
                color: "#1E394C",
                fontSize: { xs: "13px", sm: "20px" },
                lineHeight: { xs: "20px", sm: "30px" },
              }}
            >
              Senior UI Developer
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "rgba(30, 57, 76, 0.5);",
                fontSize: { xs: "12px", sm: "20px" },
                lineHeight: { xs: "18px", sm: "30px" },
              }}
            >
              He / Him
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Typography variant="h2" color={"primary.main"} fontSize={{ xs: "24px" }}>
        Skill profile
      </Typography>
      <Stack className="displayData__section" mt={5.5} sx={{ width: "100%" }}>
        <ProfileHeadersTable data={headers} />
        <ProfileTableContent />
      </Stack>
      <WorkExperience />
      <LearningExperience />
      <CareerPath />
    </>
  );
};

export default Profile;
