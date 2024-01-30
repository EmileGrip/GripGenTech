import { Stack, Typography } from "@mui/material";
import course0 from "../../../assets/course0.png";
import course1 from "../../../assets/course1.png";
import CourseAction from "./CourseAction";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const courses = [
  { img: course0, title: "Ultimate Web Designer & Web Developer Course" },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
  },
  { img: course0, title: "Ultimate Frontend Developer Course" },
  {
    img: course1,
    title: "Complete Backend Developer Course",
  },
];
const CoursesActionModule = () => {
  return (
    <>
      {courses.length > 0 ? (
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid xs={12} lg={6} key={course.title}>
              <CourseAction img={course.img} title={course.title} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "darkAccent",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          No Courses added yet
        </Typography>
      )}
    </>
  );
};

export default CoursesActionModule;
