import Button from "@vc/frontend/component/Button/Button";
import ProcessProvider, {
	useProcessContext,
} from "@vc/frontend/component/ProcessContext/ProcessContext";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskList from "../../components/TaskList/TaskList";
// import "./markdown.scss";
import s from "./Gruendung.module.scss";
import { CompletedToggle } from "./subcomponents/CompletedToggle/CompletedToggle";

const Content = () => {
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
			setLoadingState("error");
			setHtmlContent(undefined);
		}
	}

	useEffect(() => {
		setMarkDownComponent();
	}, [task]);

	const { unprocessedNodes } = useProcessContext();

	return (
		<div className={s.splitView}>
			<div className={s.nav}>
				<TaskList />
			</div>

			<main className={s.content + " markdown-body"}>
				<h1 className={s.header}>{unprocessedNodes[task].name}</h1>
				<CompletedToggle />

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
						<button onClick={() => setMarkDownComponent()}>Neu Laden</button>
					</div>
				)}

				{htmlContent && (
					<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
				)}

				{task &&
					unprocessedNodes[task] &&
					unprocessedNodes[task].next.map(next => {
						return (
							<Link to={next}>
								<button>Weiter zu {unprocessedNodes[next].shortName}</button>
							</Link>
						);
					})}
			</main>
		</div>
	);
};

export default Content;
