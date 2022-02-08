import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/solid/esm";
import { TaskNodeContainer } from "@vc/frontend/component/TaskList/TaskNode/TaskNode";
import useMediaQuery from "@vc/frontend/util/useMediaQuery";
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
import { CompletedToggle } from "./subcomponents/CompletedToggle/CompletedToggle";

const Gruendung_TaskId = () => {
	const { unprocessedNodes, nodes, setDecisionStatus, currentCompany } =
		useGruendungContext();
	const [htmlContent, setHtmlContent] = useState<string | undefined>();
	const [loadingState, setLoadingState] = useState<
		undefined | "loading" | "error"
	>();
	let { task } = useParams<{ task: string }>();
	const isMobile = useMediaQuery("(max-width: 900px)");

	async function setMarkDownComponent() {
		setLoadingState("loading");

		try {
			const module = await import("../../steps/" + task + ".md");

			let html: string = module.html;
			if (currentCompany) {
				const removeCurrLFBrackets = html.replaceAll(
					new RegExp(
						"\\$" + currentCompany.legalForm.toLowerCase() + "\\{(.*?)\\}",
						"g"
					),
					"$1"
				);
				const removeOtherLFBrackets = removeCurrLFBrackets.replaceAll(
					/\$.*?\{(.*?)\}/g,
					""
				);
				setHtmlContent(removeOtherLFBrackets);
				setLoadingState(undefined);
			}
		} catch (error) {
			console.log(error);

			setLoadingState("error");
			setHtmlContent(undefined);
		}
	}

	useEffect(() => {
		setMarkDownComponent();

		document.querySelector(`[data-id="${task}"]`)?.scrollIntoView(false);
	}, [task, currentCompany]);

	return (
		<div className={s.splitView}>
			{!isMobile && (
				<div className={s.nav}>
					<TaskList />
				</div>
			)}

			<main className='content'>
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

				{/* back / forward navigation */}
				<div className={s.bottomNav}>
					{/* Go back */}
					{nodes[task]?.prev[0] && (
						<Link to={nodes[task].prev[0]} key={nodes[task].prev[0]}>
							<ArrowSmLeftIcon />
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
							<ArrowSmRightIcon />
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
