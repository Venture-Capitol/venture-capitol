import { FunctionComponent, useState } from "react";
import styles from "./Task.module.scss";
import checkmarkIcon from "../../../assets/checkmark.svg";

export interface TaskProps {
	children: string;
	id: string;
	next: string[];
}

const Task: FunctionComponent<TaskProps> = ({ children, id, next }) => {
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
			<p>{children}</p>
		</div>
	);
};

export default Task;
