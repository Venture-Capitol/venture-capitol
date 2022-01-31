import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import s from "./EditDeleteDienstleister.module.scss";
import { AuthContext, AuthUI, User } from "@vc/auth";
import React, { useState, useContext } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import { useAuthContext } from "@vc/auth/src/AuthContext";

export default function EditDeleteDienstleister() {
	const { user } = useAuthContext();

	// NEEDS LOGIC TO GET USER WHO THIS DIENSTLEISTER BELONGS TO
	// USE GET TO GET ALL INFOS, ADD INTO FORM, PERFORM EDIT & DELETE WITH ID

	// ALSO: ADD MODAL FOR DELETE BUTTON BEFORE DELETING

	const [showEditConfirmation, setShowEditConfirmation] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const [company, setCompany] = useState("");
	const [jobname, setJobname] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [telefon, setTelefon] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");

	function editDienstleister(event: any) {
		event.preventDefault();
		console.log(company);
		console.log(jobname);
		console.log(address);
		console.log(email);
		console.log(telefon);
		console.log(website);
		console.log(description);

		const body = {
			editedEntry: {
				job: jobname,
				company: company,
				address: address,
				latitude: 10,
				longitude: 11,
				email: email,
				telefon: telefon,
				website: website,
				description: description,
			},
		};

		var userID = "";
		const fetchURL = "http://localhost:8103/entry/" + userID;

		user?.getIdToken().then(token => {
			const requestOptions = {
				method: "PUT",
				headers: {
					Authorization: "Bearer " + token,
					"content-type": "application/json",
				},
				body: JSON.stringify(body),
			};

			return fetch(fetchURL, requestOptions)
				.then(data => checkEditResponse(data))
				.catch(error => console.log(error));
		});
	}

	function checkEditResponse(data: any) {
		if (data.ok) {
			setShowEditConfirmation(true);
		} else {
			setShowEditConfirmation(false);
		}
	}

	function deleteDienstleister(event: any) {
		event.preventDefault();
		console.log(company);
		console.log(jobname);
		console.log(address);
		console.log(email);
		console.log(telefon);
		console.log(website);
		console.log(description);

		var userID = "";
		const fetchURL = "http://localhost:8103/entry/" + userID;

		user?.getIdToken().then(token => {
			const requestOptions = {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL, requestOptions)
				.then(data => checkDeleteResponse(data))
				.catch(error => console.log(error));
		});
	}

	function checkDeleteResponse(data: any) {
		if (data.ok) {
			setShowDeleteConfirmation(true);
		} else {
			setShowDeleteConfirmation(false);
		}
	}

	function checkEditConfirmation() {
		if (showEditConfirmation) {
			return (
				<div className={s.editsuccess_div}>
					<p>
						Bearbeitung erfolgreich!<br></br> Sobald ein Admin deine Änderungen
						verifiziert hat wirst du wieder in der Suche gelistet!
					</p>
				</div>
			);
		} else {
			return <div></div>;
		}
	}

	function checkDeleteConfirmation() {
		if (showDeleteConfirmation) {
			return (
				<div className={s.deletesuccess_div}>
					<p>Deine Eintragung wurde erfolgreich gelöscht!</p>
				</div>
			);
		} else {
			return <div></div>;
		}
	}

	return (
		<>
			<div className={s.maindiv_headline_editEntry}>
				<p className={s.DienstleistereintragungEditieren}>
					Meine Dienstleistereintragung
				</p>
			</div>
			<div className={s.verifyWarning}>
				<p>
					<u>Achtung</u>: Wenn du Änderungen an deiner Eintragung speicherst,
					wirst du<br></br>
					nicht mehr in der Suche gelistet, bis ein Admin deine Änderungen
					verifiziert hat!
				</p>
			</div>
			<div className={s.maindiv_editForm}>
				<form className={s.editForm} onSubmit={editDienstleister}>
					<label className={s.label_editForm}>
						Firmenname*
						<input
							type='text'
							className={s.textinput_editForm}
							onChange={e => setCompany(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_editForm}>
						Dienstleistung*
						<select
							name='Dienstleistungen'
							className={s.joboption_editForm}
							onChange={e => setJobname(e.target.value)}
							required
						>
							<option value='Notar'>Notar</option>
							<option value='Rechtsanwalt'>Rechtsanwalt</option>
							<option value='Steuerberater'>Steuerberater</option>
							<option value='Webagentur'>Webagentur</option>
						</select>
					</label>
					<label className={s.label_editForm}>
						Adresse / PLZ / Ort*
						<input
							type='text'
							className={s.textinput_editForm}
							onChange={e => setAddress(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_editForm}>
						E-Mail Adresse*
						<input
							type='text'
							className={s.textinput_editForm}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_editForm}>
						Telefon
						<input
							type='text'
							className={s.textinput_editForm}
							onChange={e => setTelefon(e.target.value)}
						/>
					</label>
					<label className={s.label_editForm}>
						Website
						<input
							type='text'
							className={s.textinput_editForm}
							onChange={e => setWebsite(e.target.value)}
						/>
					</label>
					<label className={s.label_editForm}>
						Beschreibung
						<textarea onChange={e => setDescription(e.target.value)}></textarea>
					</label>
					<div className={s.divforthat}>
						<Button>Änderungen speichern</Button>
						<button
							className={s.deleteButton}
							onClick={e => deleteDienstleister(e)}
						>
							Löschen
						</button>
					</div>
				</form>
			</div>
			{checkEditConfirmation()}
			{checkDeleteConfirmation()}
		</>
	);
}
