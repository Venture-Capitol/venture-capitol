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

const DecisionPath: FC = ({ children }) => {
	return <div className={styles.decision_path}>{children}</div>;
};

export default DecisionPath;
