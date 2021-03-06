import s from "./CreateFormAdmin.module.scss";
import { useState, useEffect } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import BackToAdminpanel from "../BackToAdminpanel/BackToAdminpanel";
import Dialog from "@vc/frontend/component/Popup/Dialog";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import AddressField from "@vc/frontend/component/AddressField/AddressField";

interface Props {
	returnToAdminpanel: any;
	searchAgain: any;
}

const CreateFormAdmin = ({ returnToAdminpanel, searchAgain }: Props) => {
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

	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function createDienstleister(event: any) {
		event.preventDefault();

		const body = {
			job: jobname,
			company: company,
			address: address,
			latitude: lat,
			longitude: long,
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

			return fetch("/dlr/entry/", requestOptions)
				.then(data => {
					if (data.ok) {
						setShowConfirmation(true);
					} else {
						setShowConfirmation(false);
					}
				})
				.catch(error => console.log(error));
		});
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
					<span>
						Der Dienstleister <b>{company}</b> wurde erfolgreich hinzugefügt!
					</span>
				</Dialog>
			);
		} else {
			return <div></div>;
		}
	}

	async function backToAdminpannel() {
		await searchAgain();
		returnToAdminpanel();
	}

	return (
		<>
			<div className={s.maindiv_headline_admin_createEntry}>
				<div onClick={e => backToAdminpannel()}>
					<BackToAdminpanel />
				</div>
				<p className={s.DienstleisterEintragen}>
					Einen Dienstleister hinzufügen
				</p>
			</div>
			<div className={s.maindiv_admin_createForm}>
				<form
					className={s.createFormAdmin}
					onSubmit={e => createDienstleister(e)}
				>
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
							defaultValue=''
							required
						>
							<option value='' disabled hidden>
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
						<AddressField
							setAddress={setAddress}
							setLat={setLat}
							setLong={setLong}
						/>
					</label>
					<label className={s.label_createFormAdmin}>
						E-Mail Adresse*
						<input
							type='email'
							className={s.textinput_createFormAdmin}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_createFormAdmin}>
						Telefon
						<input
							type='tel'
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
