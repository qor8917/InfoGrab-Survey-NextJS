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
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const CHART_COLORS = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];
const labels = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
const groupByAge = (array: any) => {
  const grouped = array.reduce((acc: any, person: any) => {
    const { age } = person;
    if (!acc[age]) {
      acc[age] = [];
    }
    acc[age].push(person);
    return acc;
  }, {});

  const total = labels.map((la) => {
    const rows = grouped[la];
    let total: any = 0;
    if (rows?.length) {
      rows.forEach((row: any) => (total += parseInt(row.sum)));
    }
    return total ?? 0;
  });
  return total;
};
const StackChart = ({ surveyData }: any) => {
  const menData = surveyData.filter(({ sex }: { sex: string }) => sex === "M");
  const womenData = surveyData.filter(
    ({ sex }: { sex: string }) => sex !== "M"
  );

  const groupedMenPeople = groupByAge(menData);
  const groupedWomenPeople = groupByAge(womenData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: "white" },
      },
      y: {
        stacked: true,
        ticks: { color: "white" },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: `남자`,
        data: groupedMenPeople.map((value) => value),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 2,
      },
      {
        label: `여자`,
        data: groupedWomenPeople,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default StackChart;
