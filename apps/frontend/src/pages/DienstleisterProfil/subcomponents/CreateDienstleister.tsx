import s from "./CreateDienstleister.module.scss";
import { useState } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import { useAuthContext } from "@vc/auth/src/AuthContext";

export default function CreateDienstleister() {
	const { user } = useAuthContext();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [company, setCompany] = useState("");
	const [jobname, setJobname] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [telefon, setTelefon] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");

	function createDienstleister(event: any) {
		event.preventDefault();
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

		user?.getIdToken().then(token => {
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
			setShowConfirmation(true);
		} else {
			setShowConfirmation(false);
		}
	}

	function checkConfirmation() {
		if (showConfirmation) {
			return (
				<div className={s.createsuccess_div}>
					<p>
						Hinzufügen erfolgreich!<br></br> Sobald ein Admin deine Eintragung
						verifiziert hat wirst du in der Suche gelistet!
					</p>
				</div>
			);
		} else {
			return <div></div>;
		}
	}

	return (
		<>
			<div className={s.maindiv_headline_createEntry}>
				<p className={s.AlsDienstleisterEintragen}>
					Als Dienstleister hinzufügen
				</p>
			</div>
			<div className={s.maindiv_createForm}>
				<form className={s.createForm} onSubmit={createDienstleister}>
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
							<option value='' selected disabled hidden>
								Bitte auswählen
							</option>
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
						<Button>+ Mich als Dienstleister eintragen</Button>
					</div>
				</form>
			</div>
			{checkConfirmation()}
		</>
	);
}
