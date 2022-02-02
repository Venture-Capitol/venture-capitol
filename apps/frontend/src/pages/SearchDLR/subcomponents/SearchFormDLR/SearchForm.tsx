import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext, AuthUI, User } from "@vc/auth";
import s from "./SearchForm.module.scss";
import Button from "@vc/ui/src/components/Button/Button";
import { useAuthContext } from "@vc/auth/src/AuthContext";

interface Props {
	passFormResponse: (job: any, address: any) => void;
	setSearchRequest: (request: any) => void;
	setCurrentPage: (page: any) => void;
	startSearchRequest: (page: any) => void;
	setSearchResponse: any;
}

const SearchForm = ({
	passFormResponse,
	setSearchRequest,
	setCurrentPage,
	startSearchRequest,
	setSearchResponse,
}: Props) => {
	const { user } = useAuthContext();
	const queryParams = new URLSearchParams(useLocation().search);
	const [chosenAddress, setChosenAddress] = useState("");
	const jobparam = queryParams.get("jobname");
	const [chosenJobname, setChosenJobname] = useState(jobparam);

	function handleSubmit(eventtarget: any) {
		eventtarget.preventDefault();

		user?.getIdToken().then(token => {
			const fetchURL =
				"http://localhost:8103/entry/search?jobname=" +
				chosenJobname +
				"&latitude=52.516217&longitude=13.377004&page=";

			setSearchRequest(fetchURL);

			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL + 1, requestOptions)
				.then(data => data.json())
				.then(parseddata => {
					setSearchResponse(parseddata);
					handleResponse(parseddata, fetchURL);
				})
				.catch(error => console.log(error));
		});
	}

	function handleResponse(data: any, url: any) {
		setCurrentPage(1);
		passFormResponse(chosenJobname, chosenAddress);
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
