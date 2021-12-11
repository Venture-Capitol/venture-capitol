import { dropRight, keysIn } from "cypress/types/lodash";
import { nanoid } from "nanoid";
import React, { FC, useState, useContext, useEffect } from "react";
import { data, Node } from "../../../steps/connectons";

type NodesContextType = {
	nodes: Node[];
	setNodes: (value: Node[]) => void;
};

type InitialNodeContextType = {
	initialNode: string;
	setInitialNode: (value: string) => void;
};

type CurrentNodeContextType = {
	currentNode: string;
	setCurrentNode: (value: string) => void;
};

const NodesContext = React.createContext<NodesContextType | undefined>(
	undefined
);
const InitialNodeContext = React.createContext<
	InitialNodeContextType | undefined
>(undefined);
const CurrentNodeContext = React.createContext<
	CurrentNodeContextType | undefined
>(undefined);

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
	const [nodes, setNodes] = useState<Node[]>([]);
	const [initialNode, setInitialNode] = useState(data.initialNode);
	const [currentNode, setCurrentNode] = useState(data.initialNode);

	useEffect(() => {
		let nodes: Node[] = data.nodes;

		const setDecisionForNodesInDecisionPath = (id: string, node: Node) => {
			node.next.forEach(nextNodeId => {
				const nextNode = nodes.find(x => {
					return x.id == nextNodeId;
				});

				if (nextNode && nextNode.path != undefined) {
					nextNode.decision = id;

					setDecisionForNodesInDecisionPath(id, nextNode);
				}
			});
		};

		const setDecisionCount = (node: Node) => {
			node.leftNodeCount = nodes.filter(x => {
				return x.decision == node.id && x.path == "left";
			}).length;

			node.rightNodeCount = nodes.filter(x => {
				return x.decision == node.id && x.path == "right";
			}).length;

			node.maxNodeCount = Math.max(node.leftNodeCount, node.rightNodeCount);
		};

		const addEmptyNodes = (node: Node) => {
			if (node.maxNodeCount == undefined) {
				return;
			}

			// fill left side with empty nodes
			if (
				node.leftNodeCount != undefined &&
				node.leftNodeCount < node.maxNodeCount
			) {
				let decisionLastNextId = "";
				let firstEmptyId = nanoid();

				if (node.leftNodeCount == 0) {
					decisionLastNextId = node.next.splice(
						node.next.indexOf(
							nodes.find(x => {
								return node.next.includes(x.id) && x.path == "left";
							})?.id || ""
						),
						1
					)[0];
					node.next.push(firstEmptyId);
				} else {
					let nextId = nodes.find(x => {
						return node.next.includes(x.id) && x.path == "left";
					})?.id;
					for (let index = 0; index < node.leftNodeCount; index++) {
						let currentNode = nodes.find(x => {
							return x.id == nextId;
						});

						nextId = currentNode?.next[0] || "";
						if (index == node.leftNodeCount - 1) {
							decisionLastNextId = currentNode?.next[0] || "";
							if (currentNode) currentNode.next = [firstEmptyId];
						}
					}
				}

				let lastNextId = nanoid();
				for (
					let index = 0;
					index < node.maxNodeCount - node.leftNodeCount;
					index++
				) {
					let emptyId = lastNextId;
					let nextId = nanoid();
					if (index == 0) {
						emptyId = firstEmptyId;
					}
					if (index == node.maxNodeCount - node.leftNodeCount - 1) {
						nextId = decisionLastNextId;
					}

					nodes.push({
						id: emptyId,
						type: "emptyNode",
						decision: node.id,
						path: "left",
						name: "",
						next: [nextId],
					});

					lastNextId = nextId;
				}
			}
		};

		nodes.forEach(node => {
			if (node.type == "decision") {
				setDecisionForNodesInDecisionPath(node.id, node);
				setDecisionCount(node);
				addEmptyNodes(node);
			}
		});

		setNodes(nodes);
		return () => {};
	}, [data]);

	return (
		<NodesContext.Provider value={{ nodes, setNodes }}>
			<InitialNodeContext.Provider value={{ initialNode, setInitialNode }}>
				<CurrentNodeContext.Provider value={{ currentNode, setCurrentNode }}>
					{children}
				</CurrentNodeContext.Provider>
			</InitialNodeContext.Provider>
		</NodesContext.Provider>
	);
};

export default TaskListProvider;
