import { Box, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { learningExperienceData as data } from "../../../data/mySkillsProfileData";
import EducationCard from "../../EducationCard";
import CourseCard from "../../CourseCard";

const LearningExpSection = () => {
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", lg: "row" },
        gap: { xs: "56px", lg: "25px" },
        mb: 6.75,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "20px", lg: "32px" },
            mb: { xs: "18px", lg: "48px" },
            color: "primary.main",
          }}
        >
          Education
        </Typography>
        <Grid2 container rowSpacing={2.5} columnSpacing={3.375}>
          {data.map((card) => (
            <Grid2 xs={12} key={card.id}>
              <EducationCard hideOptions={true} {...card} />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "20px", lg: "32px" },
            mb: { xs: "18px", lg: "48px" },
            color: "primary.main",
          }}
        >
          Courses
        </Typography>
        <Grid2 container rowSpacing={2.5} columnSpacing={3.375}>
          {data.map((card) => (
            <Grid2 xs={12} key={card.id}>
              <CourseCard hideOptions={true} {...card} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Stack>
  );
};
export default LearningExpSection;
