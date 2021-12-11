export interface Node {
	id: string;
	type: string;
	maxNodeCount?: number;
	leftNodeCount?: number;
	rightNodeCount?: number;
	decision?: string;
	path?: string;
	name: string;
	next: string[];
}

export let data = {
	initialNode: "1",
	nodes: [
		{
			id: "2",
			name: "Test 2",
			type: "decision",
			next: ["3", "5"],
		},
		{
			id: "1",
			type: "task",
			name: "Test 1",
			next: ["2"],
		},
		{
			id: "4",
			type: "task",
			name: "Test 4",
			path: "right",
			next: ["5"],
		},
		{
			id: "3",
			type: "task",
			name: "Test 3",
			path: "right",
			next: ["4"],
		},
		{
			id: "5",
			type: "decision",
			name: "Test 5",
			next: ["6", "7"],
		},
		{
			id: "6",
			type: "task",
			name: "Test 6",
			path: "left",
			next: ["8"],
		},
		{
			id: "7",
			type: "task",
			name: "Test 7",
			path: "right",
			next: ["8"],
		},
		{
			id: "8",
			name: "Test 8",
			type: "decision",
			next: ["9", "11"],
		},
		{
			id: "9",
			type: "task",
			name: "Test 9",
			path: "left",
			next: ["10"],
		},
		{
			id: "10",
			type: "task",
			name: "Test 10",
			path: "left",
			next: ["14"],
		},
		{
			id: "11",
			type: "task",
			name: "Test 11",
			path: "right",
			next: ["12"],
		},
		{
			id: "12",
			type: "task",
			name: "Test 12",
			path: "right",
			next: ["13"],
		},
		{
			id: "13",
			type: "task",
			name: "Test 13",
			path: "right",
			next: ["14"],
		},
		{
			id: "14",
			type: "task",
			name: "Test 14",
			next: [""],
		},
	],
};
