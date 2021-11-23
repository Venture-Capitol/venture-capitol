import { SVG, Svg } from "@svgdotjs/svg.js";
import { useResizeObserver } from "@vc/frontend/util/useResizeObserver";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./TaskList.module.scss";
import data from "../../steps/connections.json";
import Task from "./Task/Task";
import EmptyNode from "./EmptyNode/EmptyNode";

interface Node {
	id: number;
	name: string;
	next: number[];
	row?: number;
}

interface Connection {
	source: number;
	target: number;
	rowDif: number;
}

const TaskList: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const { ref: rowsRef, domRect: svgContainerRect } =
		useResizeObserver<HTMLDivElement>();
	const [draw, setDaw] = useState<Svg>();
	const [nodes, setNodes] = useState<Node[]>([]);
	const [connections, setConnections] = useState<Connection[]>([]);
	const [rows, setRows] = useState<Node[][]>([]);

	useEffect(() => {
		let n = calcNodes();
		let c = calcConnections(n);
		let r = calcRows(n);
		setNodes(n);
		setConnections(c);
		setRows(r);
		return () => {};
	}, []);

	/**
	 * Create a SVG.js singleton that survives component updates
	 */
	useEffect(() => {
		if (!svgContainerRef.current) return;
		if (!containerRef.current) return;

		// fixes hot reloading by removing previous svg elements
		svgContainerRef.current.innerHTML = "";

		const draw = SVG()
			.addTo(svgContainerRef.current)
			.size(
				containerRef.current.clientWidth,
				containerRef.current.clientHeight
			);
		setDaw(draw);
	}, [svgContainerRef, containerRef]);

	/**
	 * Draw the arrows between each rows elements
	 */
	useEffect(() => {
		if (!containerRef.current) return;
		if (!svgContainerRef.current) return;
		if (!rowsRef.current) return;
		if (!draw) return;
		if (!svgContainerRect) return;

		interface BoundingRect {
			x: number;
			y: number;
			w: number;
			h: number;
			isEmpty: boolean;
			id: number;
		}

		const containerBoundingBox = containerRef.current?.getBoundingClientRect();
		const rows = rowsRef.current.querySelectorAll("[data-row]");
		const rowsWithBoxes = [...rows].map(row => {
			return [...row.querySelectorAll("[data-task]")].map(box => {
				const isEmpty = box.hasAttribute("data-empty");
				const id = parseInt(box.getAttribute("data-id") || "0");
				const boundingBox = box.getBoundingClientRect();
				const relativeBoundingBox: BoundingRect = {
					x: boundingBox.x - containerBoundingBox.x,
					y: boundingBox.y - containerBoundingBox.y,
					w: boundingBox.width,
					h: boundingBox.height,
					isEmpty: isEmpty,
					id: id,
				};
				return relativeBoundingBox;
			});
		});

		draw.clear();
		draw.size(svgContainerRect.width, svgContainerRect.height);

		const drawPath = (a: BoundingRect, b: BoundingRect, drawArrow: boolean) => {
			let rAbs = (b.x + b.w / 2 - (a.x + a.w / 2)) / 2;
			const r = Math.abs(clamp(0, 20, Math.abs(rAbs)));

			// if bottom box x-center is left of top box x-center, 1 else -1
			const left = b.x + b.w / 2 - (a.x + a.w / 2) > 0 ? 1 : -1;

			if (drawArrow) {
				return draw
					.path(
						`M${a.x + a.w / 2},${a.y + a.h}` + // starting point
							`v${(b.y - (a.h + a.y)) / 2 - r}` + // move half of distance between top and bottom box downwards
							`a${r},${r} 0 0 ${left < 0 ? 1 : 0} ${left * r},${r}` + // draw the first quarter circle
							`h${b.x + b.w / 2 - (a.w / 2 + a.x) - 2 * r * left}` + // draw a horizontal line
							`a${r},${r} 0 0 ${left > 0 ? 1 : 0} ${left * r},${r}` + // draw the second quarter circle
							`v${(b.y - (a.h + a.y)) / 2 - r - 5}` // draw the last line down
					)
					.fill("none")
					.stroke({
						color: "#C5C1CD",
						width: 1.2,
						linecap: "round",
						linejoin: "round",
					})
					.marker("end", 10, 10, add => {
						// draw the bottom arrow
						add
							.polygon([
								[0, 3],
								[4, 5],
								[0, 7],
							])
							.move(5, 3)
							.scale(1.2)
							.fill("#C5C1CD");
					});
			} else {
				return draw
					.path(
						`M${a.x + a.w / 2},${a.y + a.h}` + // starting point
							`v${(b.y - (a.h + a.y)) / 2 - r}` + // move half of distance between top and bottom box downwards
							`a${r},${r} 0 0 ${left < 0 ? 1 : 0} ${left * r},${r}` + // draw the first quarter circle
							`h${b.x + b.w / 2 - (a.w / 2 + a.x) - 2 * r * left}` + // draw a horizontal line
							`a${r},${r} 0 0 ${left > 0 ? 1 : 0} ${left * r},${r}` + // draw the second quarter circle
							`v${(b.y - (a.h + a.y)) * 1.5 - r}` // draw the last line down
					)
					.fill("none")
					.stroke({
						color: "#C5C1CD",
						width: 1.2,
						linecap: "round",
						linejoin: "round",
					});
			}
		};

		let openConnections: Connection[] = [];
		rowsWithBoxes.forEach((row, index, rows) => {
			let c = connections
				.filter(c => {
					if (row.find(r => r.id == c.source)) {
						return c;
					}
				})
				.concat(openConnections);

			openConnections = [];
			c.forEach(c => {
				if (c.rowDif <= 1) {
					let src = row.find(r => r.id == c.source);
					let trg = rows[index + 1].find(r => r.id == c.target);
					if (src && trg) {
						drawPath(src, trg, true);
					} else if (trg) {
						src = row[0];
						drawPath(src, trg, true);
					} else if (row[0].isEmpty) {
						drawPath(row[0], rows[index + 1][0], false);
					}
				} else {
					openConnections.push({
						source: c.source,
						target: c.target,
						rowDif: c.rowDif - 1,
					});
					drawPath(rows[index][0], rows[index + 1][0], false);
				}
			});
		});
	}, [svgContainerRef, rowsRef, containerRef, draw, svgContainerRect]);

	function clamp(min: number, max: number, val: number): number {
		return Math.max(min, Math.min(max, val));
	}

	return (
		<div className={styles.taskList} ref={containerRef}>
			<div ref={svgContainerRef} className={styles.background}></div>
			<div ref={rowsRef} className={styles.rows}>
				{rows.map(row => {
					let gridStyle = "";
					switch (row.length) {
						case 1:
							gridStyle = styles.g_1;
							break;
						case 2:
							gridStyle = styles.g_2;
							break;
						default:
							break;
					}
					return (
						<div className={`${styles.row} ${gridStyle}`} data-row>
							{row.map((node, index) => {
								if (node.id == 0) {
									return <EmptyNode id={node.id} />;
								} else {
									return <Task id={node.id}>{node.name}</Task>;
								}
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

function calcNodes() {
	let n = data.nodes;
	const initialNode = n.find(x => x.id == data.initialNodeId) || n[0];
	n = addRowstoNodes(initialNode, n);
	return n;
}

function calcConnections(nodes: Node[]) {
	let connections: Connection[] = [];
	nodes.forEach(node => {
		node.next.forEach(nextId => {
			let n = nodes.find(x => x.id == nextId) || nodes[0];
			connections.push({
				source: node.id,
				target: nextId,
				rowDif: Math.abs((n.row || 0) - (node.row || 0)),
			});
		});
	});
	return connections;
}

function addRowstoNodes(initialNode: Node, nodes: Node[]) {
	const visitNode = (node: Node, depth: number) => {
		if (node.row == undefined || node.row < depth) {
			node.row = depth;
		}
		node.next.forEach(nextId =>
			visitNode(
				nodes.filter(node => {
					return node.id == nextId;
				})[0],
				depth + 1
			)
		);
	};
	visitNode(initialNode, 0);
	return nodes;
}

function calcRows(nodes: Node[]) {
	let rows: Node[][] = [];
	nodes.forEach(node => {
		if (rows[node.row || 0] == undefined) {
			rows[node.row || 0] = [node];
		} else {
			rows[node.row || 0].push(node);
		}
	});

	let lastRowNexts: Set<number> = new Set();
	rows.forEach((row, index, rows) => {
		let thisRowNexts: Set<number> = new Set();
		row.forEach(node => {
			lastRowNexts.delete(node.id);
			node.next.forEach(value => {
				thisRowNexts.add(value);
			});
		});

		if (lastRowNexts.size > 0) {
			rows[index].unshift({ id: 0, name: "", next: [], row: index });
			lastRowNexts.forEach(id => {
				thisRowNexts.add(id);
			});
		}
		lastRowNexts = thisRowNexts;
	});
	return rows;
}

export default TaskList;
