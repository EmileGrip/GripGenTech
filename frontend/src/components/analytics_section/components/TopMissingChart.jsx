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
// import { topAndMissingSkills as chartdata } from "../../../data/analyticsData";
import { Box, CircularProgress } from "@mui/material";
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
const TopMissingChart = ({ select, topSkillsData, missingSkillsData }) => {
  const [datasetValue, setDatasetValue] = useState(null);

  const topSkills = {
    labels: topSkillsData?.labels,
    datasets: [
      {
        label: "Gap",
        data: topSkillsData?.data,
        borderColor: "rgb(170,220,254)",
        backgroundColor: "rgba(170,220,254,0.5)",
      },
    ],
  };

  const missingSkills = {
    labels: missingSkillsData?.labels,
    datasets: [
      {
        label: "Gap",
        data: missingSkillsData?.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    if (select === "top") {
      setDatasetValue(topSkills);
    } else {
      setDatasetValue(missingSkills);
    }
  }, [select, topSkillsData, missingSkillsData]);

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
      {!datasetValue && <CircularProgress />}
      {datasetValue && <Bar options={options} data={datasetValue} />}
    </Box>
  );
};

export default TopMissingChart;
