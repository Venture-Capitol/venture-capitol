import React, { FC, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import styles from "./DecisionNode.module.scss";
export interface DecisionNodeProps {
	id: string;
	shortName: string;
	next: string[];
	url: string;
}
const DecisionNode: FC<DecisionNodeProps> = ({ id, shortName, next, url }) => {
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
			onClick={handleClick}
		>
			<span>{shortName}</span>
		</div>
	);
};

export default DecisionNode;
