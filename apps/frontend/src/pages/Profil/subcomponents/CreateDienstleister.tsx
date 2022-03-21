import s from "./CreateDienstleister.module.scss";
import { useState } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import Dialog from "@vc/frontend/component/Popup/Dialog";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import AddressField from "@vc/frontend/component/AddressField/AddressField";

interface Props {
	getDienstleisterOfUser: any;
}

const CreateDienstleister = ({ getDienstleisterOfUser }: Props) => {
	const { user } = useAuthContext();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [company, setCompany] = useState("");
	const [jobname, setJobname] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [telefon, setTelefon] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");

	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");

	const [showError, setShowError] = useState(false);

	async function createDienstleister() {
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
			verified: false,
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
					onOpenChange={open => {
						setShowConfirmation(open);
						if (open === false) {
							getDienstleisterOfUser();
						}
					}}
				>
					<span>
						Ein Administrator wird deine Eintragung als <b>{company}</b>{" "}
						verifizieren. Wenn alles passt, dann wirst du als Dienstleister in
						der Suche gelistet. Vielen Dank!
					</span>
				</Dialog>
			);
		} else {
			return <div></div>;
		}
	}

	return (
		<>
			<div className={s.maindiv_headline_createEntry}>
				<p className={s.AlsDienstleisterEintragen}>
					Als Dienstleister eintragen
				</p>
			</div>
			<div className={s.maindiv_createForm}>
				<form
					className={s.createForm}
					onSubmit={e => {
						e.preventDefault();
						if (lat != "") {
							createDienstleister();
							setShowError(false);
						} else {
							setShowError(true);
						}
					}}
				>
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
							defaultValue={""}
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
					<label className={s.label_createForm}>
						Adresse / PLZ / Ort*
						<AddressField
							setAddress={address => {
								setShowError(false);
								setAddress(address);
							}}
							setLat={setLat}
							setLong={setLong}
						/>
					</label>
					<label className={s.label_createForm}>
						E-Mail Adresse*
						<input
							type='email'
							className={s.textinput_createForm}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_createForm}>
						Telefon
						<input
							type='tel'
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
					{showError ? (
						<p className={s.addressWarning}>
							Bitte wähle eine vollständige Adresse aus!
						</p>
					) : null}
				</form>
			</div>
			{checkConfirmation()}
		</>
	);
};

export default CreateDienstleister;
