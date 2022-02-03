import { AuthContext, User } from "@vc/auth";
import axios from "axios";
import { nanoid } from "nanoid";
import React, { FC, useState, useContext, useEffect } from "react";
import { taskGraph, Node, Nodes } from "../../steps/connections";
import * as CompanyService from "./company";
import { GPF } from "@vc/api";
import { useAuthContext } from "@vc/auth/src/AuthContext";

// 🌍 Context

type GruendungContext = {
	nodes: ProcessedTaskNodes;
	initialNodeId: string;
	unprocessedNodes: Nodes;
	currentCompany?: Company;
	setTaskStatus(taskId: string, status: boolean): void;
	setDecisionStatus(decisionId: string, path?: number): void;
	createCompany(legalForm: string): void;
	clearCompany(): void;
};

const GruendungContext = React.createContext<GruendungContext>({
	initialNodeId: "",
	nodes: {},
	unprocessedNodes: taskGraph.nodes,
	setTaskStatus: () => {},
	setDecisionStatus: () => {},
	createCompany: () => {},
	clearCompany: () => {},
});

export function useGruendungContext() {
	return useContext(GruendungContext);
}

// 🔃 Task Graph

export interface ProcessedTaskNode extends Node {
	id: string;
	decision?: string;
	path?: number;
	pathNodeCounts?: number[];
	pathMaxNodeCount?: number;
	prev: string[];
	checked: boolean;
	selectedPath?: number;
}

export interface ProcessedTaskNodes {
	[key: string]: ProcessedTaskNode;
}

interface ProcessedTaskGraph {
	initialNode: string;
	nodes: ProcessedTaskNodes;
}

export interface Decision {
	id: string;
	path: number;
}

export interface Company {
	id?: string;
	legalForm: string;
}

// 💾 Provider

const GruendungContextProvider: FC = ({ children }) => {
	const [nodes, setNodes] = useState<ProcessedTaskNodes>({});
	const [initialNodeId, setInitialNodeId] = useState("");

	const [currentCompany, setCurrentCompany] = useState<Company>();
	const [completedTasks, setCompletedTasks] =
		useState<string[]>(loadCompletedTasks);
	const [madeDecisions, setMadeDecisions] = useState<Decision[]>(
		loadCompletedDecisions
	);
	const { user } = useAuthContext();

	// Load current company
	useEffect(() => {
		// If user is not logged in, try loading company from local storage
		if (user == undefined) {
			const loadedCompany = localStorage.getItem("company");
			if (loadedCompany) {
				setCurrentCompany(JSON.parse(loadedCompany));
			}
			return;
		}

		user?.getIdToken().then(idToken => {
			axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;

			// Otherwise, get company from API
			CompanyService.getCurrentCompany(user).then(company => {
				// if a company exists on the server, use it
				if (company != undefined) {
					setCurrentCompany({
						legalForm: company.legalForm,
						id: company.id,
					});
					setCompletedTasks(company.completedTasks.map(task => task.taskId));
					setMadeDecisions(
						company.madeDecisions.map(decision => ({
							id: decision.decisionId,
							path: decision.selectedPath,
						}))
					);
					return;
				}

				// If there is no remote company, but user has created one when logged out, save it
				if (currentCompany?.legalForm) {
					CompanyService.createCompany(currentCompany?.legalForm, {
						completedTasks,
						madeDecisions,
					});
				}
			});
		});
	}, [user]);

	function loadCompletedTasks() {
		let tasks = localStorage.getItem("tasks");
		if (tasks) {
			return JSON.parse(tasks);
		}
		return [];
	}

	function loadCompletedDecisions() {
		let decisions = localStorage.getItem("decisions");
		if (decisions) {
			return JSON.parse(decisions);
		}
		return [];
	}

	async function createCompany(legalForm: string) {
		if (user) {
			const company = await CompanyService.createCompany(legalForm);
			if (!company) return;

			setCurrentCompany({
				legalForm: company.legalForm,
				id: company.id,
			});
		} else {
			let tempCompany = {
				legalForm,
			};
			setCurrentCompany(tempCompany);
			localStorage.setItem("company", JSON.stringify(tempCompany));
		}
	}

	// Process task graph
	useEffect(() => {
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
				checked: completedTasks.find(task => task == key) != undefined,
				selectedPath: madeDecisions.find(decision => decision.id == key)?.path,
			};
		}

		const nodes = processedTaskGraph.nodes;

		calculatePreviousNodes(nodes);
		calcPath(nodes);
		Object.values(nodes).forEach(node => {
			if (node.type == "decision") {
				setDecisionForNodesInDecisionPath(node.id, node, nodes);
				addEmptyNodes(node, nodes);
			}
		});

		setNodes(nodes);
		setInitialNodeId(processedTaskGraph.initialNode);
	}, [taskGraph, completedTasks, madeDecisions]);

	/**
	 * Set wheter a task is done or not
	 * @param taskId id of the task to mark as either done or not
	 * @param status true if done, false if not
	 */
	function setTaskStatus(taskId: string, status: boolean) {
		let updatedTasks;
		if (status) {
			if (!completedTasks.find(task => task == taskId)) {
				updatedTasks = [...completedTasks, taskId];
				setCompletedTasks(updatedTasks);
			}

			if (currentCompany?.id) {
				GPF.markTaskDone(currentCompany.id, taskId);
			}
		} else {
			updatedTasks = completedTasks.filter(task => task !== taskId);
			setCompletedTasks(updatedTasks);
			if (currentCompany?.id) {
				GPF.undoTaskCompletion(currentCompany.id, taskId);
			}
		}

		window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	}

	/**
	 * Make a decision by selecting a path, or revoke it by setting path to undefined
	 * @param decisionId id of the decision
	 * @param path 0 or two, depending on the left or right branch, undefined if decision should be revoked
	 */
	function setDecisionStatus(decisionId: string, path?: number) {
		let changedDecisions;

		if (path != undefined) {
			changedDecisions = [
				...madeDecisions.filter(decision => decision.id !== decisionId),
				{ id: decisionId, path },
			];
			setMadeDecisions(changedDecisions);

			if (currentCompany?.id) {
				GPF.makeDecision(currentCompany?.id, decisionId, {
					selectedPath: path,
				});
			}
		} else {
			changedDecisions = [
				...madeDecisions.filter(decision => decision.id !== decisionId),
			];
			setMadeDecisions(changedDecisions);
			if (currentCompany?.id) {
				GPF.undoDecision(currentCompany?.id, decisionId);
			}
		}
		window.localStorage.setItem("decisions", JSON.stringify(changedDecisions));
	}

	/**
	 * Clear current company and reset states
	 */
	function clearCompany() {
		setNodes({});
		setInitialNodeId("");
		setCurrentCompany(undefined);
		setCompletedTasks([]);
		setMadeDecisions([]);
	}

	return (
		<GruendungContext.Provider
			value={{
				nodes,
				initialNodeId,
				unprocessedNodes: taskGraph.nodes,
				setTaskStatus,
				setDecisionStatus,
				currentCompany,
				createCompany,
				clearCompany,
			}}
		>
			{children}
		</GruendungContext.Provider>
	);
};

