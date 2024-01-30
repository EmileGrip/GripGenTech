import { Box, Stack } from "@mui/material";
import MyCourseCard from "./MyCourseCard";
import CourseModal, { SkillsModal } from "./CourseModal";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import FinishedCourseModalContent from "./FinishedCourseModalContent";
import CompleteCourseModalContent from "./CompleteCourseModalContent";
import RemoveCourseModalContent from "./RemoveCourseModalContent";

const updatedSkills = [
  { name: "user interface design", initialValue: 3, requiredLevel: 3 },
  {
    name: "Web development",
    initialValue: 2,
    requiredLevel: 4,
  },
  {
    name: "Responsive design",
    initialValue: 4,
    requiredLevel: 3,
  },
  { name: "Collaboration", initialValue: 2, requiredLevel: 2 },
  { name: "Accessibility", initialValue: 4, requiredLevel: 4 },
];

const CoursesList = ({ myCourses }) => {
  const [courseModalAction, setCourseModalAction] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const [openSkillsModal, setOpenSkillsModal] = useState(false);

  const openModalHandler = (courseTitle, skills, action) => {
    setOpenModal(true);
    setCourseModalAction({ courseTitle, skills, action });
  };

  const closeModalHandler = () => {
    setOpenModal(false);
    setOpenSkillsModal(false);
  };

  const openSkillsModalHandler = (action) => {
    setOpenSkillsModal(true);
    setCourseModalAction({ action });
  };

  return (
    <>
      <CourseModal
        onOpenSkillsModal={openSkillsModalHandler}
        open={openModal}
        onClose={closeModalHandler}
      >
        {courseModalAction?.action === "complete" && (
          <CompleteCourseModalContent
            courseTitle={courseModalAction?.courseTitle}
          />
        )}
        {courseModalAction?.action === "remove" && (
          <RemoveCourseModalContent
            courseTitle={courseModalAction?.courseTitle}
          />
        )}
      </CourseModal>
      <SkillsModal open={openSkillsModal} onClose={closeModalHandler}>
        {courseModalAction?.action === "finished" && (
          <FinishedCourseModalContent skills={updatedSkills} />
        )}
      </SkillsModal>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          className="course__list"
          rowSpacing={2}
          columnSpacing={{ xs: 0, md: 2 }}
          sx={{
            width: "100%",
            // mx: 0,
            // gap: "16px",
            // flexWrap: "wrap",
            // flexDirection: { md: "row" },
          }}
        >
          {myCourses.map((course, index) => (
            <Grid key={index} xs={12} md={6} xl={4}>
              <MyCourseCard
                onModal={openModalHandler}
                course={course}
                key={index}
              />
            </Grid>
          ))}
        </Grid>
        {/* <Stack sx={{ flexDirection: "row", gap: "16px", flexWrap: "wrap" }}>
          {myCourses.map((course, index) => (
            <MyCourseCard
              onModal={openModalHandler}
              course={course}
              key={index}
            />
          ))}
        </Stack> */}
      </Box>
    </>
  );
};

export default CoursesList;
