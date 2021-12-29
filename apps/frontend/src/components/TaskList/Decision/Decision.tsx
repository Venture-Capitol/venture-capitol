import { nanoid } from "nanoid";
import path from "path";
import React, { FC, ReactElement, useEffect, useState } from "react";
import DecisionNode, { DecisionNodeProps } from "../DecisionNode/DecisionNode";
import DecisionPath, { DecisionPathProps } from "../DecisionPath/DecisionPath";
import EmptyNode, { EmptyNodeProps } from "../EmptyNode/EmptyNode";
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
