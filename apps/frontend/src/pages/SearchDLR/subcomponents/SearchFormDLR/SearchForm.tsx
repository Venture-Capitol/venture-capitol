import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext, AuthUI, User } from "@vc/auth";
import s from "./SearchForm.module.scss";
import Button from "@vc/ui/src/components/Button/Button";

interface Props {
	passSearchResponse: (data: any, job: any, address: any) => void;
	passSearchRequest: (request: any) => void;
	passPageOfRequest: (page: any) => void;
}

const SearchForm = ({
	passSearchResponse,
	passSearchRequest,
	passPageOfRequest,
}: Props) => {
	const currentUser = useContext<User | null>(AuthContext);
	const queryParams = new URLSearchParams(useLocation().search);
	const [chosenAddress, setChosenAddress] = useState("");
	const jobparam = queryParams.get("jobname");
	const [chosenJobname, setChosenJobname] = useState(jobparam);

	function handleSubmit(eventtarget: any) {
		eventtarget.preventDefault();

		currentUser?.getIdToken().then(token => {
			const fetchURL =
				"http://localhost:8103/entry/search?jobname=" +
				chosenJobname +
				"&latitude=52.516217&longitude=13.377004&";

			const page = "page=1";
			passSearchRequest(fetchURL);
			passPageOfRequest(page);

			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL + page, requestOptions)
				.then(data => data.json())
				.then(parseddata => checkResponse(parseddata))
				.catch(error => console.log(error));
		});
	}

	function checkResponse(data: any) {
		passSearchResponse(data, chosenJobname, chosenAddress);
	}

	function getSelect() {
		if (
			jobparam != "Notar" &&
			jobparam != "Rechtsanwalt" &&
			jobparam != "Steuerberater" &&
			jobparam != "Webagentur"
		) {
			return (
				<select
					name='Dienstleistungen'
					className={s.joboption}
					onChange={event => setChosenJobname(event.target.value)}
					required
				>
					<option value='' selected disabled hidden>
						Bitte auswählen
					</option>
					<option value='Notar'>Notar</option>
					<option value='Rechtsanwalt'>Rechtsanwalt</option>
					<option value='Steuerberater'>Steuerberater</option>
					<option value='Webagentur'>Webagentur</option>
				</select>
			);
		} else if (jobparam == "Notar") {
			return (
				<select
					name='Dienstleistungen'
					className={s.joboption}
					onChange={event => setChosenJobname(event.target.value)}
					required
				>
					<option value='Notar' selected>
						Notar
					</option>
					<option value='Rechtsanwalt'>Rechtsanwalt</option>
					<option value='Steuerberater'>Steuerberater</option>
					<option value='Webagentur'>Webagentur</option>
				</select>
			);
		} else if (jobparam == "Rechtsanwalt") {
			return (
				<select
					name='Dienstleistungen'
					className={s.joboption}
					onChange={event => setChosenJobname(event.target.value)}
					required
				>
					<option value='Notar'>Notar</option>
					<option value='Rechtsanwalt' selected>
						Rechtsanwalt
					</option>
					<option value='Steuerberater'>Steuerberater</option>
					<option value='Webagentur'>Webagentur</option>
				</select>
			);
		} else if (jobparam == "Steuerberater") {
			return (
				<select
					name='Dienstleistungen'
					className={s.joboption}
					onChange={event => setChosenJobname(event.target.value)}
					required
				>
					<option value='Notar'>Notar</option>
					<option value='Rechtsanwalt'>Rechtsanwalt</option>
					<option value='Steuerberater' selected>
						Steuerberater
					</option>
					<option value='Webagentur'>Webagentur</option>
				</select>
			);
		} else if (jobparam == "Webagentur") {
			return (
				<select
					name='Dienstleistungen'
					className={s.joboption}
					onChange={event => setChosenJobname(event.target.value)}
					required
				>
					<option value='Notar'>Notar</option>
					<option value='Rechtsanwalt'>Rechtsanwalt</option>
					<option value='Steuerberater'>Steuerberater</option>
					<option value='Webagentur' selected>
						Webagentur
					</option>
				</select>
			);
		}
	}

	return (
		<div className={s.maindiv}>
			<form className={s.form} onSubmit={event => handleSubmit(event)}>
				<label className={s.input_block}>
					Dienstleistung
					{getSelect()}
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
