import React, { useState } from "react";
import { nanoid } from "nanoid";
import s from "./CompletedToggle.module.scss";

export function CompletedToggle() {
	const [completed, setCompleted] = useState(false);
	const [id] = useState(nanoid());

	return (
		<div className={s.wrapper}>
			<input
				type='checkbox'
				name='complete'
				id={id}
				checked={completed}
				onChange={() => setCompleted(!completed)}
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
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M5 13l4 4L19 7'
						/>
					</svg>
				</span>
				{completed ? "Abgeschlossen" : "Abschließen"}
			</label>
		</div>
	);
}
