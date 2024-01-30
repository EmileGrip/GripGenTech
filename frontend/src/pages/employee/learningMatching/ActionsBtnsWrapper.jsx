import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { CourseBtn } from "./CoursePreview";
import correctIcon from "../../../assets/correct_icon_btn.svg";
import deleteIcon from "../../../assets/delete_icon.svg";

const ActionsBtnsWrapper = ({ btnHandler, courseState, onOpenModal }) => {
  return (
    <Stack sx={{ gap: "16px", minWidth: { md: "219px" } }}>
      {courseState === "not started" && (
        <CourseBtn
          variant="contained"
          onClick={() => btnHandler("in progress")}
        >
          start course
        </CourseBtn>
      )}
      {courseState === "in progress" && (
        <>
          <CourseBtn
            endIcon={<Box component={"img"} src={correctIcon} />}
            variant="contained"
            onClick={() => {
              btnHandler("completed");
              onOpenModal("complete");
            }}
          >
            Mark as completed
          </CourseBtn>
          <CourseBtn
            sx={{
              backgroundColor: "transparent",
              borderColor: "#173433",
              "&:hover": {
                backgroundColor: "alert.main",
                borderColor: "alert.main",
              },
            }}
            endIcon={<Box component={"img"} src={deleteIcon} />}
            variant="outlined"
            onClick={() => {
              btnHandler("not started");
              onOpenModal("remove");
            }}
          >
            remove course
          </CourseBtn>
        </>
      )}
    </Stack>
  );
};

export default ActionsBtnsWrapper;
