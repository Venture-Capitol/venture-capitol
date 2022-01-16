import React, { useState } from "react";
import s from "./SearchForm.module.scss";

interface Props {
	passSearchResponse: (data: any, job: any, address: any) => void;
}

const SearchForm = ({ passSearchResponse }: Props) => {
	const [chosenJobname, setChosenJobname] = useState("Notar");
	const [chosenAddress, setChosenAddress] = useState("");

	function handleSubmit(eventtarget: any) {
		eventtarget.preventDefault();
		alert("The form was submitted " + chosenJobname + " " + chosenAddress);

		const fetchURL =
			"http://localhost:8103/entry/search?jobname=" +
			chosenJobname +
			"&latitude=52.516217&longitude=13.377004";

		const accessToken =
			"eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR2x1b24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKenhwZ0I1dXd2RjM0RE44Y2JaRk9ESURLTDhKNGt5VEZ3N2hsLXhfdz1zOTYtYyIsInJvbGUiOiJhZG1pbiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS92ZW50dXJlLWNhcGl0b2wiLCJhdWQiOiJ2ZW50dXJlLWNhcGl0b2wiLCJhdXRoX3RpbWUiOjE2NDIyNTkyMTMsInVzZXJfaWQiOiJnY1hLSlZqSEY0Z2tvWUtSNFJMNHNGYWpGbUczIiwic3ViIjoiZ2NYS0pWakhGNGdrb1lLUjRSTDRzRmFqRm1HMyIsImlhdCI6MTY0MjM2NTM0OCwiZXhwIjoxNjQyMzY4OTQ4LCJlbWFpbCI6ImthaWttaW5lY3JhZnRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDc3OTY1MjU5Mjk0ODk0MzQ5NTQiXSwiZW1haWwiOlsia2Fpa21pbmVjcmFmdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.ALuod4M_DwAoNW-7ooqdrbZ6vGA9EWthLUGUxw8Rh9WkPa-38hsk33bPSJUJbkFP-S4LgwjzgMRshQwneU6QP9oeXECrckmeSqjPE62vju5dOhzo9h7iIOhj0fVUx6ibPPXidMW2is30HxZu7v2YfEn7ia-4IE7WUfjG3yZjyxaHBpBRLaYlsND38-SObnbPT6aeo-UmfYwvXcybYEAVi4GZZayj3H9x3OIisUMTchMoXVsYYf442KKDA4XijFgL4I_4K_T_9KjlwsBfU7YltEOMZOBaTkWbUe1rjxIZRtLIvD4vcFYXKS9D4wmx_cujNHpLWrlFe3DIg-FcRT4jZA";

		const requestOptions = {
			method: "GET",
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		};

		return fetch(fetchURL, requestOptions)
			.then(data => data.json())
			.then(parseddata => checkResponse(parseddata))
			.catch(error => console.log(error));
	}

	function checkResponse(data: any) {
		console.log("isokay");
		console.log(data);
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
