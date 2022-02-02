import s from "./EditFormAdmin.module.scss";
import { AuthContext, AuthUI, User } from "@vc/auth";
import React, { useState, useContext, useEffect } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import BackToAdminpannel from "../BackToAdminpannel/BackToAdminpannel";
import Dialog from "@vc/frontend/component/Popup/Dialog";
import { useAuthContext } from "@vc/auth/src/AuthContext";

interface Props {
	returnToAdminpannel: any;
	searchAgain: any;
	editData: any;
	page: any;
}

const EditFormAdmin = ({
	returnToAdminpannel,
	searchAgain,
	editData,
	page,
}: Props) => {
	const { user } = useAuthContext();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [company, setCompany] = useState(editData.company);
	const [jobname, setJobname] = useState(editData.job);
	const [address, setAddress] = useState(editData.address);
	const [email, setEmail] = useState(editData.email);
	const [telefon, setTelefon] = useState(editData.telefon);
	const [website, setWebsite] = useState(editData.website);
	const [description, setDescription] = useState(editData.description);
	const [verified, setVerified] = useState(editData.verified);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function updateEntryAdmin(event: any) {
		event.preventDefault();

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
				verified: verified,
			},
		};

		const fetchURL = "http://localhost:8103/entry/" + editData.id;

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
				<Dialog
					title={"Bearbeitung erfolgreich!"}
					defaultOpen={false}
					open={showConfirmation}
					onOpenChange={open => {
						setShowConfirmation(open);
						if (open === false) {
							backToAdminpannel();
						}
					}}
				>
					<p>
						Die Änderungen an <b>{company}</b> wurden erfolgreich übernommen!
					</p>
				</Dialog>
			);
		} else {
			return <div></div>;
		}
	}

	function backToAdminpannel() {
		searchAgain(page);
		returnToAdminpannel();
	}

	return (
		<>
			<div className={s.maindiv_headline_admin_editEntry}>
				<div onClick={backToAdminpannel}>
					<BackToAdminpannel />
				</div>
				<p className={s.DienstleisterBearbeiten}>Dienstleister bearbeiten</p>
			</div>
			<div className={s.maindiv_admin_editForm}>
				<form className={s.editFormAdmin} onSubmit={e => updateEntryAdmin(e)}>
					<label className={s.label_editFormAdmin}>
						Firmenname*
						<input
							type='text'
							className={s.textinput_editFormAdmin}
							onChange={e => setCompany(e.target.value)}
							defaultValue={company}
							required
						/>
					</label>
					<label className={s.label_editFormAdmin}>
						Dienstleistung*
						<select
							name='Dienstleistungen'
							className={s.joboption_editFormAdmin}
							onChange={e => setJobname(e.target.value)}
							defaultValue={jobname}
							value={jobname}
							required
						>
							<option value='Notar'>Notar</option>
							<option value='Rechtsanwalt'>Rechtsanwalt</option>
							<option value='Steuerberater'>Steuerberater</option>
							<option value='Webagentur'>Webagentur</option>
						</select>
					</label>
					<label className={s.label_editFormAdmin}>
						Adresse / PLZ / Ort*
						<input
							type='text'
							className={s.textinput_editFormAdmin}
							onChange={e => setAddress(e.target.value)}
							defaultValue={address}
							required
						/>
					</label>
					<label className={s.label_editFormAdmin}>
						E-Mail Adresse*
						<input
							type='text'
							className={s.textinput_editFormAdmin}
							onChange={e => setEmail(e.target.value)}
							defaultValue={email}
							required
						/>
					</label>
					<label className={s.label_editFormAdmin}>
						Telefon
						<input
							type='text'
							className={s.textinput_editFormAdmin}
							onChange={e => setTelefon(e.target.value)}
							defaultValue={editData.telefon}
						/>
					</label>
					<label className={s.label_editFormAdmin}>
						Website
						<input
							type='text'
							className={s.textinput_editFormAdmin}
							onChange={e => setWebsite(e.target.value)}
							defaultValue={website}
						/>
					</label>
					<label className={s.label_editFormAdmin}>
						Beschreibung
						<textarea
							onChange={e => setDescription(e.target.value)}
							defaultValue={description}
						></textarea>
					</label>
					<div className={s.verifiedCheckboxEdit}>
						<input
							type='checkbox'
							onChange={e => setVerified(e.target.checked)}
							defaultChecked={verified}
						/>
						<label className={s.label_verifiedEdit}>Verifiziert?</label>
					</div>
					<div className={s.divforthatEditAdmin}>
						<Button>Änderungen übernehmen</Button>
					</div>
				</form>
			</div>
			{checkConfirmation()}
		</>
	);
};

export default EditFormAdmin;
