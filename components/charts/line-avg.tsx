"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { getMenData, getwomenData } from "@/utils/chart";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  annotationPlugin
);
const LineChart = ({ surveyData, gene }: any) => {
  const menData = getMenData(surveyData, gene);
  const womenData = getwomenData(surveyData, gene);

  const average = (values: any) => {
    return (
      values.reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0) /
      values.length
    );
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { grid: { display: false }, beginAtZero: true },
    },
    plugins: {
      annotation: {
        annotations: {
          annotation: {
            type: "line",
            borderDash: [6, 6],
            borderColor: "rgba(53, 162, 235, 0.5)",
            borderWidth: 2,
            label: {
              display: true,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              color: "black",
              content: (ctx: any) =>
                "Average: " +
                average(ctx.chart.data.datasets[0].data).toFixed(2),
              position: "end",
            },
            scaleID: "y",
            value: (ctx: any) => average(ctx.chart.data.datasets[0].data),
          },
          annotation2: {
            type: "line",
            borderColor: "rgba(255, 99, 132, 0.5)",
            borderDash: [6, 6],
            borderWidth: 2,
            label: {
              display: true,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              color: "black",
              content: (ctx: any) =>
                "Average: " +
                average(ctx.chart.data.datasets[1].data).toFixed(2),
              position: "end",
            },
            scaleID: "y",
            value: (ctx: any) => average(ctx.chart.data.datasets[1].data),
          },
        },
      },
    },
  };

  const data = {
    labels: new Array(Math.max(womenData.length, menData.length))
      .fill(0)
      .map((value: any, index: number) => index),
    datasets: [
      {
        label: "남성",
        data: menData.map(({ sum }: { sum: number }) => sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "여성",
        data: womenData.map(({ sum }: { sum: number }) => sum),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options as any} data={data} />;
};

export default LineChart;
