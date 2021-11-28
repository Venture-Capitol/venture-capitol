import React from "react";
import Decision from "../components/TaskList/Decision/Decision";
import DecisionNode from "../components/TaskList/DecisionNode/DecisionNode";
import DecisionPath from "../components/TaskList/DecisionPath/DecisionPath";
import Task from "../components/TaskList/Task/Task";

const Connections = () => {
	return (
		<>
			<Task id='1' next={["2"]}>
				Test 1
			</Task>
			<Decision>
				<DecisionNode id='2' next={["3", "5"]}>
					Test 2
				</DecisionNode>
				<DecisionPath></DecisionPath>
				<DecisionPath>
					<Task id='3' next={["4"]}>
						Test 3
					</Task>
					<Task id='4' next={["5"]}>
						Test 4
					</Task>
				</DecisionPath>
			</Decision>
			<Decision>
				<DecisionNode id='5' next={["6", "7"]}>
					Test 5
				</DecisionNode>
				<DecisionPath>
					<Task id='6' next={["8"]}>
						Test 6
					</Task>
				</DecisionPath>
				<DecisionPath>
					<Task id='7' next={["8"]}>
						Test 7
					</Task>
				</DecisionPath>
			</Decision>
			<Decision>
				<DecisionNode id='8' next={["9", "11"]}>
					Test 8
				</DecisionNode>
				<DecisionPath>
					<Task id='9' next={["10"]}>
						Test 9
					</Task>
					<Task id='10' next={["14"]}>
						Test 10123123 asdhjaksdh
					</Task>
				</DecisionPath>
				<DecisionPath>
					<Task id='11' next={["12"]}>
						Test 11
					</Task>
					<Task id='12' next={["13"]}>
						Test 12
					</Task>
					<Task id='13' next={["14"]}>
						Test 13
					</Task>
				</DecisionPath>
			</Decision>
			<Task id='14' next={[]}>
				Test 14
			</Task>
		</>
	);
};

export default Connections;
