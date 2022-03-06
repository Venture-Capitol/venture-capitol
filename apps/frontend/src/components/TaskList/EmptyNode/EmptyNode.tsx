import react, { FC } from "react";
import styles from "./EmptyNode.module.scss";

export interface EmptyNodeProps {
	id: string;
	next: string[];
	disabled: boolean;
}

const EmptyNode: FC<EmptyNodeProps> = ({ id, next, disabled }) => {
	return (
		<div
			className={`${styles.emptyNode} box`}
			data-empty
			data-id={id}
			data-next={next}
			data-disabled={disabled}
		></div>
	);
};

export default EmptyNode;
