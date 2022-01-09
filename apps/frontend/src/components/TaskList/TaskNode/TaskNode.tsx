import { FunctionComponent, useState, MouseEvent } from "react";
import styles from "./TaskNode.module.scss";
import checkmarkIcon from "../../../assets/checkmark.svg";
import { useHistory } from "react-router-dom";

export interface TaskProps {
	id: string;
	shortName: string;
	next: string[];
	url: string;
}

const Task: FunctionComponent<TaskProps> = ({ id, shortName, next, url }) => {
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
				onClick={e => e.stopPropagation()}
				id={inputId}
			/>
			<label htmlFor={inputId} onClick={e => e.stopPropagation()}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M5 13l4 4L19 7'
					/>
				</svg>{" "}
			</label>
			<span>{shortName}</span>
		</div>
	);
};

export default Task;
