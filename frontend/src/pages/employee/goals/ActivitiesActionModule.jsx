import React from "react";
import StyledWrapper from "../../../components/styled/StyledWrapper";
import StyledTextField from "../../../components/styled/StyledTextField";
import StyledTextarea from "../../../components/styled/StyledTextarea";

const ActivitiesActionModule = () => {
  return (
    <>
      <StyledTextField placeholder="Goal name" label="Activity name" />
      <StyledTextarea
        placeholder="Description"
        label="Description"
        multiline
        rows={4}
      />
    </>
  );
};

export default ActivitiesActionModule;
