import React, { FC, ReactElement } from "react";
import EmptyNode, { EmptyNodeProps } from "../EmptyNode/EmptyNode";
import { TaskProps } from "../Task/Task";
import styles from "./DecisionPath.module.scss";

export interface DecisionPathProps {
	children?: ReactElement<TaskProps> | Array<ReactElement<TaskProps>>;
	emptyNodes?:
		| ReactElement<EmptyNodeProps>
		| Array<ReactElement<EmptyNodeProps>>;
}

const DecisionPath: FC<DecisionPathProps> = ({ children, emptyNodes }) => {
	return (
		<div className={styles.decision_path}>
			{children}
			{emptyNodes}
		</div>
	);
};

export default DecisionPath;
