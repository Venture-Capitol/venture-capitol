import React, { FC, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import styles from "./DecisionNode.module.scss";
export interface DecisionNodeProps {
	id: string;
	name: string;
	next: string[];
	url: string;
	path?: number;
}
const DecisionNode: FC<DecisionNodeProps> = ({ id, name, next, url, path }) => {
	const history = useHistory();

	function handleClick(e: MouseEvent<HTMLDivElement>) {
		history.push(url);
	}

	return (
		<div
			className={styles.decision_node}
			data-decision
			data-id={id}
			data-next={next}
			data-checked={path !== undefined}
			onClick={handleClick}
		>
			<span>{name}</span>
		</div>
	);
};

export default DecisionNode;
