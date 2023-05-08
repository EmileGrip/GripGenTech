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
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import { useState } from "react";
import { topAndMissingSkills as chartdata } from "../../../data/analyticsData";
import { Box } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,

  maintainAspectRatio: false,
};
const TopMissingChart = ({ select }) => {
  const [datasetValue, setDatasetValue] = useState(chartdata["top"]);
  useEffect(() => {
    if (select === "top") {
      setDatasetValue(chartdata["top"]);
    } else {
      setDatasetValue(chartdata["missing"]);
    }
  }, [select]);
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
      <Bar options={options} data={datasetValue} />
    </Box>
  );
};

export default TopMissingChart;
