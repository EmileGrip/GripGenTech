import { Stack, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { CourseBtn } from "./CoursePreview";
import RatingBar from "../../../components/RatingBar";

const FinishedCourseModalContent = ({ skills, onClose }) => {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Stack sx={{ gap: "20px" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", color: "inactive.main", lineHeight: 1.5 }}
        >
          Congrats!
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            color: "darkGreen",
            lineHeight: 1.5,
          }}
        >
          <Typography
            variant="h4"
            component="span"
            sx={{ fontWeight: 400, color: "inactive.main", lineHeight: 1.5 }}
          >
            Your{" "}
          </Typography>
          skills have been updated{" "}
          <Typography
            variant="h4"
            component="span"
            sx={{ fontWeight: 400, color: "inactive.main", lineHeight: 1.5 }}
          >
            with your finished course
          </Typography>
        </Typography>
      </Stack>
      <Stack sx={{ gap: "10px" }}>
        {mdMatch && (
          <Stack
            sx={{
              flexDirection: { md: "row" },
              justifyContent: { md: "space-between" },
              mb: 1.5,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 500, color: "#353C44" }}>
              Skill name
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 500, color: "#353C44" }}>
              Level raised
            </Typography>
          </Stack>
        )}
        {skills.map((skill, index) => (
          <Stack
            key={index}
            sx={{
              flexDirection: { md: "row" },
              justifyContent: { md: "space-between" },
              gap: "8px",
            }}
          >
            <Typography variant="body1">{skill.name}</Typography>
            <Box>
              <RatingBar
                initialValue={skill.initialValue}
                requiredLevel={skill.requiredLevel}
              />
            </Box>
          </Stack>
        ))}
      </Stack>
      <CourseBtn
        onClick={onClose}
        sx={{ alignSelf: { md: "self-start" }, width: "220px" }}
      >
        Accept
      </CourseBtn>
    </>
  );
};
export default FinishedCourseModalContent;
