import { Stack, Typography } from "@mui/material";
import { workExperienceData as data } from "../../../data/mySkillsProfileData";
import ExpCard from "../../ExpCard";

const WorkExpSection = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "20px", lg: "32px" },
          mb: { xs: "18px", lg: "48px" },
          color: "primary.main",
        }}
      >
        Work Experience
      </Typography>

      <Stack spacing={3.125} mb={6.25}>
        {data.map((work) => (
          <ExpCard hideOptions={true} key={work.id} {...work} />
        ))}
      </Stack>
    </>
  );
};

export default WorkExpSection;
