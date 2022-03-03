import { useEffect, useRef } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "../utils/db.server";
import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle,
} from "chart.js";

Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle
);

interface Analytics {
	users: number;
	completedSteps: number;
	stepsPerUser: any;
}

export const loader: LoaderFunction = async () => {
	let [users, completedSteps, stepsPerUser] = await Promise.all([
		db.user.count(),
		db.completedTask.count(),
		db.completedTask.groupBy({
			_count: {
				taskId: true,
			},
			by: ["companyId"],
		}),
	]);

	const data: Analytics = {
		users,
		completedSteps,
		stepsPerUser,
	};

	return data;
};

export default function Index() {
	const data = useLoaderData<Analytics>();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	console.log(data);

	useEffect(() => {
		if (!canvasRef.current) return;

		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;

		console.log(data.stepsPerUser.map((company: any) => company._count.taskId));
		const myChart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: data.stepsPerUser.map((company: any) => company.companyId),
				datasets: [
					{
						label: "# of Votes",
						data: data.stepsPerUser.map(
							(company: any) => company._count.taskId
						),
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(255, 206, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(255, 159, 64, 0.2)",
						],
						borderColor: [
							"rgba(255, 99, 132, 1)",
							"rgba(54, 162, 235, 1)",
							"rgba(255, 206, 86, 1)",
							"rgba(75, 192, 192, 1)",
							"rgba(153, 102, 255, 1)",
							"rgba(255, 159, 64, 1)",
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});

		return () => myChart.destroy();
	}, [canvasRef]);
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Venture Capitol Dashboard</h1>

			<code>
				<table>
					<tbody>
						<tr>
							<td>Users</td>
							<td>
								<b>{data.users}</b>
							</td>
						</tr>
						<tr>
							<td>CompletedSteps</td>
							<td>
								<b>{data.completedSteps}</b>
							</td>
						</tr>
					</tbody>
				</table>
			</code>

			<canvas ref={canvasRef} id='myChart' width='400' height='200'></canvas>
		</div>
	);
}
