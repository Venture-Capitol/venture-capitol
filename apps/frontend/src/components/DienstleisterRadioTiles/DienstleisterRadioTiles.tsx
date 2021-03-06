import s from "./DienstleisterRadioTiles.module.scss";

interface Props {
	chosenJob: string;
	setJobAndError: (job: string) => void;
}

const DienstleisterRadioTiles = ({ chosenJob, setJobAndError }: Props) => {
	return (
		<div className={s.dienstleistung_input}>
			<div className={s.radio_container} data-selected={chosenJob == "Notar"}>
				<label className={s.selectLabel}>
					<input
						className={s.radiobutton}
						type='radio'
						name='fav_language'
						value='Notar'
						onChange={e => {
							setJobAndError(e.target.value);
							console.log(chosenJob);
						}}
						checked={chosenJob === "Notar"}
					></input>
					<svg
						width='28'
						height='28'
						viewBox='0 0 28 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={s.jobIcon}
					>
						<path
							d='M18.3309 10.4881L12.8398 4.99707L15.9776 1.85932L21.4687 7.35039L18.3309 10.4881Z'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path
							d='M7.35044 21.4703L1.85938 15.9792L4.99713 12.8415L10.4882 18.3326L7.35044 21.4703Z'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path
							d='M10.0953 17.9404L5.38867 13.2338L13.2331 5.38938L17.9397 10.096L10.0953 17.9404Z'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path
							d='M21.8605 25.0003L12.4473 15.587L15.585 12.4493L24.9983 21.8625L21.8605 25.0003Z'
							stroke='currentColor'
							strokeWidth='2'
						/>
					</svg>
					Notar
				</label>
			</div>
			<div
				className={s.radio_container}
				data-selected={chosenJob == "Rechtsanwalt"}
			>
				<label className={s.selectLabel}>
					<input
						className={s.radiobutton}
						type='radio'
						name='fav_language'
						value='Rechtsanwalt'
						onChange={e => {
							setJobAndError(e.target.value);
							console.log(chosenJob);
						}}
						checked={chosenJob === "Rechtsanwalt"}
					></input>
					<svg
						width='28'
						height='28'
						viewBox='0 0 28 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={s.jobIcon}
					>
						<circle
							cx='14.5'
							cy='7.5'
							r='4.5'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path
							d='M7 22.2727C7 18.2815 10.3321 15 14.5 15C18.6679 15 22 18.2815 22 22.2727V26H14.5H7V22.2727Z'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path
							d='M14.5 18L13.5 16.5L14.5 16L15.5 16.5L14.5 18ZM14.5 18L13.5 20V25H15.5V20L14.5 18Z'
							stroke='currentColor'
							strokeWidth='2'
						/>
					</svg>
					Rechtsanwalt
				</label>
			</div>
			<div
				className={s.radio_container}
				data-selected={chosenJob == "Steuerberater"}
			>
				<label className={s.selectLabel}>
					<input
						className={s.radiobutton}
						type='radio'
						name='fav_language'
						value='Steuerberater'
						onChange={e => {
							setJobAndError(e.target.value);
							console.log(chosenJob);
						}}
						checked={chosenJob === "Steuerberater"}
					></input>
					<svg
						width='28'
						height='28'
						viewBox='0 0 28 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={s.jobIcon}
					>
						<path
							d='M23 25H7C5.89543 25 5 24.1046 5 23V21M5 21V5C5 3.89543 5.89543 3 7 3H20C21.1046 3 22 3.89543 22 5V21H5ZM10.44 7.8125H17.92'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path
							d='M5 23V23C5 21.8954 5.89543 21 7 21H8'
							stroke='currentColor'
							strokeWidth='2'
						/>
					</svg>
					Steuerberater
				</label>
			</div>
			<div
				className={s.radio_container}
				data-selected={chosenJob == "Webagentur"}
			>
				<label className={s.selectLabel}>
					<input
						className={s.radiobutton}
						type='radio'
						name='fav_language'
						value='Webagentur'
						onChange={e => {
							setJobAndError(e.target.value);
							console.log(chosenJob);
						}}
						checked={chosenJob === "Webagentur"}
					></input>
					<svg
						width='28'
						height='28'
						viewBox='0 0 28 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={s.jobIcon}
					>
						<circle
							cx='14'
							cy='14'
							r='11'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path d='M4 10H24M24 18H4' stroke='currentColor' strokeWidth='2' />
						<path
							d='M18 14C18 5.75 14 3 14 3C14 3 10 6.20833 10 14.2292C10 22.25 14 25 14 25C14 25 18 22.25 18 14Z'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinejoin='round'
						/>
					</svg>
					Webagentur
				</label>
			</div>
		</div>
	);
};

export default DienstleisterRadioTiles;
