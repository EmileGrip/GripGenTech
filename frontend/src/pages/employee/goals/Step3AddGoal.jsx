import { Stack, Typography } from "@mui/material";
import React from "react";
import StyledWrapper from "../../../components/styled/StyledWrapper";
import DevelopActions from "./DevelopActions";

const Step3AddGoal = () => {
  return (
    <StyledWrapper className="step3__addGoal" sx={{ gap: "16px" }}>
      <Stack sx={{ color: "darkGreenAccent", gap: "2px" }}>
        <Typography variant="h4">Step 3 of 4</Typography>
        <Typography variant="h3">Develop actions</Typography>
        <Typography variant="body1" sx={{ color: "inactive.main" }}>
          Here you can add concrete actions and sign them off
        </Typography>
        <DevelopActions />
      </Stack>
    </StyledWrapper>
  );
};

export default Step3AddGoal;
