import { nanoid } from "nanoid";
import React, { FC, useState, useContext, useEffect } from "react";
import { taskGraph, Node, Nodes } from "../../steps/connections";

type ProcessContextType = {
	nodes: ProcessedTaskNodes;
	initialNodeId: string;
	unprocessedNodes: Nodes;
};

const ProcessContext = React.createContext<ProcessContextType>({
	initialNodeId: "",
	nodes: {},
	unprocessedNodes: taskGraph.nodes,
});

export function useProcessContext() {
	return useContext(ProcessContext);
}

export interface ProcessedTaskNode extends Node {
	id: string;
	decision?: string;
	path?: number;
	pathNodeCounts?: number[];
	pathMaxNodeCount?: number;
	prev: string[];
}

export interface ProcessedTaskNodes {
	[key: string]: ProcessedTaskNode;
}

interface ProcessedTaskGraph {
	initialNode: string;
	nodes: ProcessedTaskNodes;
}

const ProcessProvider: FC = ({ children }) => {
	const [nodes, setNodes] = useState<ProcessedTaskNodes>({});
	const [initialNodeId, setInitialNodeId] = useState("");

	let processedTaskGraph: ProcessedTaskGraph = {
		initialNode: taskGraph.initialNode,
		nodes: {},
	};

	// fill processedTaskGraph with nodes from taskGraph, add id and empty prev
	for (const [key, value] of Object.entries(taskGraph.nodes)) {
		processedTaskGraph.nodes[key] = {
			...value,
			next: [...value.next],
			id: key,
			prev: [],
		};
	}

	useEffect(() => {
		const nodes = processedTaskGraph.nodes;
		const initialNodeId = processedTaskGraph.initialNode;

		calcPrev();
		calcPath();

		Object.values(nodes).forEach(node => {
			if (node.type == "decision") {
				setDecisionForNodesInDecisionPath(node.id, node);
				addEmptyNodes(node);
			}
		});

		setNodes(nodes);
		setInitialNodeId(initialNodeId);

		// calculate previous nodes for each node
		function calcPrev() {
			Object.keys(nodes).forEach(nodeId => {
				nodes[nodeId].next.forEach(nextNodeId => {
					const nextNode = nodes[nextNodeId];
					if (!nextNode) {
						throw new Error(
							"Could not find node set as next with ID: " + nextNodeId
						);
					}

					nextNode.prev.push(nodeId);
				});
			});
		}

		// calculate path, in which nodes which come after a decision, land
		function calcPath() {
			// get all decision nodes
			const decisionNodes = Object.values(nodes).filter(node => {
				return node.next.length >= 2;
			});

			decisionNodes.forEach(decisionNode => {
				let pathNodeCounts: number[] = [];
				decisionNode.next.forEach((nextNodeId, index) => {
					const nodeCount = addPathToNode(index, nextNodeId, 0);
					pathNodeCounts.push(nodeCount);
				});
				nodes[decisionNode.id].pathNodeCounts = pathNodeCounts;
				nodes[decisionNode.id].pathMaxNodeCount = Math.max(...pathNodeCounts);
			});
		}

		// recursive add path to nodes and next in decision
		function addPathToNode(
			path: number,
			nodeId: string,
			count: number
		): number {
			let node = nodes[nodeId];
			console.log(nodeId, node);

			if (node.prev == undefined || node.prev.length > 1) {
				return count;
			}
			node.path = path;
			nodes[nodeId] = node;
			return addPathToNode(path, node.next[0], count + 1);
		}

		function setDecisionForNodesInDecisionPath(id: string, node: Node) {
			node.next.forEach(nextNodeId => {
				const nextNode = nodes[nextNodeId];

				if (nextNode && nextNode.path != undefined) {
					nextNode.decision = id;
					setDecisionForNodesInDecisionPath(id, nextNode);
				}
			});
		}

		function addEmptyNodes(node: ProcessedTaskNode) {
			if (
				node.pathMaxNodeCount == undefined ||
				node.pathNodeCounts == undefined
			) {
				return;
			}
			const pathMaxNodeCount = node.pathMaxNodeCount;
			const pathNodeCounts = node.pathNodeCounts;

			pathNodeCounts.forEach((nodeCount, index) => {
				if (nodeCount < pathMaxNodeCount) {
					let decisionLastNextId = "";
					let firstEmptyId = nanoid();

					if (nodeCount == 0) {
						decisionLastNextId = node.next.splice(
							node.next.indexOf(
								Object.values(nodes).find(x => {
									return node.next.includes(x.id) && x.path == index;
								})?.id || ""
							),
							1
						)[0];
						node.next.push(firstEmptyId);
					} else {
						let nextId = Object.values(nodes).find(x => {
							return node.next.includes(x.id) && x.path == index;
						})?.id;
						if (nextId != undefined) {
							for (let i = 0; i < nodeCount; i++) {
								let currentNode: Node = nodes[nextId!];
								nextId = currentNode.next[0];
								if (i == nodeCount - 1) {
									decisionLastNextId = currentNode.next[0];
									if (currentNode) currentNode.next = [firstEmptyId];
								}
							}
						}
					}

					let lastNextId = nanoid();
					for (let j = 0; j < pathMaxNodeCount - nodeCount; j++) {
						let emptyId = lastNextId;
						let nextId = nanoid();
						if (j == 0) {
							emptyId = firstEmptyId;
						}
						if (j == pathMaxNodeCount - nodeCount - 1) {
							nextId = decisionLastNextId;
						}

						nodes[emptyId] = {
							id: emptyId,
							type: "empty",
							decision: node.id,
							path: index,
							name: "",
							shortName: "",
							next: [nextId],
							prev: [],
						};

						lastNextId = nextId;
					}
				}
			});
		}
		return () => {};
	}, [taskGraph]);

	return (
		<ProcessContext.Provider
			value={{ nodes, initialNodeId, unprocessedNodes: taskGraph.nodes }}
		>
			{children}
		</ProcessContext.Provider>
	);
};

export default ProcessProvider;
