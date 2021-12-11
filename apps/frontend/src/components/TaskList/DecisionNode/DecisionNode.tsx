import React, { FC } from "react";
import styles from "./DecisionNode.module.scss";
export interface DecisionNodeProps {
	id: string;
	name: string;
	next: string[];
}
const DecisionNode: FC<DecisionNodeProps> = ({ id, name, next }) => {
	return (
		<div
			className={styles.decision_node}
			data-decision
			data-id={id}
			data-next={next}
		>
			{name}
		</div>
	);
};

export default DecisionNode;
