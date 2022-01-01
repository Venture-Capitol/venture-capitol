import React, { ReactElement } from "react";
import Decision from "../Decision/Decision";
import DecisionPath from "../DecisionPath/DecisionPath";
import EmptyNode from "../EmptyNode/EmptyNode";
import TaskNode from "../TaskNode/TaskNode";
import {
	ProcessedTaskNode,
	ProcessedTaskNodes,
	useProcessContext,
} from "../ProcessContext/ProcessContext";
import { Node } from "../../../steps/connections";

const Nodes = () => {
	const { nodes, initialNodeId } = useProcessContext();

	function getNodesForNodePath(
		decisionNode: ProcessedTaskNode,
		decisionPath: number
	) {
		let elements: ReactElement[] = [];

		let nextNodeId = Object.values(nodes).find(x => {
			return (
				x.decision == decisionNode.id &&
				x.path == decisionPath &&
				decisionNode.next.includes(x.id)
			);
		})?.id;

		for (let index = 0; index < (decisionNode.pathMaxNodeCount || 0); index++) {
			let nextNode = Object.values(nodes).find(x => {
				return (
					x.decision == decisionNode.id &&
					x.path == decisionPath &&
					x.id == nextNodeId
				);
			});

			if (nextNode != undefined) {
				if (nextNode.type == "task") {
					elements.push(
						<TaskNode
							key={nextNode.id}
							id={nextNode.id}
							next={nextNode.next}
							name={nextNode.name}
							url={nextNode.id}
						/>
					);
				} else if (nextNode.type == "empty") {
					elements.push(
						<EmptyNode
							key={nextNode.id}
							id={nextNode.id}
							next={nextNode.next}
						/>
					);
				}
				nextNodeId = nextNode.next[0];
			}
		}
		return elements;
	}

	function getNextFromDecision(node: ProcessedTaskNode): ProcessedTaskNode {
		let next = node.next[0];
		for (let index = 0; index < (node.pathMaxNodeCount || 0); index++) {
			next = nodes[next].next[0];
		}
		return nodes[next];
	}

	function getComponent(node: ProcessedTaskNode): ReactElement {
		if (node.type == "task" && node.decision == undefined) {
			return (
				<>
					<TaskNode
						key={node.id}
						id={node.id}
						next={node.next}
						name={node.name}
						url={node.id}
					/>
					{node.next.map(nextNodeId => {
						const nextNode = nodes[nextNodeId];
						if (nextNode != undefined) return getComponent(nextNode);
					})}
				</>
			);
		} else if (node.type == "decision") {
			const nextNode = getNextFromDecision(node);

			return (
				<>
					<Decision
						key={node.id}
						id={node.id}
						next={node.next}
						name={node.name}
						url={node.id}
					>
						{node.next.map((nodeNextId, index) => {
							return (
								<DecisionPath>{getNodesForNodePath(node, index)}</DecisionPath>
							);
						})}
					</Decision>
					{nextNode != undefined && getComponent(nextNode)}
				</>
			);
		} else if (node.type == "empty") {
			return (
				<>
					{node.next.map(nextNodeId => {
						const nextNode = nodes[nextNodeId];
						if (nextNode != undefined) return getComponent(nextNode);
					})}
				</>
			);
		} else return <></>;
	}

	let initialNode = nodes[initialNodeId];

	let nodeElement = <></>;
	if (initialNode != undefined) {
		nodeElement = getComponent(initialNode);
	}
	return <>{nodeElement}</>;
};

export default Nodes;
