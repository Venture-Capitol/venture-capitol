import { FunctionComponent, useState } from "react";
import s from "./Task.module.scss";
import checkmarkIcon from "./checkmark.svg";
import Button from "@vc/frontend/src/components/Button/Button";

const Task: FunctionComponent = ({ children }) => {
	const [id] = useState(Math.random().toString());
	const [checked, setChecked] = useState(false);

	return (
		<div className={`${s.task} box`} data-task data-checked={checked}>
			<input
				checked={checked}
				onChange={e => setChecked(!checked)}
				type='checkbox'
				name='task_checked'
				id={id}
			/>
			<label htmlFor={id}>
				<img src={checkmarkIcon} alt='' />
			</label>
			<p>{children}</p>
			<Button />
		</div>
	);
};

export default Task;
