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

const ProfileChart = ({ profileCompletedData }) => {
  const data = {
    labels: ["Completed", "Uncompleted"],
    datasets: [
      {
        label: "Percentage %",
        data: profileCompletedData,
        backgroundColor: ["#B395F6", "#AADCFE"],
        borderColor: ["#B395F6", "#AADCFE"],
        borderWidth: 1,
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
      <Doughnut
        data={data}
        options={options}
        // style={{ height: "100%", width: "100%" }}
      />
    </Box>
  );
};

export default ProfileChart;
