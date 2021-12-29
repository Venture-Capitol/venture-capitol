export interface Node {
	id: string;
	type: string;
	decision?: string;
	path?: number;
	pathNodeCounts?: number[];
	pathMaxNodeCount?: number;
	name: string;
	shortName: string;
	url: string;
	next: string[];
	prev?: string[];
}

export interface Nodes {
	[key: string]: Node;
}

export interface ConnectionsData {
	initialNode: string;
	nodes: Nodes;
}

export const data: ConnectionsData = {
	initialNode: "1",
	nodes: {
		"2": {
			id: "2",
			name: "Test 2",
			shortName: "Test 2",
			url: "test_2",
			type: "decision",
			next: ["3", "5"],
		},
		"1": {
			id: "1",
			type: "task",
			name: "Test 1",
			shortName: "Test 1",
			url: "test_1",
			next: ["2"],
		},
		"4": {
			id: "4",
			type: "task",
			name: "Test 4",
			shortName: "Test 4",
			url: "test_4",
			next: ["5"],
		},
		"3": {
			id: "3",
			type: "task",
			name: "Test 3",
			shortName: "Test 3",
			url: "test_3",
			next: ["4"],
		},
		"5": {
			id: "5",
			type: "decision",
			name: "Test 5",
			shortName: "Test 5",
			url: "test_5",
			next: ["6", "7"],
		},
		"6": {
			id: "6",
			type: "task",
			name: "Test 6 ist etwas länger",
			shortName: "Test 6",
			url: "test_6",
			next: ["8"],
		},
		"7": {
			id: "7",
			type: "task",
			name: "Test 7",
			shortName: "Test 7",
			url: "test_7",
			next: ["8"],
		},
		"8": {
			id: "8",
			name: "Test 8",
			type: "decision",
			shortName: "Test 8",
			url: "test_8",
			next: ["9", "11"],
		},
		"9": {
			id: "9",
			type: "task",
			name: "Test 9 ist etwas länger",
			shortName: "Test 9",
			url: "test_9",
			next: ["10"],
		},
		"10": {
			id: "10",
			type: "task",
			name: "Test 10",
			shortName: "Test 10",
			url: "test_10",
			next: ["14"],
		},
		"11": {
			id: "11",
			type: "task",
			name: "Test 11",
			shortName: "Test 11",
			url: "test_11",
			next: ["12"],
		},
		"12": {
			id: "12",
			type: "task",
			name: "Test 12",
			shortName: "Test 12",
			url: "test_12",
			next: ["13"],
		},
		"13": {
			id: "13",
			type: "task",
			name: "Test 13",
			shortName: "Test 13",
			url: "test_13",
			next: ["14"],
		},
		"14": {
			id: "14",
			type: "task",
			name: "Test 14",
			shortName: "Test 14",
			url: "test_14",
			next: [],
		},
	},
};
