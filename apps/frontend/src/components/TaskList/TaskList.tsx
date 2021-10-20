import { SVG, Svg } from "@svgdotjs/svg.js";
import { useResizeObserver } from "@vc/frontend/util/useResizeObserver";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import s from "./TaskList.module.scss";
import Task from "./Task";

const TaskTree: FunctionComponent = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const { ref: rowsRef, domRect: svgContainerRect } =
		useResizeObserver<HTMLDivElement>();
	const [draw, setDaw] = useState<Svg>();

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
		}

		const containerBoundingBox = containerRef.current?.getBoundingClientRect();
		const rows = rowsRef.current.querySelectorAll("[data-row]");
		const rowsWithBoxes = [...rows].map(row => {
			return [...row.querySelectorAll("[data-task]")].map(box => {
				const boundingBox = box.getBoundingClientRect();
				const relativeBoundingBox: BoundingRect = {
					x: boundingBox.x - containerBoundingBox.x,
					y: boundingBox.y - containerBoundingBox.y,
					w: boundingBox.width,
					h: boundingBox.height,
				};
				return relativeBoundingBox;
			});
		});

		console.log(rows, rowsWithBoxes);

		draw.clear();
		draw.size(svgContainerRect.width, svgContainerRect.height);

		const drawPath = (a: BoundingRect, b: BoundingRect) => {
			let rAbs = (b.x + b.w / 2 - (a.x + a.w / 2)) / 2;

			const r = Math.abs(clamp(0, 20, Math.abs(rAbs)));

			// if bottom box x-center is left of top box x-center, 1 else -1
			const left = b.x + b.w / 2 - (a.x + a.w / 2) > 0 ? 1 : -1;

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
		};

		for (let i = 0; i < rowsWithBoxes.length - 1; i++) {
			rowsWithBoxes[i].forEach(box => {
				rowsWithBoxes[i + 1].forEach(nextBox => {
					drawPath(box, nextBox);
				});
			});
		}
	}, [svgContainerRef, rowsRef, containerRef, draw, svgContainerRect]);

	function clamp(min: number, max: number, val: number): number {
		return Math.max(min, Math.min(max, val));
	}

	return (
		<div className={s.taskList} ref={containerRef}>
			<div ref={svgContainerRef} className={s.background}></div>
			<div ref={rowsRef} className={s.rows}>
				<div className={s.row} data-row>
					<Task>Gesellschaftsvertrag</Task>
				</div>
				<div className={s.row} data-row>
					<Task>Musterprotokoll</Task>
					<Task>Protokoll vom Anwalt</Task>
				</div>
				<div className={s.row} data-row>
					<Task>Notartermin</Task>
				</div>
				<div className={s.row} data-row>
					<Task>Kontoeröffnung</Task>
				</div>
			</div>
		</div>
	);
};

export default TaskTree;
