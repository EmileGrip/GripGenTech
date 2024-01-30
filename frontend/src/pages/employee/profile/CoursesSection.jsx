import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import openInFullIcon from "../../../assets/open_in_full_icon.svg";
import React from "react";
import { EMPLOYEE_LEARNING_MATCHING } from "../../../routes/paths";
import CoursesCards from "./CoursesCards";
import CoursesList from "../learningMatching/CoursesList";
import StyledWrapper from "../../../components/styled/StyledWrapper";

const CoursesSection = ({
  expandedComponent,
  girdRowValue1,
  handleClick,
  handleNavigation,
  startedCourses,
  coursesData,
}) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const getGridPlacement = () => {
    switch (expandedComponent) {
      case 1:
        return { gridColumn: "1/4", gridRow: "1/3" };
      case null:
        return { gridColumn: "1/2", gridRow: "1/3" };
      default:
        return { gridColumn: "4/5", gridRow: girdRowValue1 };
    }
  };

  return (
    <StyledWrapper
      className={`gird-item`}
      sx={{
        gap: 2,
        transition: "all 0.3s ease",
        position: "relative",
        height: lgMatches
          ? expandedComponent === 1
            ? "616px"
            : "300px"
          : expandedComponent === 1
          ? "auto"
          : "300px",
        ...getGridPlacement(),
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="darkGreen">
          Courses
        </Typography>

        <IconButton onClick={() => handleClick(1)} sx={{ p: 0 }}>
          <img
            src={openInFullIcon}
            alt="Open in full icon"
            style={{ width: "24px", height: "24px" }}
          />
        </IconButton>
      </Box>
      {expandedComponent !== 1 && (
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#707070" }}>
          Latest Matches
        </Typography>
      )}

      {coursesData?.length < 1 ? (
        <Typography variant="h3" color="primary" mb={3.125}>
          No courses found
        </Typography>
      ) : expandedComponent === 1 ? (
        <Stack gap={2}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: "darkGreen" }}>
            Current Courses
          </Typography>

          <CoursesList myCourses={startedCourses} />

          <Typography variant="h6" sx={{ fontWeight: 500, color: "darkGreen" }}>
            New Courses
          </Typography>

          <CoursesCards coursesData={coursesData} />
        </Stack>
      ) : (
        coursesData.slice(0, 1).map((course) => (
          <Box
            key={course.title}
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #EEE",
              borderRadius: "10px",
            }}
          >
            <Box
              component="img"
              src={course.img}
              alt={course.title}
              sx={{
                width: "77px",
                height: "75px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "white",
                width: "100%",
                height: "100%",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                p: "12px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "darkGreenAccent" }}
              >
                {course.title}
              </Typography>
            </Box>
          </Box>
        ))
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: "auto",
        }}
      >
        <Button
          onClick={() =>
            handleNavigation("main__3", "sub__0", EMPLOYEE_LEARNING_MATCHING)
          }
          sx={{
            width: "150px",
            height: "40px",
            backgroundColor: "darkGreenAccent",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#17343390",
            },
          }}
        >
          <Typography variant="h6" color="white">
            See all courses
          </Typography>
        </Button>
      </Box>
    </StyledWrapper>
  );
};

export default CoursesSection;
