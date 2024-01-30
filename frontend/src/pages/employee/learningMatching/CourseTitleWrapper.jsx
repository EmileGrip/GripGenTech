import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

const CourseTitleWrapper = ({ img, title, courseState }) => {
  const courseStateColor = {
    "not started": "#c0c0c0",
    "in progress": "#66C1FF",
    completed: "action.selected",
  };
  return (
    <Stack
      className="courseState__wrapper"
      sx={{ flexDirection: { md: "row" }, gap: "16px" }}
    >
      <Box
        component="img"
        src={img}
        alt="course img"
        sx={{ alignSelf: "flex-start", width: "240px", height: "135px" }}
      />
      <Stack sx={{ gap: "8px" }}>
        <Typography
          variant="h2"
          sx={{ textTransform: "capitalize", color: "darkGreen" }}
        >
          {title}
        </Typography>
        <Chip
          label={courseState}
          sx={{
            backgroundColor: `${courseStateColor[courseState]}`,
            alignSelf: "flex-start",
            "& .MuiChip-label": {
              color: "#788894",
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default CourseTitleWrapper;
