import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CoursesActionModule from "./CoursesActionModule";
import { Link } from "react-router-dom";
import StyledSmallDarkBtn from "../../../components/styled/StyledSmallDarkBtn";
import ProjectsActionModule from "./ProjectsActionModule";
import ActivitiesActionModule from "./ActivitiesActionModule";

const DevelopActions = () => {
  const [developAction, setDevelopAction] = useState(null);

  return (
    <>
      <Stack
        className="develop__actions"
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { lg: "center" },
          alignItems: "center",
          color: "darkGreen",
        }}
      >
        {["Courses", "Projects", "Activities"].map((item, i) => (
          <Typography
            variant="h4"
            key={item}
            onClick={() =>
              setDevelopAction((prev) => {
                if (prev === item) {
                  return null;
                }
                return item;
              })
            }
            sx={{
              color: "inherit",
              borderBottom: developAction === item ? "2px solid" : "none",
              borderColor: developAction === item ? "accent" : "none",
              padding: "9px 16px",
              fontWeight: 600,
              lineHeight: 1.5,
              cursor: "pointer",
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
      {developAction === "Courses" && (
        <Stack className="courses__wrapper" sx={{ mt: 2, gap: "16px" }}>
          <CoursesActionModule />
          <Link style={{ alignSelf: "flex-start", color: "#66C1FF" }} to="">
            Show more
          </Link>
          <StyledSmallDarkBtn>add course</StyledSmallDarkBtn>
        </Stack>
      )}
      {developAction === "Projects" && (
        <Stack className="projects__wrapper" sx={{ mt: 2, gap: "16px" }}>
          <ProjectsActionModule />
          <StyledSmallDarkBtn>add project</StyledSmallDarkBtn>
        </Stack>
      )}
      {developAction === "Activities" && (
        <Stack className="activities__wrapper" sx={{ mt: 2, gap: "16px" }}>
          <ActivitiesActionModule />
          <StyledSmallDarkBtn>add activity</StyledSmallDarkBtn>
        </Stack>
      )}
    </>
  );
};

export default DevelopActions;
