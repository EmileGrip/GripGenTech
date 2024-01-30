import React from "react";
import SoftGrayPaper from "./SoftGrayPaper";
import descriptionIcon from "../../../assets/description_menu_icon.svg";
import { Stack, Typography } from "@mui/material";
import { StyledSVG } from "./CourseDetails";

const CourseDescription = () => {
  return (
    <SoftGrayPaper>
      <Typography variant="h3" color={"#173433"}>
        Details
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: "16px" }}>
        <StyledSVG
          src={descriptionIcon}
          beforeInjection={(svg) => {
            svg.setAttribute("width", "24px");
            svg.setAttribute("height", "24px");
          }}
        />
        <Typography variant="body1" color={"#788894"}>
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa.
        </Typography>
      </Stack>
    </SoftGrayPaper>
  );
};

export default CourseDescription;
