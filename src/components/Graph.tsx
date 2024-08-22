import React from 'react';
import 'chart.js/auto';
import { Line } from "react-chartjs-2";

interface GraphProps {
  data: number[];
}

export default function Graph(props: GraphProps) {
  const data = {
    labels: Array.from({ length: props.data.length }, (_, index) => index),
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: props.data,
      },
    ],
  };

  return <div><Line data={data} /></div>
}