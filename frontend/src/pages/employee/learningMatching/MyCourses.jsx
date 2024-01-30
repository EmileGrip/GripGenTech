import { Box, Stack, Typography } from "@mui/material";
import plus_paper_icon from "../../../assets/plus_paper.svg";
import CoursesList from "./CoursesList";

const MyCourses = ({ myCourses }) => {
  return (
    <Stack
      className="empty__course__card"
      sx={{
        p: "20px",
        alignItems: "flex-start",
        gap: "16px",
        borderRadius: " 10px",
        border: "2px solid  #EEEEEE",
        background: "#FAFAFA",
      }}
    >
      <Typography variant="h4" sx={{ color: "darkGreen", fontWeight: 600 }}>
        My Courses
      </Typography>
      <Typography variant="body1" color="inactive.main">
        Here you cand find your current courses
      </Typography>
      {myCourses.length === 0 ? (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "24px" }}>
          <Box component="img" src={plus_paper_icon} />
          <Typography
            sx={{
              color: "inactive.main",
              textAlign: "center",
            }}
            variant="body1"
          >
            Nothing here yet!
            <br />
            Select a course from below to start learning
          </Typography>
        </Stack>
      ) : (
        <CoursesList myCourses={myCourses} />
      )}
    </Stack>
  );
};

export default MyCourses;
