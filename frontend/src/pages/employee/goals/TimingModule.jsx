import React from "react";
import StyledDatePicker from "../../../components/styled/StyledDatePicker";
import { Stack, TextField } from "@mui/material";

const TimingModule = () => {
  return (
    <Stack sx={{ flexDirection: { lg: "row", gap: "16px" } }}>
      <StyledDatePicker
        label="Start date"
        sx={{ flex: 1 }}
        // value={formik.values.startDate}
        // onChange={(value) => {
        //   formik.setFieldValue("startDate", value);
        // }}
        slot={(params) => (
          <TextField
            {...params}
            // error={Boolean(formik.touched.startDate && formik.errors.startDate)}
            // helperText={formik.touched.startDate && formik.errors.startDate}
            id="startDate"
            name="startDate"
          />
        )}
      />
      <StyledDatePicker
        label="Due date"
        sx={{ flex: 1 }}
        // value={formik.values.dueDate}
        // onChange={(value) => {
        //   formik.setFieldValue("dueDate", value);
        // }}
        slot={(params) => (
          <TextField
            {...params}
            // error={Boolean(formik.touched.dueDate && formik.errors.dueDate)}
            // helperText={formik.touched.dueDate && formik.errors.dueDate}
            id="dueDate"
            name="dueDate"
          />
        )}
      />
    </Stack>
  );
};

export default TimingModule;
