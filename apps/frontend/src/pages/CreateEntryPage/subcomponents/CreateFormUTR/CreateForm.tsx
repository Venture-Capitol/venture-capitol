import React, { useState } from "react";
import s from "./CreateForm.module.scss";

interface Props {
	triggerPopup: (isOpen: boolean) => void;
}

const CreateForm = ({ triggerPopup }: Props) => {
	const [company, setCompany] = useState("");
	const [jobname, setJobname] = useState("Notar");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [telefon, setTelefon] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");

	function createEntry(event: any) {
		event.preventDefault();
		console.log(company);
		console.log(jobname);
		console.log(address);
		console.log(email);
		console.log(telefon);
		console.log(website);
		console.log(description);

		const body = {
			job: jobname,
			company: company,
			address: address,
			latitude: 10,
			longitude: 11,
			email: email,
			telefon: telefon,
			website: website,
			description: description,
		};

		const accessToken =
			"eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR2x1b24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKenhwZ0I1dXd2RjM0RE44Y2JaRk9ESURLTDhKNGt5VEZ3N2hsLXhfdz1zOTYtYyIsInJvbGUiOiJhZG1pbiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS92ZW50dXJlLWNhcGl0b2wiLCJhdWQiOiJ2ZW50dXJlLWNhcGl0b2wiLCJhdXRoX3RpbWUiOjE2NDIyNTkyMTMsInVzZXJfaWQiOiJnY1hLSlZqSEY0Z2tvWUtSNFJMNHNGYWpGbUczIiwic3ViIjoiZ2NYS0pWakhGNGdrb1lLUjRSTDRzRmFqRm1HMyIsImlhdCI6MTY0MjM1NzU5NSwiZXhwIjoxNjQyMzYxMTk1LCJlbWFpbCI6ImthaWttaW5lY3JhZnRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDc3OTY1MjU5Mjk0ODk0MzQ5NTQiXSwiZW1haWwiOlsia2Fpa21pbmVjcmFmdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.SywyfCjXmt7zP-ocKZz7UPARfJHkkXa0PrUUfIe44wcnXdWdF_Dx2Z5vybKBtNNt_O-NGw3HbpzBhzTPGNEuoqTc-efcZu5Z93sck1OgVWjxPkJyuWyZbz8Qeh4cdQc00WLanYlRJtMxDEMK9v_6v-BIJDauFEp-I8vGN_UY0wKd3jFBs6_r_qvEmqLeHpzXC8PSYt49gvcnm2pPIe7ZsSOEzDnFcJYZOU6h7Poibek82CSZhsgTG0QMybt7XE8IGJhaejgGRVi8uqYePjSk-J8u-notUTyKIcZxqPj3Vx6rcChshfPUCB-krX1vKycjuSI3GBvDhOE9-oBn4DFP4A";

		const requestOptions = {
			method: "POST",
			headers: {
				Authorization: "Bearer " + accessToken,
				"content-type": "application/json",
			},
			body: JSON.stringify(body),
		};

		return fetch("http://localhost:8103/entry/", requestOptions)
			.then(data => checkResponse(data))
			.catch(error => console.log(error));
	}

	function checkResponse(data: any) {
		if (data.ok) {
			triggerPopup(true);
		} else {
			triggerPopup(false);
			console.log("Fehler");
		}
	}

	return (
		<div className={s.maindiv_createForm}>
			<form className={s.createForm} onSubmit={createEntry}>
				<label className={s.label_createForm}>
					Firmenname*
					<input
						type='text'
						className={s.textinput_createForm}
						onChange={e => setCompany(e.target.value)}
						required
					/>
				</label>
				<label className={s.label_createForm}>
					Dienstleistung*
					<select
						name='Dienstleistungen'
						className={s.joboption_createForm}
						onChange={e => setJobname(e.target.value)}
						required
					>
						<option value='Notar'>Notar</option>
						<option value='Rechtsanwalt'>Rechtsanwalt</option>
						<option value='Steuerberater'>Steuerberater</option>
						<option value='Webagentur'>Webagentur</option>
					</select>
				</label>
				<label className={s.label_createForm}>
					Adresse / PLZ / Ort*
					<input
						type='text'
						className={s.textinput_createForm}
						onChange={e => setAddress(e.target.value)}
						required
					/>
				</label>
				<label className={s.label_createForm}>
					E-Mail Adresse*
					<input
						type='text'
						className={s.textinput_createForm}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className={s.label_createForm}>
					Telefon
					<input
						type='text'
						className={s.textinput_createForm}
						onChange={e => setTelefon(e.target.value)}
					/>
				</label>
				<label className={s.label_createForm}>
					Website
					<input
						type='text'
						className={s.textinput_createForm}
						onChange={e => setWebsite(e.target.value)}
					/>
				</label>
				<label className={s.label_createForm}>
					Beschreibung
					<textarea onChange={e => setDescription(e.target.value)}></textarea>
				</label>
				<div className={s.divforthat}>
					<input
						type='submit'
						value='+ Mich als Dienstleister eintragen'
						className={s.submit_createForm}
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateForm;
