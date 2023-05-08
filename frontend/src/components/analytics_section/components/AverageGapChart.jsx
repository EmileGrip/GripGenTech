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
import { averageGaplevel as chartdata } from "../../../data/analyticsData";
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

const AverageGapChart = ({ select }) => {
  const [datasetValue, setDatasetValue] = useState(chartdata["jobData"]);
  // const currentDataset = select === "select__job" ? dataset[0] : dataset[1];
  useEffect(() => {
    if (select === "select__job") {
      setDatasetValue(chartdata["jobData"]);
    } else {
      setDatasetValue(chartdata["skillData"]);
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

export default AverageGapChart;
