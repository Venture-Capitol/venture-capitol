import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import s from "./SearchForm.module.scss";
import Button from "@vc/ui/src/components/Button/Button";

interface Props {
	startSearchRequest: () => void;
	chosenJob: string;
	setChosenJob: (job: string) => void;
	chosenAddress: string;
	setChosenAddress: (address: string) => void;
}

const SearchForm = ({
	startSearchRequest,
	chosenJob,
	setChosenJob,
	chosenAddress,
	setChosenAddress,
}: Props) => {
	// useEffect(() => {
	// 	setChosenJob(
	// 		new URLSearchParams(useLocation().search).get("jobname") || ""
	// 	);
	// }, []);

	return (
		<div className={s.maindiv}>
			<form
				className={s.form}
				onSubmit={e => {
					e.preventDefault();
					startSearchRequest();
				}}
			>
				<label className={s.input_block}>
					Dienstleistung
					<select
						name='Dienstleistungen'
						className={s.joboption}
						onChange={event => setChosenJob(event.target.value)}
						value={chosenJob}
						required
					>
						<option value='' disabled hidden className={s.disabledOption}>
							Bitte auswählen
						</option>
						<option value='Notar'>Notar</option>
						<option value='Rechtsanwalt'>Rechtsanwalt</option>
						<option value='Steuerberater'>Steuerberater</option>
						<option value='Webagentur'>Webagentur</option>
					</select>
				</label>
				<label className={s.input_block}>
					Adresse
					<input
						type='text'
						value={chosenAddress}
						className={s.textinput}
						onChange={event => setChosenAddress(event.target.value)}
					/>
				</label>
				<Button>Suchen</Button>
			</form>
		</div>
	);
};

export default SearchForm;
