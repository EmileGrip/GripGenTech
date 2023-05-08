import { Box, Stack, Typography } from "@mui/material";

const ChartWrapper = ({ children }) => {
  return (
    <Stack
      className="ChartWrapper"
      sx={{
        borderRadius: "30px",
        border: "1px solid #d9d9d9",
        px: "23px",
        py: "34px",
        height: "100%",
      }}
    >
      {children}
    </Stack>
  );
};

export default ChartWrapper;
