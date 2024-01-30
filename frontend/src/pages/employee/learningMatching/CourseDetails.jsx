import React from "react";
import SoftGrayPaper from "./SoftGrayPaper";
import { Box, Stack, Typography } from "@mui/material";
import date_icon from "../../../assets/date_icon.svg";
import hours_icon from "../../../assets/hours_icon.svg";
import experience_icon from "../../../assets/experience_icon.svg";
import play_icon from "../../../assets/play_icon.svg";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactSVG } from "react-svg";
import styled from "@emotion/styled";

export const StyledSVG = styled(ReactSVG)`
  path {
    stroke: #788894;
  }
`;
const detailsContent = [
  {
    icon: play_icon,
    title: "On demand",
  },
  {
    icon: date_icon,
    title: "Start date: 17/07/2023",
  },
  {
    icon: date_icon,
    title: "End date: 17/07/2024",
  },
  {
    icon: hours_icon,
    title: "Hours: 40",
  },
  {
    icon: experience_icon,
    title: "Certification",
  },
];
const CourseDetails = () => {
  return (
    <SoftGrayPaper>
      <Typography variant="h3" color={"#173433"}>
        Details
      </Typography>
      <Grid container spacing={2}>
        {detailsContent.map((item, index) => (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
            item
            xs={12}
            md={index === 0 ? 12 : 6}
            key={index}
          >
            <StyledSVG
              src={item.icon}
              beforeInjection={(svg) => {
                svg.setAttribute("width", "24px");
                svg.setAttribute("height", "24px");
              }}
            />
            <Typography variant="body1" color={"#788894"}>
              {item.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </SoftGrayPaper>
  );
};

export default CourseDetails;
