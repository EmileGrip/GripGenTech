import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const TotalEmployeeChart = ({ accountCreation }) => {
  const data = {
    labels: accountCreation?.labels,
    datasets: [
      {
        label: "Total Employees",
        data: accountCreation?.data,
        backgroundColor: "rgba(33,126,253,1)",
        borderRadius: 30,
      },
    ],
  };

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
      <Bar options={options} data={data} />
    </Box>
  );
};
export default TotalEmployeeChart;
