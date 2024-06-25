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
const LineChartDeviation = ({ surveyData, gene }: any) => {
  const menData = getMenData(surveyData, gene);
  const womenData = getwomenData(surveyData, gene);

  const average = (values: any) => {
    return (
      values.reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0) /
      values.length
    );
  };
  function standardDeviation(values: any) {
    const n = values.length;
    const mean = average(values);
    return Math.sqrt(
      values
        .map((x: any) => Math.pow(x - mean, 2))
        .reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0) / n
    );
  }

  const annotation1 = {
    type: "line",
    borderColor: "rgba(53, 162, 235, 0.5)",
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 3,
    label: {
      display: true,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      color: "white",
      content: (ctx: any) =>
        (
          average(ctx.chart.data.datasets[0].data) +
          standardDeviation(ctx.chart.data.datasets[0].data)
        ).toFixed(2),
      position: "start",
      yAdjust: -16,
    },
    scaleID: "y",
    value: (ctx: any) =>
      average(ctx.chart.data.datasets[0].data) +
      standardDeviation(ctx.chart.data.datasets[0].data),
  };
  const annotation2 = {
    type: "line",
    borderColor: "rgba(53, 162, 235, 0.5)",
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 3,
    label: {
      display: true,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      color: "white",
      content: (ctx: any) =>
        (
          average(ctx.chart.data.datasets[0].data) -
          standardDeviation(ctx.chart.data.datasets[0].data)
        ).toFixed(2),
      position: "end",
      yAdjust: -16,
    },
    scaleID: "y",
    value: (ctx: any) =>
      average(ctx.chart.data.datasets[0].data) -
      standardDeviation(ctx.chart.data.datasets[0].data),
  };
  const annotation3 = {
    type: "line",
    borderColor: "rgba(255, 99, 132, 0.5)",
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 2,
    label: {
      display: true,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      color: "white",
      content: (ctx: any) =>
        (
          average(ctx.chart.data.datasets[1].data) +
          standardDeviation(ctx.chart.data.datasets[1].data)
        ).toFixed(2),
      position: "start",
      yAdjust: -16,
    },
    scaleID: "y",
    value: (ctx: any) =>
      average(ctx.chart.data.datasets[1].data) +
      standardDeviation(ctx.chart.data.datasets[1].data),
  };
  const annotation4 = {
    type: "line",
    borderColor: "rgba(255, 99, 132, 0.5)",
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 2,
    label: {
      display: true,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      color: "white",
      content: (ctx: any) =>
        (
          average(ctx.chart.data.datasets[1].data) -
          standardDeviation(ctx.chart.data.datasets[1].data)
        ).toFixed(2),
      position: "end",
      yAdjust: -16,
    },
    scaleID: "y",
    value: (ctx: any) =>
      average(ctx.chart.data.datasets[1].data) -
      standardDeviation(ctx.chart.data.datasets[1].data),
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        ticks: { color: "white" },
        grid: { display: false, color: "white" },
        beginAtZero: true,
        max: (ctx: any) =>
          average(ctx.chart.data.datasets[1].data) +
          standardDeviation(ctx.chart.data.datasets[1].data) +
          5,
      },

      x: { ticks: { color: "white" }, grid: {} },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      annotation: {
        annotations: {
          annotation1,
          annotation2,
          annotation3,
          annotation4,
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
        tension: 0.5,
      },
      {
        label: "여성",
        data: womenData.map(({ sum }: { sum: number }) => sum),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.5,
      },
    ],
  };
  return <Line options={options as any} data={data} />;
};

export default LineChartDeviation;
