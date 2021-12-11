import React, { FC, ReactElement } from "react";
import EmptyNode, { EmptyNodeProps } from "../EmptyNode/EmptyNode";
import { TaskProps } from "../TaskNode/TaskNode";
import styles from "./DecisionPath.module.scss";

export interface DecisionPathProps {
	children?:
		| ReactElement<TaskProps | EmptyNodeProps>
		| Array<ReactElement<TaskProps | EmptyNodeProps>>;
}

const DecisionPath: FC<DecisionPathProps> = ({ children }) => {
	return <div className={styles.decision_path}>{children}</div>;
};

export default DecisionPath;
