import { FunctionComponent, useState, MouseEvent } from "react";
import styles from "./TaskNode.module.scss";
import checkmarkIcon from "../../../assets/checkmark.svg";
import { useHistory } from "react-router-dom";

export interface TaskProps {
	id: string;
	name: string;
	next: string[];
	url: string;
}

const Task: FunctionComponent<TaskProps> = ({ id, name, next, url }) => {
	const [inputId] = useState(Math.random().toString());
	const [checked, setChecked] = useState(false);

	const history = useHistory();

	function handleClick(e: MouseEvent<HTMLDivElement>) {
		history.push(url);
	}

	return (
		<div
			className={`${styles.task} box`}
			data-task
			data-checked={checked}
			data-id={id}
			data-next={next}
			onClick={handleClick}
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
			<span>{name}</span>
		</div>
	);
};

export default Task;
