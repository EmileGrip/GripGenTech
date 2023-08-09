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
import { Bar, Line } from "react-chartjs-2";
// import { skillGapsArea as data } from "../../../data/analyticsData";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

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

const SkillGapsChartArea = ({ select, data }) => {
  const [datasetValue, setDatasetValue] = useState(null);
  const targetArrLength = data?.data?.target?.length;
  const targetByPercentage = Array(targetArrLength).fill(100);

  const skillGapsData = {
    labels: data?.labels,
    datasets: [
      {
        fill: true,
        label: "Score",
        data: data?.data?.score,
        backgroundColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        fill: true,
        label: "Target",
        data: data?.data?.target,
        backgroundColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const skillGapsDataByPercentage = {
    labels: data?.labels,
    datasets: [
      {
        fill: true,
        label: "Score",
        data: data?.data?.percentage,
        backgroundColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        fill: true,
        label: "Target",
        data: targetByPercentage,
        backgroundColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    if (select === "select__absolute") {
      setDatasetValue(skillGapsData);
    } else {
      setDatasetValue(skillGapsDataByPercentage);
    }
  }, [select, data]);

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

export default SkillGapsChartArea;
