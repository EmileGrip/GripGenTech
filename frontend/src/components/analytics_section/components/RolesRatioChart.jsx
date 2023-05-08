import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Employee", "Manager", "Admin"],
  datasets: [
    {
      label: "Ratio",
      data: [5, 2, 1],
      backgroundColor: ["#B395F6", "#FCD1C9", "#AADCFE"],
      borderColor: ["#B395F6", "#FCD1C9", "#AADCFE"],
      borderWidth: 1,
    },
  ],
};

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

const RolesRatioChart = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      height: "100%",
    }}
  >
    <Doughnut
      data={data}
      options={options}
      // style={{ height: "100%", width: "100%" }}
    />
  </Box>
);

export default RolesRatioChart;
