import React, { FC } from "react";
import styles from "./DecisionNode.module.scss";
export interface DecisionNodeProps {
	children: string;
	id: string;
	next: string[];
}
const DecisionNode: FC<DecisionNodeProps> = ({ children, id, next }) => {
	return (
		<div
			className={styles.decision_node}
			data-decision
			data-id={id}
			data-next={next}
		>
			{children}
		</div>
	);
};

export default DecisionNode;
