import React from "react";
import StyledWrapper from "../../../components/styled/StyledWrapper";
import { Stack, Typography } from "@mui/material";
import TimingModule from "./TimingModule";

const Step4AddGoal = () => {
  return (
    <StyledWrapper className="step4__addGoal" sx={{ gap: "16px" }}>
      <Stack sx={{ color: "darkGreenAccent", gap: "2px" }}>
        <Typography variant="h4">Step 4 of 4</Typography>
        <Typography variant="h3">Timing</Typography>
      </Stack>
      <TimingModule />
    </StyledWrapper>
  );
};

export default Step4AddGoal;
