import React, { FC, MouseEvent } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./DecisionNode.module.scss";
export interface DecisionNodeProps {
	id: string;
	shortName: string;
	next: string[];
	url: string;
	selectedPath?: number;
	disabled: boolean;
}
const DecisionNode: FC<DecisionNodeProps> = ({
	id,
	shortName,
	next,
	url,
	selectedPath,
	disabled,
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
			data-disabled={disabled}
			onClick={handleClick}
		>
			<span>{shortName}</span>
		</div>
	);
};

export default DecisionNode;
