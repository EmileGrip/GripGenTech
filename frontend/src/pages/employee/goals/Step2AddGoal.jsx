import { Stack, Typography } from "@mui/material";
import React from "react";
import StyledWrapper from "../../../components/styled/StyledWrapper";
import StyledRoundedBtn from "../../../components/styled/StyledRoundedBtn";
import AddIcon from "@mui/icons-material/Add";
const Step2AddGoal = () => {
  return (
    <StyledWrapper className="step2__addGoal" sx={{ gap: "16px" }}>
      <Stack sx={{ color: "darkGreenAccent", gap: "2px" }}>
        <Typography variant="h4">Step 2 of 4</Typography>
        <Typography variant="h3">Add skills</Typography>
      </Stack>
      <StyledRoundedBtn sx={{ alignSelf: "flex-start" }} endIcon={<AddIcon />}>
        add skill
      </StyledRoundedBtn>
    </StyledWrapper>
  );
};

export default Step2AddGoal;
