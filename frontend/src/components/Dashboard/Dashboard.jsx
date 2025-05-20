import useUserContext from "../../hooks/useUserContext";
import useSidebarContext from "../../hooks/useSidebarContext";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import "./Dashboard.css";

axios.defaults.withCredentials = true;
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Dashboard() {
	const [transactions, setTransactions] = useState([]);
	const [chartInfo, setChartInfo] = useState([]);
	const { user } = useUserContext();
	const { open } = useSidebarContext();

	useEffect(() => {
		if (!user) return;

		(async () => {
			let res = await axios.get("http://localhost:3000/transactions/getTransactions/2025/4");
			setTransactions(res.data);
			res = await axios.get("http://localhost:3000/transactions/getChartInfo/2025/4");
			setChartInfo(res.data);
		})();
	}, []);

	if (!user) {
		return (
			<div className="page">
				<div className="message">
					<h2>Effettua l'accesso per visualizzare questa pagina.</h2>
				</div>
			</div>
		);
	}

	const bodyRows = transactions.map((movement, index) => {
		return (
			<tr key={index}>
				<td>
					<h3>{movement.date}</h3>
				</td>
				<td>
					<h3>{movement.description}</h3>
				</td>
				<td>
					<h3>{movement.category}</h3>
				</td>
				<td className="amount">
					<h3>{"€" + movement.amount}</h3>
				</td>
			</tr>
		);
	});

	const backgroundColors = [
		"hsl(10, 70%, 60%)",
		"hsl(230, 60%, 55%)",
		"hsl(90, 50%, 60%)",
		"hsl(290, 50%, 60%)",
		"hsl(150, 30%, 60%)",
		"hsl(250, 70%, 60%)",
		"hsl(30, 80%, 65%)",
		"hsl(170, 50%, 65%)",
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
		"hsl(160, 40%, 65%)",
	];

	const chartData = {
		labels: chartInfo.map((category) => category.category),
		datasets: [
			{
				data: chartInfo.map((category) => category.amount),
				percentage: chartInfo.map((category) => category.percentage),
				backgroundColor: backgroundColors,
				borderColor: "#181818",
				borderWidth: 2,
			},
		],
	};

	const chartOptions = {
		layout: {
			padding: {
				left: 120,
				right: 120,
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
			tooltip: {
				bodyAlign: "right",
				callbacks: {
					label: function (tooltipItem) {
						return [
							`€${
								tooltipItem.dataset.data[tooltipItem.dataIndex]
							}`,
							`${
								tooltipItem.dataset.percentage[
									tooltipItem.dataIndex
								]
							}%`,
						];
					},
					title: () => "",
				},
				displayColors: false,
				bodyFont: {
					size: 16,
					family: "Quicksand",
				},
			},
			datalabels: {
				color: "#ffffff",
				anchor: "end",
				align: "end",
				offset: 10,
				font: {
					size: 16,
					family: "Quicksand",
				},
				formatter: (_, context) => {
					return context.chart.data.labels[context.dataIndex];
				},
			},
		},
	};

	return (
		<div className={open ? "page-reduced" : "page"}  >
			{transactions.length > 0 ? (
				<div id="db">
					<div className="db-child">
						<table id="transactions">
							<thead>
								<tr>
									<td>
										<h3>Data</h3>
									</td>
									<td>
										<h3>Descrizione</h3>
									</td>
									<td>
										<h3>Categoria</h3>
									</td>
									<td>
										<h3>Importo</h3>
									</td>
								</tr>
							</thead>
							<tbody>{bodyRows}</tbody>
						</table>
					</div>
					<div className="db-child">
						<div id="chart">
							<Doughnut data={chartData} options={chartOptions} />
						</div>
					</div>
				</div>
			) : (
				<div className="message">
					<h2>Nessun movimento registrato.</h2>
				</div>
			)}
		</div>
	);
}

export default Dashboard;
