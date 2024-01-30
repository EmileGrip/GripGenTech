import React from "react";
import StyledDarkWrapper from "../../../components/styled/StyledDarkWrapper";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import LinesEllipsis from "react-lines-ellipsis";
import viewIcon from "../../../assets/view_icon.svg";

const ProjectAction = ({ project }) => {
  return (
    <StyledDarkWrapper
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <Stack>
        <Typography
          title={project?.title}
          variant="h5"
          sx={{ flex: 4, color: "darkGreenAccent", fontWeight: 600 }}
        >
          <LinesEllipsis
            text={project?.title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Typography>
        <Typography variant="h5" sx={{ flex: 4, color: "inactive.main" }}>
          Start Date: {project?.startDate}
        </Typography>
      </Stack>
      <IconButton>
        <Box
          component={"img"}
          src={viewIcon}
          sx={{
            flex: 1,
            width: "24px",
            height: "24px",
          }}
        />
      </IconButton>
    </StyledDarkWrapper>
  );
};

export default ProjectAction;
