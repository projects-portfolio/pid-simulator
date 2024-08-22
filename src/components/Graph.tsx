import React from 'react';
import 'chart.js/auto';
import { Line } from "react-chartjs-2";

interface GraphProps {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

export default function Graph(props: GraphProps) {
  const data = {
    labels: props.data,
    datasets: [
      {
        label: props.label,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        data: props.data,
      },
    ],
  };

  return <div><Line data={data} /></div>
}