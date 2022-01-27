import React, { FC, MouseEvent } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./DecisionNode.module.scss";
export interface DecisionNodeProps {
	id: string;
	name: string;
	next: string[];
	url: string;
	selectedPath?: number;
}
const DecisionNode: FC<DecisionNodeProps> = ({
	id,
	name,
	next,
	url,
	selectedPath,
}) => {
	const history = useHistory();
	const match = useRouteMatch("/gruendung/" + id);

	function handleClick(e: MouseEvent<HTMLDivElement>) {
		history.push(url);
	}

	return (
		<div
			className={styles.decision_node}
			data-decision
			data-id={id}
			data-next={next}
			data-selected={match !== null}
			data-checked={selectedPath !== undefined}
			onClick={handleClick}
		>
			<span>{name}</span>
		</div>
	);
};

export default DecisionNode;
