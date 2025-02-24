import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../style/Graph.css"

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Graph() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories/1/2025/2")
      .then((res) => res.json())
      .then((data) => {
        data.length > 0 ? setCategories(data) : setCategories([]);
      });
  }, []);

  const backgroundColors = [
    "hsl(10, 70%, 60%)",
    "hsl(230, 60%, 55%)",
    "hsl(90, 50%, 60%)",
    "hsl(150, 30%, 60%)",
    "hsl(250, 70%, 60%)",
    "hsl(30, 80%, 65%)",
    "hsl(170, 50%, 65%)",
    "hsl(290, 50%, 60%)",
    "hsl(40, 90%, 65%)",
    "hsl(130, 40%, 60%)",
    "hsl(50, 80%, 65%)",
    "hsl(20, 80%, 60%)",
    "hsl(210, 50%, 55%)",
    "hsl(270, 60%, 55%)",
    "hsl(330, 60%, 60%)",
    "hsl(190, 60%, 65%)",
    "hsl(110, 60%, 55%)",
    "hsl(350, 70%, 65%)",
    "hsl(70, 60%, 70%)",
    "hsl(160, 40%, 65%)"
  ];
  
  
  const chartData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.value),
        backgroundColor: backgroundColors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: {
        left: 100,
        right: 100,
      },
    },
    animation: {
      animateScale: true,
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        anchor: "end",
        align: "end",
        offset: 10,
        font: {
          size: 16,
          family: "Quicksand",
        },
        formatter: (value, context) => {
          let total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
          let percentage = ((value / total) * 100).toFixed(1) + "%";
          return `${context.chart.data.labels[context.dataIndex]}: ${percentage}`;
        },
      },
    },
  };

  return (
    <div className="graph">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}

export default Graph;
