import { FunctionComponent, useState, MouseEvent, useMemo } from "react";
import styles from "./TaskNode.module.scss";
import checkmarkIcon from "../../../assets/checkmark.svg";
import { useHistory } from "react-router-dom";
import { use } from "chai";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";

export interface TaskProps {
	id: string;
	name: string;
	next: string[];
	url: string;
	checked: boolean;
}

const Task: FunctionComponent<TaskProps> = ({
	id,
	name,
	next,
	url,
	checked,
}) => {
	const [inputId] = useState(Math.random().toString());
	const { setTaskStatus } = useGruendungContext();

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
				onChange={e => setTaskStatus(id, !checked)}
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
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M5 13l4 4L19 7'
					/>
				</svg>{" "}
			</label>
			<span>{name}</span>
		</div>
	);
};

export default Task;

interface TaskNodeContainerProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	checked: boolean;
	id?: string;
	text: string;
	clickEverywhere?: boolean;
}
export function TaskNodeContainer({
	onChange,
	onClick,
	checked,
	id,
	text,
}: TaskNodeContainerProps) {
	const [inputId] = useMemo(() => [Math.random().toString()], []);

	return (
		<div
			className={`${styles.task} box`}
			data-checked={checked}
			data-id={id}
			onClick={onClick}
		>
			<input
				checked={checked}
				onChange={onChange}
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
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M5 13l4 4L19 7'
					/>
				</svg>{" "}
			</label>
			<span>{text}</span>
		</div>
	);
}
