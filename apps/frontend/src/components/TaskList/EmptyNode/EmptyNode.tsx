import react, { FC } from "react";
import styles from "./EmptyNode.module.scss";

interface EmptyNodeProps {
	id: number;
}

const EmptyNode: FC<EmptyNodeProps> = ({ id }) => {
	return (
		<div
			className={`${styles.emptyNode} box`}
			data-task
			data-empty
			data-id={id}
		></div>
	);
};

export default EmptyNode;
