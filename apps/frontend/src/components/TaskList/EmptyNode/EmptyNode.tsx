import react, { FC } from "react";
import styles from "./EmptyNode.module.scss";

export interface EmptyNodeProps {
	id: string;
	next: string[];
}

const EmptyNode: FC<EmptyNodeProps> = ({ id, next }) => {
	return (
		<div
			className={`${styles.emptyNode} box`}
			data-empty
			data-id={id}
			data-next={next}
		></div>
	);
};

export default EmptyNode;
