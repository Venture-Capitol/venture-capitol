import React, { useState, useContext } from "react";
import { AuthContext, AuthUI, User } from "@vc/auth";
import s from "./SearchForm.module.scss";

interface Props {
	passSearchResponse: (data: any, job: any, address: any) => void;
}

const SearchForm = ({ passSearchResponse }: Props) => {
	const currentUser = useContext<User | null>(AuthContext);
	const [chosenJobname, setChosenJobname] = useState("Notar");
	const [chosenAddress, setChosenAddress] = useState("");

	function handleSubmit(eventtarget: any) {
		eventtarget.preventDefault();

		currentUser?.getIdToken().then(token => {
			const fetchURL =
				"http://localhost:8103/entry/search?jobname=" +
				chosenJobname +
				"&latitude=52.516217&longitude=13.377004&page=1";

			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL, requestOptions)
				.then(data => data.json())
				.then(parseddata => checkResponse(parseddata))
				.catch(error => console.log(error));
		});
	}

	function checkResponse(data: any) {
		passSearchResponse(data, chosenJobname, chosenAddress);
	}

	return (
		<div className={s.maindiv}>
			<form className={s.form} onSubmit={event => handleSubmit(event)}>
				<label className={s.input_block}>
					Dienstleistung
					<select
						name='Dienstleistungen'
						className={s.joboption}
						onChange={event => setChosenJobname(event.target.value)}
					>
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
				<input type='submit' value='Suchen' className={s.submit} />
			</form>
		</div>
	);
};

export default SearchForm;
