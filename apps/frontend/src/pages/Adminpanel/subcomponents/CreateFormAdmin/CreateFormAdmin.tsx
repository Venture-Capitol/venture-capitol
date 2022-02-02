import s from "./CreateFormAdmin.module.scss";
import { useState } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import BackToAdminpanel from "../BackToAdminpanel/BackToAdminpanel";
import Dialog from "@vc/frontend/component/Popup/Dialog";
import { useAuthContext } from "@vc/auth/src/AuthContext";

interface Props {
	returnToAdminpanel: any;
	searchAgain: any;
	page: any;
}

const CreateFormAdmin = ({ returnToAdminpanel, searchAgain, page }: Props) => {
	const { user } = useAuthContext();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [company, setCompany] = useState("");
	const [jobname, setJobname] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [telefon, setTelefon] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");
	const [verified, setVerified] = useState(false);

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
			verified: verified,
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
				<Dialog
					title={"Hinzufügen erfolgreich!"}
					defaultOpen={true}
					open={showConfirmation}
					onOpenChange={open => setShowConfirmation(open)}
				>
					<p>
						Der Dienstleister <b>{company}</b> wurde erfolgreich hinzugefügt!
					</p>
				</Dialog>
			);
		} else {
			return <div></div>;
		}
	}

	function backToAdminpanel() {
		searchAgain(page);
		returnToAdminpanel();
	}

	return (
		<>
			<div className={s.maindiv_headline_admin_createEntry}>
				<div onClick={backToAdminpanel}>
					<BackToAdminpanel />
				</div>
				<p className={s.DienstleisterEintragen}>
					Einen Dienstleister hinzufügen
				</p>
			</div>
			<div className={s.maindiv_admin_createForm}>
				<form className={s.createFormAdmin} onSubmit={createDienstleister}>
					<label className={s.label_createFormAdmin}>
						Firmenname*
						<input
							type='text'
							className={s.textinput_createFormAdmin}
							onChange={e => setCompany(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_createFormAdmin}>
						Dienstleistung*
						<select
							name='Dienstleistungen'
							className={s.joboption_createFormAdmin}
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
					<label className={s.label_createFormAdmin}>
						Adresse / PLZ / Ort*
						<input
							type='text'
							className={s.textinput_createFormAdmin}
							onChange={e => setAddress(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_createFormAdmin}>
						E-Mail Adresse*
						<input
							type='text'
							className={s.textinput_createFormAdmin}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_createFormAdmin}>
						Telefon
						<input
							type='text'
							className={s.textinput_createFormAdmin}
							onChange={e => setTelefon(e.target.value)}
						/>
					</label>
					<label className={s.label_createFormAdmin}>
						Website
						<input
							type='text'
							className={s.textinput_createFormAdmin}
							onChange={e => setWebsite(e.target.value)}
						/>
					</label>
					<label className={s.label_createFormAdmin}>
						Beschreibung
						<textarea onChange={e => setDescription(e.target.value)}></textarea>
					</label>
					<div className={s.verifiedCheckbox}>
						<input
							className={s.confirmVerified}
							type='checkbox'
							onChange={e => setVerified(e.target.checked)}
						/>
						<label className={s.label_verified}>Sofort verifiziert?</label>
					</div>
					<div className={s.divforthatAdmin}>
						<Button>+ Diesen Dienstleister hinzufügen</Button>
					</div>
				</form>
			</div>
			{checkConfirmation()}
		</>
	);
};

export default CreateFormAdmin;
