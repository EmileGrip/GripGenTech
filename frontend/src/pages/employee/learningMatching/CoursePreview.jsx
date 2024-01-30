import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseTitleWrapper from "./CourseTitleWrapper";
import { Button, Stack, styled } from "@mui/material";
import CoursePriceWrapper from "./CoursePriceWrapper";
import CourseTags from "./CourseTags";
import CourseDetails from "./CourseDetails";
import CourseDescription from "./CourseDescription";
import ActionsBtnsWrapper from "./ActionsBtnsWrapper";
import CourseModal, { SkillsModal } from "./CourseModal";
import FinishedCourseModalContent from "./FinishedCourseModalContent";
import CompleteCourseModalContent from "./CompleteCourseModalContent";
import RemoveCourseModalContent from "./RemoveCourseModalContent";
import course0 from "../../../assets/course0.png";

export const CourseBtn = styled(Button)(({ theme }) => ({
  width: "100%",
  alignSelf: "stretch",
  padding: "10px",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "capitalize",
  color: theme.palette.darkGreen,
  border: `1px solid ${theme.palette.accent}`,
  borderRadius: "5px",
  backgroundColor: theme.palette.accent,
  "&:hover": {
    backgroundColor: theme.palette.accent,
  },
}));

const tags = [
  "figma",
  "illustrator",
  "photoshop",
  "dreamweaver",
  "prototype",
  "react",
  "ui",
  "web design",
  "wireframing",
  "ux",
];

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

const courseStaticData = {
  title: "ultimate web designer & web developer course",
  img: course0,
  price: 80,
  rate: 4.5,
  students: 4215,
};

const CoursePreview = () => {
  const { courseId } = useParams();
  console.log(courseId);

  const [courseModalAction, setCourseModalAction] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = (action = null) => {
    setOpenModal(true);
    setCourseModalAction({ action });
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const [courseState, setCourseState] = useState("not started");

  const actionBtnHandler = (state) => {
    setCourseState(state);
  };

  return (
    <>
      <CourseModal open={openModal} onClose={closeModalHandler}>
        {courseModalAction?.action === "complete" && (
          <CompleteCourseModalContent courseTitle={"Dumb Course Title"} />
        )}
        {courseModalAction?.action === "remove" && (
          <RemoveCourseModalContent courseTitle={"Dumb Course Title"} />
        )}
      </CourseModal>
      <SkillsModal open={openModal} onClose={closeModalHandler}>
        {courseModalAction?.action === "finished" && (
          <FinishedCourseModalContent skills={updatedSkills} />
        )}
        <FinishedCourseModalContent skills={updatedSkills} />
      </SkillsModal>
      <Stack sx={{ gap: "24px" }}>
        <Stack
          sx={{
            flexDirection: { md: "row" },
            justifyContent: { md: "space-between" },
            gap: { md: 3, lg: "48px" },
          }}
        >
          <CourseTitleWrapper {...courseStaticData} courseState={courseState} />
          <ActionsBtnsWrapper
            courseState={courseState}
            btnHandler={actionBtnHandler}
            onOpenModal={openModalHandler}
          />
        </Stack>
        <CoursePriceWrapper {...courseStaticData} />
        <CourseTags tags={tags} />
        <CourseDetails />
        <CourseDescription />
      </Stack>
    </>
  );
};

export default CoursePreview;
