import {
	DecisionNode,
	ProcessedTaskNode,
	useGruendungContext,
} from "contexts/Gruendung/Gruendung";
import React, { Fragment, ReactElement } from "react";
import Decision from "../Decision/Decision";
import DecisionPath from "../DecisionPath/DecisionPath";
import EmptyNode from "../EmptyNode/EmptyNode";
import TaskNode from "../TaskNode/TaskNode";

/**
 * Render the nodes of a task graph as dom elements
 */
const Nodes = () => {
	const { nodes, initialNodeId } = useGruendungContext();

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
							checked={nextNode.checked}
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
				<Fragment key={node.id}>
					<TaskNode
						id={node.id}
						next={node.next}
						name={node.name}
						url={node.id}
						checked={node.checked}
					/>
					{node.next.map(nextNodeId => {
						const nextNode = nodes[nextNodeId];
						if (nextNode != undefined) return getComponent(nextNode);
					})}
				</Fragment>
			);
		} else if (node.type == "decision") {
			const nextNode = getNextFromDecision(node);
			return (
				<Fragment key={node.id}>
					<Decision
						key={node.id}
						id={node.id}
						next={node.next}
						name={node.name}
						url={node.id}
						selectedPath={node.selectedPath}
					>
						{node.next.map((nodeNextId, index) => {
							return (
								<DecisionPath key={index}>
									{getNodesForNodePath(node, index)}
								</DecisionPath>
							);
						})}
					</Decision>
					{nextNode != undefined && getComponent(nextNode)}
				</Fragment>
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
