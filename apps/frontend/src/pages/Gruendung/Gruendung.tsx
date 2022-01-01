import Button from "@vc/frontend/component/Button/Button";
import ProcessProvider, {
	useProcessContext,
} from "@vc/frontend/component/TaskList/ProcessContext/ProcessContext";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskList from "../../components/TaskList/TaskList";
// import "./markdown.scss";
import s from "./Gruendung.module.scss";

const Content = () => {
	const [htmlContent, setHtmlContent] = useState<string | undefined>();
	const [loadingState, setLoadingState] = useState<
		undefined | "loading" | "error"
	>();
	let { task } = useParams<{ task?: string }>();

	async function setMarkDownComponent() {
		console.log("test");

		try {
			setLoadingState("loading");
			const module = await import("../../steps/" + task + ".md");
			setHtmlContent(module.html);
			setLoadingState(undefined);
			console.log(" no error");
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
						<button onClick={() => setMarkDownComponent()}>Neu Laden</button>
					</div>
				)}

				{htmlContent && (
					<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
				)}

				{task &&
					unprocessedNodes[task] &&
					unprocessedNodes[task].next.map(next => {
						return <Link to={next}>{unprocessedNodes[next].shortName}</Link>;
					})}
			</main>
		</div>
	);
};

export default Content;
