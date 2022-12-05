import React from "react";

import { Bar } from "react-chartjs-2";

export default function ColumnChart({ color }) {
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
  const data1 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ["30", "40", "26", "22", "18", "50"],
        backgroundColor: "#1975E3",
      },
    ],
  };

  const labels2 = ["January", "February", "March", "April", "May", "June"];
  const data2 = {
    labels2,
    datasets: [
      {
        label: "Dataset 1",
        data: ["30", "40", "26", "22", "18", "50"],
        backgroundColor: "#1975E3",
      },
    ],
  };

  return (
    <>
      {color === "1" && <Bar options={options} data={data1} />}
      {color === "2" && <Bar options={options} data={data1} />}
    </>
  );
}
