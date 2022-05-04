import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/solid/esm";
import Feedback from "@vc/frontend/component/Feedback/Feedback";
import { TaskNodeContainer } from "@vc/frontend/component/TaskList/TaskNode/TaskNode";
import useMediaQuery from "@vc/frontend/util/useMediaQuery";
import Button from "@vc/ui/src/components/Button/Button";
import {
	ProcessedTaskNode,
	ProcessedTaskNodes,
	useGruendungContext,
} from "contexts/Gruendung/Gruendung";
import React, {
	Suspense,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import TaskList from "../../components/TaskList/TaskList";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import s from "./Gruendung.module.scss";
import BottomNav from "./subcomponents/BottomNav/BottomNav";
import { CompletedToggle } from "./subcomponents/CompletedToggle/CompletedToggle";

const Gruendung_TaskId = () => {
	const { unprocessedNodes, nodes, setDecisionStatus, currentCompany } =
		useGruendungContext();
	let { task } = useParams<{ task: string }>();
	const isMobile = useMediaQuery("(max-width: 950px)");
	const [currentPage, setCurrentPage] = useState<"details" | "overview">(
		"details"
	);
	const mainRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLDivElement>(null);

	const Content = useCallback(
		React.lazy(() => import("../../steps/" + task + ".mdx")),
		[task]
	);

	// scroll viewports to correct positions after navigation
	useEffect(() => {
		// setMarkDownComponent();
		setCurrentPage("details");

		// scroll details view to top
		document.querySelector('[data-role="main"]')?.scrollTo(0, 0);

		// scroll current task into view
		const taskEl = document.querySelector(`[data-id="${task}"]`) as HTMLElement;
		if (!taskEl) return;
		const topDist = taskEl.offsetTop - window.innerHeight / 3;
		navRef.current?.scrollTo(0, topDist);
	}, [task, currentCompany]);

	function applyHeaderOffset() {
		let offset: number;
		if (currentPage == "details") {
			offset = mainRef.current?.scrollTop ?? 0;
		} else {
			offset = navRef.current?.scrollTop ?? 0;
		}

		if (!isMobile) {
			offset = 0;
		}

		document
			.getElementById("header")
			?.animate([{ transform: "translateY(-" + offset + "px)" }], {
				fill: "forwards",
				duration: 0,
			});
	}

	useEffect(() => {
		document
			.getElementById("header")
			?.animate([{ transform: "translateY(0px)" }], {
				fill: "forwards",
				duration: 0,
			});
	}, [isMobile]);

	useEffect(applyHeaderOffset, [currentPage]);

	useEffect(() => {
		let e = () => {
			requestAnimationFrame(() => {
				applyHeaderOffset();
			});
		};
		mainRef.current?.addEventListener("scroll", e);
		return () => mainRef.current?.removeEventListener("scroll", e);
	}, [mainRef, currentPage]);

	useEffect(() => {
		let e = () => {
			requestAnimationFrame(applyHeaderOffset);
		};
		navRef.current?.addEventListener("scroll", e);
		return () => navRef.current?.removeEventListener("scroll", e);
	}, [navRef, currentPage]);

	return (
		<>
			<div className={s.wrapper}>
				<div className={s.splitView} data-details={currentPage == "details"}>
					<div className={s.nav} id='nav' ref={navRef}>
						<TaskList />
					</div>
					<main className='content' data-role='main' id='details' ref={mainRef}>
						<div className={s.topNav}>
							{nodes[task]?.prev[0] && (
								<Link to={nodes[task].prev[0]}>
									<ArrowSmLeftIcon />
									<span>
										Zurück zu <b>{nodes[nodes[task].prev[0]].shortName}</b>
									</span>
								</Link>
							)}
						</div>
						<h1 className={s.header}>{unprocessedNodes[task].name}</h1>
						<ErrorBoundary
							fallback={
								<div>
									<p>Fehler beim Laden der Seite...</p>
									<div onClick={() => location.reload()}>
										<Button>Seite neu Laden</Button>
									</div>
								</div>
							}
						>
							<Suspense
								fallback={
									<div className={s.loadingIndicator}>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
								}
							>
								<Content legalForm={currentCompany?.legalForm.toLowerCase()} />
							</Suspense>
						</ErrorBoundary>

						{unprocessedNodes[task].type == "task" && (
							<CompletedToggle taskId={task} />
						)}

						{/* Show decision options for decision */}
						{task &&
							unprocessedNodes[task] &&
							unprocessedNodes[task].type == "decision" && (
								<div className={s.aside}>
									<TaskNodeContainer
										type='radio'
										checked={nodes[task]?.selectedPath == 0}
										onChange={active =>
											setDecisionStatus(
												task,
												nodes[task]?.selectedPath == 0 ? undefined : 0
											)
										}
										onClick={() => {
											setDecisionStatus(
												task,
												nodes[task]?.selectedPath == 0 ? undefined : 0
											);
										}}
										text={
											nodes[task]?.selectedPath == 0
												? unprocessedNodes[unprocessedNodes[task].next[0]]
														.shortName + " gewählt"
												: unprocessedNodes[unprocessedNodes[task].next[0]]
														.shortName + " wählen"
										}
									/>
									<TaskNodeContainer
										type='radio'
										checked={nodes[task]?.selectedPath == 1}
										onChange={active => {
											console.log(active);
											setDecisionStatus(
												task,
												nodes[task]?.selectedPath == 1 ? undefined : 1
											);
										}}
										onClick={() => {
											setDecisionStatus(
												task,
												nodes[task]?.selectedPath == 1 ? undefined : 1
											);
										}}
										text={
											nodes[task]?.selectedPath == 1
												? unprocessedNodes[unprocessedNodes[task].next[1]]
														.shortName + " gewählt"
												: unprocessedNodes[unprocessedNodes[task].next[1]]
														.shortName + " wählen"
										}
									/>
								</div>
							)}

						<Feedback currentTask={task} />
						{/* back / forward navigation */}
						<div className={s.bottomNav}>
							{/* if not decision, go forward */}
							{nodes[task]?.type != "decision" && nodes[task]?.next[0] && (
								<Link
									to={unprocessedNodes[task].next[0]}
									key={unprocessedNodes[task].next[0]}
								>
									<span>
										Weiter zu {"  "}
										<b>
											{
												unprocessedNodes[unprocessedNodes[task].next[0]]
													.shortName
											}
										</b>
									</span>
									<ArrowSmRightIcon />
								</Link>
							)}
							{/* if decision && selctedPath ? next : selectsomething */}
							{nodes[task]?.type == "decision" ? (
								nodes[task]?.selectedPath != undefined ? (
									<Link
										to={unprocessedNodes[task].next[nodes[task].selectedPath!]}
									>
										<span>
											Weiter zu {"  "}
											<b>
												{
													unprocessedNodes[
														unprocessedNodes[task].next[
															nodes[task].selectedPath!
														]
													]?.shortName
												}
											</b>
										</span>
										<ArrowSmRightIcon />
									</Link>
								) : (
									<a className={s.disabled}>
										Erst Auswahl treffen
										<ArrowSmRightIcon />
									</a>
								)
							) : null}
						</div>
					</main>
				</div>
			</div>
			<BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	);
};

function findNextNode(
	nodes: ProcessedTaskNodes,
	node: string,
	selectedPath: number
): ProcessedTaskNode {
	let currNode = nodes[nodes[node].next[selectedPath]];

	while (currNode.type == "empty") {
		currNode = nodes[currNode.next[0]];
	}
	return currNode;
}
export default Gruendung_TaskId;
