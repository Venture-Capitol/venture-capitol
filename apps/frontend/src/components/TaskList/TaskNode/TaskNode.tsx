import { FunctionComponent, useState } from "react";
import styles from "./TaskNode.module.scss";
import checkmarkIcon from "../../../assets/checkmark.svg";

export interface TaskProps {
	id: string;
	name: string;
	next: string[];
}

const Task: FunctionComponent<TaskProps> = ({ id, name, next }) => {
	const [inputId] = useState(Math.random().toString());
	const [checked, setChecked] = useState(false);

	return (
		<div
			className={`${styles.task} box`}
			data-task
			data-checked={checked}
			data-id={id}
			data-next={next}
		>
			<input
				checked={checked}
				onChange={e => setChecked(!checked)}
				type='checkbox'
				name='task_checked'
				id={inputId}
			/>
			<label htmlFor={inputId}>
				<img src={checkmarkIcon} alt='' />
			</label>
			<p>{name}</p>
		</div>
	);
};

export default Task;
