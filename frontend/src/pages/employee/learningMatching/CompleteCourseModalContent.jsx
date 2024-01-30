import { Stack, Box, Typography } from "@mui/material";
import { CourseBtn } from "./CoursePreview";
import RatingBar from "../../../components/RatingBar";

const CompleteCourseModalContent = ({
  courseTitle,
  onOpenSkillsModal,
  onClose,
}) => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          lineHeight: "1.5",
          textAlign: "center",
          color: "darkGreen",
          fontWeight: "600",
        }}
      >
        <Typography
          variant="h4"
          component="span"
          sx={{
            fontWeight: 400,
            color: "inactive.main",
            lineHeight: "1.5",
          }}
        >
          Did you succesfully complete the
        </Typography>{" "}
        {courseTitle}{" "}
      </Typography>
      <Stack
        sx={{ flexDirection: { md: "row" }, gap: { xs: "8px", md: "32px" } }}
      >
        <CourseBtn onClick={() => onOpenSkillsModal("finished")}>
          yes, i did
        </CourseBtn>
        <CourseBtn
          onClick={onClose}
          sx={{
            bgcolor: "transparent",
            borderColor: "#173433",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          no, not yet
        </CourseBtn>
      </Stack>
    </>
  );
};

export default CompleteCourseModalContent;
