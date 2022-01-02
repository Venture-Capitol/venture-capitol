import React, { FC, ReactElement } from "react";
import DecisionNode from "../DecisionNode/DecisionNode";
import { DecisionPathProps } from "../DecisionPath/DecisionPath";
import styles from "./Decision.module.scss";

interface DecisionProps {
	id: string;
	name: string;
	next: string[];
	url: string;
	children: Array<ReactElement<DecisionPathProps>>;
}

const Decision: FC<DecisionProps> = ({ id, name, next, url, children }) => {
	return (
		<div className={styles.decision}>
			<DecisionNode id={id} name={name} next={next} url={url} />
			<div className={styles.decision_path_container}>{children}</div>
		</div>
	);
};

export default Decision;