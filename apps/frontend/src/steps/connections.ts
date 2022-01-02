export interface Node {
	type: string;
	name: string;
	shortName: string;
	next: string[];
}

export interface Nodes {
	[key: string]: Node;
}

interface ConnectionsData {
	initialNode: string;
	nodes: Nodes;
}

export const taskGraph: ConnectionsData = {
	initialNode: "01_content",
	nodes: {
		"02_content": {
			name: "Test 2",
			shortName: "Test 2",
			type: "decision",
			next: ["03_content", "5"],
		},
		"01_content": {
			type: "task",
			name: "Test 1",
			shortName: "Test 1",
			next: ["02_content"],
		},
		"04_content": {
			type: "task",
			name: "Test 4",
			shortName: "Test 4",
			next: ["5"],
		},
		"03_content": {
			type: "task",
			name: "Test 3",
			shortName: "Test 3",
			next: ["04_content"],
		},
		"5": {
			type: "decision",
			name: "Test 5",
			shortName: "Test 5",
			next: ["6", "7"],
		},
		"6": {
			type: "task",
			name: "Test 6 ist etwas länger",
			shortName: "Test 6",
			next: ["8"],
		},
		"7": {
			type: "task",
			name: "Test 7",
			shortName: "Test 7",
			next: ["8"],
		},
		"8": {
			name: "Test 8",
			type: "decision",
			shortName: "Test 8",
			next: ["9", "11"],
		},
		"9": {
			type: "task",
			name: "Test 9 ist etwas länger",
			shortName: "Test 9",
			next: ["10"],
		},
		"10": {
			type: "task",
			name: "Test 10",
			shortName: "Test 10",
			next: ["14"],
		},
		"11": {
			type: "task",
			name: "Test 11",
			shortName: "Test 11",
			next: ["12"],
		},
		"12": {
			type: "task",
			name: "Test 12",
			shortName: "Test 12",
			next: ["13"],
		},
		"13": {
			type: "task",
			name: "Test 13",
			shortName: "Test 13",
			next: ["14"],
		},
		"14": {
			type: "task",
			name: "Test 14",
			shortName: "Test 14",
			next: [],
		},
	},
};
