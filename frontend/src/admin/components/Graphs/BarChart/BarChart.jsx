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

export default function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ["30", "40", "26", "22", "18", "50"],
        backgroundColor: "#F07217",
      },
      {
        label: "Dataset 2",
        data: ["20", "28", "34", "36", "16", "44"],
        backgroundColor: "#0070E1",
      },
    ],
  };


  return <Bar options={options} data={data} />;
}
