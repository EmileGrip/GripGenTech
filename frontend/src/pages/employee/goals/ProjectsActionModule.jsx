import React from "react";
import ProjectAction from "./ProjectAction";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const projects = [
  {
    title: "Community Art Spotlight",
    startDate: "17/07/2023",
  },
  {
    title: "Creative Conversations",
    startDate: "17/07/2023",
  },
  {
    title: "Develop Platform",
    startDate: "17/07/2023",
  },
  {
    title: "Develop Online Store",
    startDate: "17/07/2023",
  },
];
const ProjectsActionModule = () => {
  return (
    <>
      {projects.length > 0 ? (
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid xs={12} lg={6} key={project.title}>
              <ProjectAction project={project} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "darkAccent",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          No projects added yet
        </Typography>
      )}
    </>
  );
};

export default ProjectsActionModule;
