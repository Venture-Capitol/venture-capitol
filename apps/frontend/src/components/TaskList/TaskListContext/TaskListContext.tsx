import { dropRight, keysIn } from "cypress/types/lodash";
import { nanoid } from "nanoid";
import React, { FC, useState, useContext, useEffect } from "react";
import {
	ConnectionsData,
	data as rawData,
	Node,
	Nodes,
} from "../../../steps/connectons";

type NodesContextType = {
	nodes: Nodes;
	setNodes: (value: Nodes) => void;
};

type InitialNodeContextType = {
	initialNodeId: string;
	setInitialNodeId: (value: string) => void;
};

type CurrentNodeContextType = {
	currentNodeId: string;
	setCurrentNodeId: (value: string) => void;
};

const NodesContext = React.createContext<NodesContextType>({
	nodes: {},
	setNodes: () => {},
});
const InitialNodeContext = React.createContext<InitialNodeContextType>(null!);
const CurrentNodeContext = React.createContext<CurrentNodeContextType>(null!);

export function useNodesContext() {
	return useContext(NodesContext);
}

export function useInitialNodeContext() {
	return useContext(InitialNodeContext);
}

export function useCurrentNodeContext() {
	return useContext(CurrentNodeContext);
}

const TaskListProvider: FC = ({ children }) => {
	const [nodes, setNodes] = useState<Nodes>({});
	const [initialNodeId, setInitialNodeId] = useState("");
	const [currentNodeId, setCurrentNodeId] = useState("");

	useEffect(() => {
		const data: ConnectionsData = JSON.parse(JSON.stringify(rawData));
		let nodes = data.nodes;
		let initialNodeId = data.initialNode;

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
					if (nextNode) {
						if (nextNode.prev == undefined) {
							nextNode.prev = [nodeId];
						} else {
							nextNode.prev.push(nodeId);
						}
					}
				});
			});
		}

		// calculate path for nodes in decision
		function calcPath() {
			const decisionNodes = Object.values(nodes).filter(node => {
				return node.next.length >= 2;
			});
			decisionNodes.forEach(node => {
				let pathNodeCounts: number[] = [];
				node.next.forEach((nextNodeId, index) => {
					const nodeCount = addPathToNode(index, nextNodeId, 0);
					pathNodeCounts.push(nodeCount);
				});
				nodes[node.id].pathNodeCounts = pathNodeCounts;
				nodes[node.id].pathMaxNodeCount = Math.max(...pathNodeCounts);
			});
		}

		// recursive add path to nodes and next in decision
		function addPathToNode(
			path: number,
			nodeId: string,
			count: number
		): number {
			let node = nodes[nodeId];
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

		function addEmptyNodes(node: Node) {
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
							url: "",
							next: [nextId],
						};

						lastNextId = nextId;
					}
				}
			});
		}
		return () => {};
	}, [rawData]);

	return (
		<NodesContext.Provider value={{ nodes, setNodes }}>
			<InitialNodeContext.Provider value={{ initialNodeId, setInitialNodeId }}>
				<CurrentNodeContext.Provider
					value={{ currentNodeId, setCurrentNodeId }}
				>
					{children}
				</CurrentNodeContext.Provider>
			</InitialNodeContext.Provider>
		</NodesContext.Provider>
	);
};

export default TaskListProvider;
