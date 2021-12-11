import React, { ReactElement } from "react";
import Decision from "../Decision/Decision";
import DecisionPath from "../DecisionPath/DecisionPath";
import EmptyNode from "../EmptyNode/EmptyNode";
import TaskNode from "../TaskNode/TaskNode";
import {
	useInitialNodeContext,
	useNodesContext,
} from "../TaskListContext/TaskListContext";
import { Node } from "../../../steps/connectons";

const Connections = () => {
	const nodes = useNodesContext();
	const initialNodeId = useInitialNodeContext();

	function getNodesForNodePath(decisionNode: Node, decisionPath: string) {
		let elements: ReactElement[] = [];

		let nextNodeId = nodes?.nodes.find(x => {
			return (
				x.decision == decisionNode.id &&
				x.path == decisionPath &&
				decisionNode.next.includes(x.id)
			);
		})?.id;

		for (let index = 0; index < (decisionNode.maxNodeCount || 0); index++) {
			let nextNode = nodes?.nodes.find(x => {
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

	function getNextFromDecision(node: Node): Node {
		let next = node.next[0];
		for (let index = 0; index < (node.maxNodeCount || 0); index++) {
			next =
				nodes?.nodes.find(x => {
					return x.id == next;
				})?.next[0] || next;
		}
		return (
			nodes?.nodes.find(x => {
				return x.id == next;
			}) || node
		);
	}

	function getComponent(node: Node): ReactElement {
		if (node.type == "task" && node.decision == undefined) {
			return (
				<>
					<TaskNode
						key={node.id}
						id={node.id}
						next={node.next}
						name={node.name}
					/>
					{node.next.map(x => {
						let nextNode = nodes?.nodes.find(y => {
							return y.id == x;
						});
						if (nextNode != undefined) return getComponent(nextNode);
					})}
				</>
			);
		} else if (node.type == "decision") {
			return (
				<>
					<Decision
						key={node.id}
						id={node.id}
						next={node.next}
						name={node.name}
					>
						<DecisionPath>{getNodesForNodePath(node, "left")}</DecisionPath>
						<DecisionPath>{getNodesForNodePath(node, "right")}</DecisionPath>
					</Decision>
					{getComponent(getNextFromDecision(node))}
				</>
			);
		} else if (node.type == "empty") {
			return (
				<>
					{node.next.map(x => {
						let nextNode = nodes?.nodes.find(y => {
							return y.id == x;
						});
						if (nextNode != undefined) return getComponent(nextNode);
					})}
				</>
			);
		} else return <></>;
	}

	let initialNode = nodes?.nodes.find(x => {
		return x.id == initialNodeId?.initialNode;
	});

	let nodeElement = <></>;
	if (initialNode != undefined) {
		nodeElement = getComponent(initialNode);
	}

	return <>{nodeElement}</>;
};

export default Connections;
