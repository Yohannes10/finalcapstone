/* import React from "react";
import { Bar } from "react-chartjs-2";
import {LinearScale} from "react-chartjs-2-scales/lib/scales/LinearScale";
import {Chart as chartjs}from 'chart.js/auto'
const RatingSummary = ({ ratings }) => {
  // Convert ratings object to an array of labels and data
  const labels = Object.keys(ratings);
  const data = Object.values(ratings);

  // Define chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Rating",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    indexAxis: "y", // Display labels vertically
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Rating (%)",
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Rating (%)",
        },
      },
    },
  };

  return (
    <div>
      <h3>Rating Summary</h3>
      <div style={{ height: "300px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RatingSummary; */