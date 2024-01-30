import { Stack, Typography } from "@mui/material";
import { CourseBtn } from "./CoursePreview";

const RemoveCourseModalContent = ({ courseTitle }) => {
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
          Are you sure you want to remove the
        </Typography>{" "}
        {courseTitle}{" "}
        <Typography
          variant="h4"
          component="span"
          sx={{
            fontWeight: 400,
            color: "inactive.main",
            lineHeight: "1.5",
          }}
        >
          from your courses?
        </Typography>
      </Typography>
      <Stack
        sx={{ flexDirection: { md: "row" }, gap: { xs: "8px", md: "32px" } }}
      >
        <CourseBtn>Remove</CourseBtn>
        <CourseBtn
          sx={{
            bgcolor: "transparent",
            borderColor: "#173433",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Cancel
        </CourseBtn>
      </Stack>
    </>
  );
};

export default RemoveCourseModalContent;
