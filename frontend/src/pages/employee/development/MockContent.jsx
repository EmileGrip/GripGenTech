import React, { useState } from "react";
import DevelopmentFlow from "./DevelopmentFlow";
import { Box } from "@mui/material";

const MockContent = () => {
  const [direction, setDirection] = useState("TB");

  const detectDirection = (dir) => {
    setDirection(dir);
  };

  return (
    <Box sx={{ minHeight: { xs: "400px", md: "500px" } }}>
      <DevelopmentFlow dir={detectDirection} />
    </Box>
  );
};

export default MockContent;
