import Button from "@vc/ui/src/components/Button/Button";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Nodes } from "steps/connections";
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

				{/* Show button to proceed for tasks */}
				{task &&
					unprocessedNodes[task] &&
					unprocessedNodes[task].type == "task" &&
					unprocessedNodes[task].next.map(next => {
						return (
							<Link to={next} key={unprocessedNodes[next].shortName}>
								<Button>Weiter zu {unprocessedNodes[next].shortName}</Button>
							</Link>
						);
					})}

				{/* Show decision options for decision */}
				{task &&
					unprocessedNodes[task] &&
					unprocessedNodes[task].type == "decision" && (
						<>
							<Toggle
								checked={nodes[task]?.path == 0}
								onChange={active =>
									setDecisionStatus(task, active ? 0 : undefined)
								}
								textUnchecked={
									unprocessedNodes[unprocessedNodes[task].next[0]].shortName +
									" wählen"
								}
							/>
							<Toggle
								checked={nodes[task]?.path == 1}
								onChange={active =>
									setDecisionStatus(task, active ? 1 : undefined)
								}
								textUnchecked={
									unprocessedNodes[unprocessedNodes[task].next[1]].shortName +
									" wählen"
								}
							/>
						</>
					)}
			</main>
		</div>
	);
};

export default Gruendung;
