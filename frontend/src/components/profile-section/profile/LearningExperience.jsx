import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { learningExperienceData as data } from "../../../data/mySkillsProfileData";
import EducationCard from "./EducationCard";

const LearningExperience = () => {
  return (
    <>
      <Typography variant="h3" component="h2" color={"primary.main"} mb={2.5}>
        Education
      </Typography>
      <Grid2 container rowSpacing={2.5} columnSpacing={3.375} mb={6.75}>
        {data.map((card) => (
          <Grid2 xs={12} lg={6} key={card.id}>
            <EducationCard {...card} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
export default LearningExperience;
