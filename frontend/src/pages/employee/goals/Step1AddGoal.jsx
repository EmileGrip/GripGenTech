import { Stack, Typography } from "@mui/material";
import React from "react";
import StyledWrapper from "../../../components/styled/StyledWrapper";
import StyledTextField from "../../../components/styled/StyledTextField";
import StyledTextarea from "../../../components/styled/StyledTextarea";

const Step1AddGoal = () => {
  return (
    <StyledWrapper className="step1__addGoal" sx={{ gap: "16px" }}>
      <Stack sx={{ color: "darkGreenAccent", gap: "2px" }}>
        <Typography variant="h4">Step 1 of 4</Typography>
        <Typography variant="h3">Determine your goal</Typography>
      </Stack>
      <StyledTextField
        variant="outlined"
        placeholder="Goal name"
        label="Goal name"
      />
      <StyledTextarea
        variant="outlined"
        placeholder="Description"
        label="Description"
        multiline
        rows={4}
      />
    </StyledWrapper>
  );
};

export default Step1AddGoal;
