import { TaskNodeContainer } from "@vc/frontend/component/TaskList/TaskNode/TaskNode";
import Button from "@vc/ui/src/components/Button/Button";
import {
	ProcessedTaskNode,
	ProcessedTaskNodes,
	useGruendungContext,
} from "contexts/Gruendung/Gruendung";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskList from "../../components/TaskList/TaskList";
import s from "./Gruendung.module.scss";
import {
	CompletedToggle,
	Toggle,
} from "./subcomponents/CompletedToggle/CompletedToggle";

const Gruendung = () => {
	const [htmlContent, setHtmlContent] = useState<string | undefined>();
	const [loadingState, setLoadingState] = useState<
		undefined | "loading" | "error"
	>();
	let { task } = useParams<{ task: string }>();

	async function setMarkDownComponent() {
		setLoadingState("loading");

		try {
			const module = await import("../../steps/" + task + ".md");
			setHtmlContent(module.html);
			setLoadingState(undefined);
		} catch (error) {
			console.log(error);

			setLoadingState("error");
			setHtmlContent(undefined);
		}
	}

	useEffect(() => {
		setMarkDownComponent();
	}, [task]);

	const { unprocessedNodes, nodes, setDecisionStatus } = useGruendungContext();
	// const completed = nodes[props.taskId] ? nodes[props.taskId].checked : false;

	return (
		<div className={s.splitView}>
			<div className={s.nav}>
				<TaskList />
			</div>

			<main className={s.content + " markdown-body"}>
				<h1 className={s.header}>{unprocessedNodes[task].name}</h1>
				{unprocessedNodes[task].type == "task" && (
					<CompletedToggle taskId={task} />
				)}

				{loadingState == "loading" && (
					<div className={s.loadingIndicator}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				)}

				{loadingState == "error" && (
					<div>
						<p>Fehler beim Laden der Seite...</p>
						<div onClick={() => location.reload()}>
							<Button>Seite neu Laden</Button>
						</div>
					</div>
				)}

				{htmlContent && (
					<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
				)}

				{/* Show decision options for decision */}
				{task &&
					unprocessedNodes[task] &&
					unprocessedNodes[task].type == "decision" && (
						<div className={s.aside}>
							<TaskNodeContainer
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

				{/* back / forward navigation */}
				<div className={s.bottomNav}>
					{/* Go back */}
					{nodes[task]?.prev[0] && (
						<Link to={nodes[task].prev[0]} key={nodes[task].prev[0]}>
							<svg
								width='15'
								height='15'
								viewBox='0 0 15 15'
								fill='none'
								transform='scale(-1 1)'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
									fill='currentColor'
									fillRule='evenodd'
									clipRule='evenodd'
								></path>
							</svg>
							Zurück zu {nodes[nodes[task].prev[0]].shortName}
						</Link>
					)}

					{/* if not decision, go forward */}
					{nodes[task]?.type != "decision" && nodes[task]?.next[0] && (
						<Link
							to={unprocessedNodes[task].next[0]}
							key={unprocessedNodes[task].next[0]}
						>
							Weiter zu{" "}
							{unprocessedNodes[unprocessedNodes[task].next[0]].shortName}
							<svg
								width='15'
								height='15'
								viewBox='0 0 15 15'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
									fill='currentColor'
									fillRule='evenodd'
									clipRule='evenodd'
								></path>
							</svg>
						</Link>
					)}

					{/* if decision && selctedPath ? next : selectsomething */}
					{nodes[task]?.type == "decision" ? (
						nodes[task]?.selectedPath != undefined ? (
							<Link to={unprocessedNodes[task].next[nodes[task].selectedPath!]}>
								Weiter zu{" "}
								{
									unprocessedNodes[
										unprocessedNodes[task].next[nodes[task].selectedPath!]
									]?.shortName
								}
								<svg
									width='15'
									height='15'
									viewBox='0 0 15 15'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
										fill='currentColor'
										fillRule='evenodd'
										clipRule='evenodd'
									></path>
								</svg>
							</Link>
						) : (
							<a className={s.disabled}>
								Erst Auswahl treffen
								<svg
									width='15'
									height='15'
									viewBox='0 0 15 15'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
										fill='currentColor'
										fillRule='evenodd'
										clipRule='evenodd'
									></path>
								</svg>
							</a>
						)
					) : null}
				</div>
			</main>
		</div>
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
export default Gruendung;