export default GruendungContextProvider;

// 🔃 Task Graph - Helper functions

/**
 * Modifies nodes in-place and adds previous node as field
 * @param nodes Nodes that will be modified
 */
function calculatePreviousNodes(nodes: ProcessedTaskNodes) {
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

/**
 * recursive add path to nodes and next in decision
 * @param path
 * @param nodeId
 * @param count
 * @returns
 */
function addPathToNode(
	path: number,
	nodeId: string,
	count: number,
	nodes: ProcessedTaskNodes
): number {
	let node = nodes[nodeId];

	if (node.prev == undefined || node.prev.length > 1) {
		return count;
	}
	node.path = path;
	return addPathToNode(path, node.next[0], count + 1, nodes);
}

/**
 * After a decision node, task in the decision tree get a path assigned. This function calculates, on which path each of those tasks land.
 * @param nodes Nodes that will be modified
 */
function calcPath(nodes: ProcessedTaskNodes) {
	// get all decision nodes
	const decisionNodes = Object.values(nodes).filter(node => {
		return node.next.length >= 2;
	});

	decisionNodes.forEach(decisionNode => {
		let pathNodeCounts: number[] = [];
		decisionNode.next.forEach((nextNodeId, index) => {
			const nodeCount = addPathToNode(index, nextNodeId, 0, nodes);
			pathNodeCounts.push(nodeCount);
		});
		nodes[decisionNode.id].pathNodeCounts = pathNodeCounts;
		nodes[decisionNode.id].pathMaxNodeCount = Math.max(...pathNodeCounts);
	});
}

/**
 * Set the correct decision id
 * @param id id of the decision
 * @param node node to modify
 * @param nodes all nodes
 */
function setDecisionForNodesInDecisionPath(
	id: string,
	node: Node,
	nodes: ProcessedTaskNodes
) {
	node.next.forEach(nextNodeId => {
		const nextNode = nodes[nextNodeId];

		if (nextNode && nextNode.path != undefined) {
			nextNode.decision = id;
			setDecisionForNodesInDecisionPath(id, nextNode, nodes);
		}
	});
}

/**
 * Adds empty nodes to a graph of nodes
 * @param node node to start on
 * @param nodes all nodes
 */
function addEmptyNodes(node: ProcessedTaskNode, nodes: ProcessedTaskNodes) {
	if (node.pathMaxNodeCount == undefined || node.pathNodeCounts == undefined) {
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
					checked: false,
				};

				lastNextId = nextId;
			}
		}
	});
}
