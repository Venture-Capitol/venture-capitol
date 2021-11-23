import { FunctionComponent, useState } from "react";
import styles from "./Task.module.scss";
import checkmarkIcon from "../../../assets/checkmark.svg";

interface TaskProps {
	children: any;
	id: number;
}

const Task: FunctionComponent<TaskProps> = ({ children, id }) => {
	const [idt] = useState(Math.random().toString());
	const [checked, setChecked] = useState(false);

	return (
		<div
			className={`${styles.task} box`}
			data-task
			data-checked={checked}
			data-id={id}
		>
			<input
				checked={checked}
				onChange={e => setChecked(!checked)}
				type='checkbox'
				name='task_checked'
				id={idt}
			/>
			<label htmlFor={idt}>
				<img src={checkmarkIcon} alt='' />
			</label>
			<p>{children}</p>
		</div>
	);
};

export default Task;
