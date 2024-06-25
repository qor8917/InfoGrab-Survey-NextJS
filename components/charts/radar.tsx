"use client";
import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { fators, getMenData, getwomenData } from "@/utils/chart";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({ surveyData, gene }: any) {
  const menData = getMenData(surveyData, gene);
  const womenData = getwomenData(surveyData, gene);
  const menSum = menData.reduce(
    (acc: any, { q3a1, q3a2, q3a3, q3a4, q3a5 }: any) => {
      acc["total1"] = (acc["total1"] ?? 0) + parseInt(q3a1);
      acc["total2"] = (acc["total2"] ?? 0) + parseInt(q3a2);
      acc["total3"] = (acc["total3"] ?? 0) + parseInt(q3a3);
      acc["total4"] = (acc["total4"] ?? 0) + parseInt(q3a4);
      acc["total5"] = (acc["total5"] ?? 0) + parseInt(q3a5);
      return acc;
    },
    {}
  );
  const womenSum = womenData.reduce(
    (acc: any, { q3a1, q3a2, q3a3, q3a4, q3a5 }: any) => {
      acc["total1"] = (acc["total1"] ?? 0) + parseInt(q3a1);
      acc["total2"] = (acc["total2"] ?? 0) + parseInt(q3a2);
      acc["total3"] = (acc["total3"] ?? 0) + parseInt(q3a3);
      acc["total4"] = (acc["total4"] ?? 0) + parseInt(q3a4);
      acc["total5"] = (acc["total5"] ?? 0) + parseInt(q3a5);
      return acc;
    },
    {}
  );
  const menResult = Object.values(menSum);
  const womenResult = Object.values(womenSum);
  const data = {
    labels: fators,
    datasets: [
      {
        label: "남성",
        data: menResult,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 2,
      },
      {
        label: "여성",
        data: womenResult,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };
  const option = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Radar options={option} data={data} />;
}
