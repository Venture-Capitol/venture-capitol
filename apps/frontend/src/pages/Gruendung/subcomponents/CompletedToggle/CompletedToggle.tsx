import React, { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import s from "./CompletedToggle.module.scss";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";

interface Props {
	taskId: string;
}
export function CompletedToggle(props: Props) {
	const { nodes, setTaskStatus } = useGruendungContext();
	const completed = nodes[props.taskId] ? nodes[props.taskId].checked : false;

	const [id] = useState(nanoid());

	return (
		<div className={s.wrapper}>
			<input
				type='checkbox'
				name='complete'
				id={id}
				checked={completed}
				onChange={() => setTaskStatus(props.taskId, !completed)}
			/>

			<label htmlFor={id} className={s.wrapper}>
				<span className={s.checkbox}>
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
					</svg>
				</span>
				{completed ? "Abgeschlossen" : "Abschließen"}
			</label>
		</div>
	);
}

interface ToggleProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	textChecked?: string;
	textUnchecked?: string;
}

export function Toggle({
	checked,
	onChange,
	textChecked = "Abgeschlossen",
	textUnchecked = "Abschließen",
}: ToggleProps) {
	const [id] = useState(nanoid());

	return (
		<div className={s.wrapper}>
			<input
				type='checkbox'
				name='complete'
				id={id}
				checked={checked}
				onChange={() => onChange(!checked)}
			/>

			<label htmlFor={id} className={s.wrapper}>
				<span className={s.checkbox}>
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
					</svg>
				</span>
				{checked ? textChecked : textUnchecked}
			</label>
		</div>
	);
}
