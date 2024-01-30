import { Box, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CourseCard from "./CourseCard";

const CoursesCards = ({ coursesData }) => {
  const theme = useTheme();
  const xlMatches = useMediaQuery(theme.breakpoints.up("xl"));

  const courses = xlMatches ? coursesData.slice(0, 4) : coursesData.slice(0, 3);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        columnSpacing={{ xs: 3, sm: 3 }}
        rowSpacing={{ xs: 3 }}
        columns={{ xs: 4, sm: 8, lg: 12, xl: 16 }}
      >
        {courses.map((course, index) => (
          <Grid
            xs={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CourseCard
              img={course?.img}
              title={course?.title}
              price={course?.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoursesCards;
