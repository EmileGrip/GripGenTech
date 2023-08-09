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
// import { averageGaplevel as chartdata } from "../../../data/analyticsData";
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

const AverageGapChart = ({
  select,
  jobAvgGapData,
  skillAvgGapData,
  employeeAvgGapData,
}) => {
  const [datasetValue, setDatasetValue] = useState(null);

  const jobData = {
    labels: jobAvgGapData?.labels,
    datasets: [
      {
        label: "Gap",
        data: jobAvgGapData?.data,
        borderColor: "rgb(170,220,254)",
        backgroundColor: "rgba(170,220,254,0.5)",
      },
    ],
  };

  const skillData = {
    labels: skillAvgGapData?.labels,
    datasets: [
      {
        label: "Gap",
        data: skillAvgGapData?.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const employeeData = {
    labels: employeeAvgGapData?.labels,
    datasets: [
      {
        label: "Gap",
        data: employeeAvgGapData?.data,
        borderColor: "rgb(99, 220, 132)",
        backgroundColor: "rgba(99, 220, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    if (select === "select__job") {
      setDatasetValue(jobData);
    } else if (select === "select__skill") {
      setDatasetValue(skillData);
    } else {
      setDatasetValue(employeeData);
    }
  }, [select, jobAvgGapData, skillAvgGapData]);

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

export default AverageGapChart;
