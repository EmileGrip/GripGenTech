import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { skillGapsArea as data } from "../../../data/analyticsData";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  plugins: {
    legend: {
      position: "top",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const SkillGapsChartArea = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "100%",
      }}
    >
      <Line options={options} data={data} />
    </Box>
  );
};

export default SkillGapsChartArea;
