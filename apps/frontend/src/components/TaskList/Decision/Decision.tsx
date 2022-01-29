import React, { FC, ReactElement } from "react";
import DecisionNode from "../DecisionNode/DecisionNode";
import { DecisionPathProps } from "../DecisionPath/DecisionPath";
import styles from "./Decision.module.scss";

interface DecisionProps {
	id: string;
	shortName: string;
	next: string[];
	url: string;
	children: Array<ReactElement<DecisionPathProps>>;
	selectedPath?: number;
}

const Decision: FC<DecisionProps> = ({
	id,
	shortName,
	next,
	url,
	children,
	selectedPath,
}) => {
	return (
		<div className={styles.decision}>
			<DecisionNode
				id={id}
				shortName={shortName}
				next={next}
				url={url}
				selectedPath={selectedPath}
			/>
			<div className={styles.decision_path_container}>{children}</div>
		</div>
	);
};

export default Decision;
