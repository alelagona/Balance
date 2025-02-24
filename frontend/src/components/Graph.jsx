import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "../style/Graph.css";

function Graph() {
  return (
    <div className="graph">
      <Doughnut
        data={{
          labels: ["a", "b", "c"],
          datasets: [
            {
              data: ["1", "2", "3"],
            }
          ]
        }}
      />
    </div>
  );
}

export default Graph;
