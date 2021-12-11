import { SVG, Svg } from "@svgdotjs/svg.js";
import { useResizeObserver } from "@vc/frontend/util/useResizeObserver";
import React, { FC, useEffect, useRef, useState } from "react";
import Connections from "./Connections/Connections";
import styles from "./TaskList.module.scss";
import TaskListProvider from "./TaskListContext/TaskListContext";

const TaskList: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const { ref: taskListRef, domRect: svgContainerRect } =
		useResizeObserver<HTMLDivElement>();
	const [draw, setDaw] = useState<Svg>();

	useEffect(() => {
		if (!svgContainerRef.current) return;
		if (!containerRef.current) return;

		svgContainerRef.current.innerHTML = "";

		const draw = SVG()
			.addTo(svgContainerRef.current)
			.size(
				containerRef.current.clientWidth,
				containerRef.current.clientHeight
			);
		setDaw(draw);
	}, [svgContainerRef, containerRef]);

	useEffect(() => {
		renderArrows();
	}, [svgContainerRef, taskListRef, containerRef, draw, svgContainerRect]);

	function clamp(min: number, max: number, val: number): number {
		return Math.max(min, Math.min(max, val));
	}

	function renderArrows() {
		if (!containerRef.current) return;
		if (!svgContainerRef.current) return;
		if (!taskListRef.current) return;
		if (!draw) return;
		if (!svgContainerRect) return;

		interface BoundingRect {
			x: number;
			y: number;
			w: number;
			h: number;
			id: string;
			type: string;
			next: string[];
			isDisabled: boolean;
		}

		const containerBoundingBox = containerRef.current?.getBoundingClientRect();
		const boxesHtml = taskListRef.current.querySelectorAll(
			"[data-task], [data-decision], [data-empty]"
		);

		const boxes = [...boxesHtml].map(box => {
			let type = "undefined";
			if (box.hasAttribute("data-task")) {
				type = "task";
			} else if (box.hasAttribute("data-decision")) {
				type = "decision";
			} else if (box.hasAttribute("data-empty")) {
				type = "empty";
			}
			const id = box.getAttribute("data-id") || "-1";

			let isDisabled: boolean;
			if (
				box.hasAttribute("data-disabled") &&
				box.getAttribute("data-disabled") == "true"
			) {
				isDisabled = true;
			} else {
				isDisabled = false;
			}

			let nextAtr = box.getAttribute("data-next");

			let next: string[] = new Array();
			if (nextAtr != null && nextAtr.length > 0) {
				next = nextAtr.split(",");
			}

			const boundingBox = box.getBoundingClientRect();
			const relativeBoundingBox: BoundingRect = {
				x: boundingBox.x - containerBoundingBox.x,
				y: boundingBox.y - containerBoundingBox.y,
				w: boundingBox.width,
				h: boundingBox.height,
				type: type,
				id: id,
				next: next,
				isDisabled: isDisabled,
			};
			return relativeBoundingBox;
		});

		draw.clear();
		draw.size(svgContainerRect.width, svgContainerRect.height);

		const drawPath = (
			a: BoundingRect,
			b: BoundingRect,
			drawArrow: boolean,
			isDisabled: boolean
		) => {
			const color = isDisabled ? "#D0CBDD" : "#ABA7B4";
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
						color: color,
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
							.fill(color);
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
						color: color,
						width: 1.2,
						linecap: "round",
						linejoin: "round",
					});
			}
		};

		boxes.forEach(box => {
			box.next.forEach(next => {
				let nextBox = boxes.find(x => {
					return x.id == next;
				});
				if (nextBox) {
					const isDisabled = box.isDisabled || nextBox.isDisabled;

					if (nextBox.type == "empty") {
						drawPath(box, nextBox, false, isDisabled);
					} else {
						drawPath(box, nextBox, true, isDisabled);
					}
				}
			});
		});
	}

	return (
		<TaskListProvider>
			<div className={styles.taskListContainer} ref={containerRef}>
				<div className={styles.background} ref={svgContainerRef}></div>
				<div className={styles.taskList} ref={taskListRef}>
					<Connections />
				</div>
			</div>
		</TaskListProvider>
	);
};

export default TaskList;
