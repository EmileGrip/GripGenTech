import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: "true",
      position: "right",
    },
  },
};

const SkillPresenceChart = ({ data }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      height: "100%",
    }}
  >
    <Doughnut data={data} options={options} />
  </Box>
);

export default SkillPresenceChart;
