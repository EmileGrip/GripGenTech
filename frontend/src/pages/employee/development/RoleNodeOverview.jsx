import { Box, Typography } from "@mui/material";
import React from "react";
import RoleSkillTableRow from "./RoleSkillTableRow";
import RoleSkillsHeaders from "./RoleSkillsHeaders";

const RoleNodeOverview = ({ data }) => {
  console.log(data);
  return (
    <Box sx={{ px: 2 }}>
      <Typography vairant="h5" color={"secondary.main"} mb={1}>
        Next Job
      </Typography>
      <Typography
        variant="h2"
        color={"secondary.main"}
        sx={{ mb: { xs: 3, lg: 6.75 } }}
      >
        {data.label}
      </Typography>
      <Typography variant="h3" color={"secondary.main"} sx={{ mb: { xs: 2 } }}>
        Skill Profile
      </Typography>
      <RoleSkillsHeaders />
      {data.skills.map((skill, index) => (
        <RoleSkillTableRow skill={skill} key={skill.skillName} index={index} />
      ))}
    </Box>
  );
};

export default RoleNodeOverview;
