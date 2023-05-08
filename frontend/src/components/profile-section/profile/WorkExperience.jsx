import { Stack, Typography } from "@mui/material";
import { workExperienceData as data } from "../../../data/mySkillsProfileData";
import ExpCard from "./ExpCard";

const WorkExperience = () => {
  return (
    <>
      <Typography variant="h3" component="h2" color={"primary.main"} mb={5.875}>
        Work Experience
      </Typography>

      <Stack spacing={3.125} mb={6.25}>
        {data.map((work) => (
          <ExpCard key={work.id} {...work} />
        ))}
      </Stack>
    </>
  );
};

export default WorkExperience;
