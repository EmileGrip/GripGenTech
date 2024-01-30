import { Paper, Stack, styled } from "@mui/material";
import React from "react";

const SoftGrayPaper = styled(Stack)(({ theme }) => ({
  padding: "20px",
  backgroundColor: "#fafafa",
  border: "2px solid #eee",
  borderRadius: "10px",
  gap: "20px",
  alignItems: "flex-start",
}));

export default SoftGrayPaper;
