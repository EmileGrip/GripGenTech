import Grid from "@mui/material/Unstable_Grid2";
import course0 from "../../../assets/course0.png";
import course1 from "../../../assets/course1.png";
import UdemyCourseCard from "./UdemyCourseCard";
import { Box } from "@mui/material";

const coursesData = [
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    rate: 5,
    students: 4215,
    price: 80,
    tags: [
      "user interface design",
      "web development",
      "responsive design",
      "colaboration",
    ],
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    rate: 4.5,
    students: 3000,
    price: 100,
    tags: [
      "UI design",
      "Prototype",
      "Web dev",
      "colaboration",
      "accessibility",
    ],
  },
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    rate: 5,
    students: 4215,
    price: 80,
    tags: [
      "user interface design",
      "web development",
      "responsive design",
      "colaboration",
    ],
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    rate: 4.5,
    students: 3000,
    price: 100,
    tags: [
      "UI design",
      "Prototype",
      "Web dev",
      "colaboration",
      "accessibility",
    ],
  },
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    rate: 5,
    students: 4215,
    price: 80,
    tags: [
      "user interface design",
      "web development",
      "responsive design",
      "colaboration",
    ],
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    rate: 4.5,
    students: 3000,
    price: 100,
    tags: [
      "UI design",
      "Prototype",
      "Web dev",
      "colaboration",
      "accessibility",
    ],
  },
  {
    img: course0,
    title: "Ultimate Web Designer & Web Developer Course",
    rate: 5,
    students: 4215,
    price: 80,
    tags: [
      "user interface design",
      "web development",
      "responsive design",
      "colaboration",
    ],
  },
  {
    img: course1,
    title: "Complete Web Designing Course | Web-Development BootCamp",
    rate: 4.5,
    students: 3000,
    price: 100,
    tags: [
      "UI design",
      "Prototype",
      "Web dev",
      "colaboration",
      "accessibility",
    ],
  },
];
const CoursesGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        columnSpacing={{ xs: 3, sm: 3 }}
        rowSpacing={{ xs: 3 }}
        columns={{ xs: 4, sm: 8, lg: 12, xl: 16 }}
      >
        {coursesData.map((course, index) => (
          <Grid
            xs={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <UdemyCourseCard
              img={course?.img}
              title={course?.title}
              rate={course?.rate}
              students={course?.students}
              price={course?.price}
              tags={course?.tags}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoursesGrid;
