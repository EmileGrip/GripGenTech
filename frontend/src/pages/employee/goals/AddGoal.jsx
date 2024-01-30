import { Stack } from "@mui/material";
import React from "react";
import StyledDarkBtn from "../../../components/styled/StyledDarkBtn";
import { useFormik } from "formik";
import StyledOutlinedBtn from "../../../components/styled/StyledOutlinedBtn";
import Step1AddGoal from "./Step1AddGoal";
import Step2AddGoal from "./Step2AddGoal";
import Step3AddGoal from "./Step3AddGoal";
import Step4AddGoal from "./Step4AddGoal";

const AddGoal = () => {
  const formik = useFormik({
    initialValues: {
      startDate: null,
      dueDate: null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Stack sx={{ gap: 3 }}>
      {/* <Typography variant="body1" sx={{ color: "inactive.main" }}>
        Select where you want to create a goal type
      </Typography> */}

      {/* <Stack sx={{ gap: "12px" }}>
        <StyledGoalLocationBtn sx={{ borderColor: "accent" }}>
          Current role
        </StyledGoalLocationBtn>
      </Stack> */}

      <Step1AddGoal />
      <Step2AddGoal />
      <Step3AddGoal />
      <Step4AddGoal />
      <Stack sx={{ flexDirection: { lg: "row" }, gap: "16px" }}>
        <StyledDarkBtn>confirm goal</StyledDarkBtn>
        <StyledOutlinedBtn>Cancel</StyledOutlinedBtn>
      </Stack>
    </Stack>
  );
};

export default AddGoal;
