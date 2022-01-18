import React, { useState, useContext } from "react";
import { AuthContext, AuthUI, User } from "@vc/auth";
import s from "./CreateForm.module.scss";

interface Props {
	triggerPopup: (isOpen: boolean) => void;
}

const CreateForm = ({ triggerPopup }: Props) => {
	const currentUser = useContext<User | null>(AuthContext);
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

		currentUser?.getIdToken().then(token => {
			const requestOptions = {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
					"content-type": "application/json",
				},
				body: JSON.stringify(body),
			};

			return fetch("http://localhost:8103/entry/", requestOptions)
				.then(data => checkResponse(data))
				.catch(error => console.log(error));
		});
	}

	function checkResponse(data: any) {
		if (data.ok) {
			triggerPopup(true);
		} else {
			triggerPopup(false);
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
