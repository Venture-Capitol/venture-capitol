import s from "./EditDeleteDienstleister.module.scss";
import { useState, useEffect } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import Dialog from "@vc/frontend/component/Popup/Dialog";
import AlertDialog from "@vc/frontend/component/Popup/AlertDialog";
import AddressField from "@vc/frontend/component/AddressField/AddressField";

interface Props {
	dienstleisterOfUser: any;
	getDienstleisterOfUser: any;
}

const EditDeleteDienstleister = ({
	dienstleisterOfUser,
	getDienstleisterOfUser,
}: Props) => {
	const { user } = useAuthContext();

	const [showEditConfirmation, setShowEditConfirmation] = useState(false);

	const [company, setCompany] = useState(dienstleisterOfUser.company);
	const [jobname, setJobname] = useState(dienstleisterOfUser.job);
	const [address, setAddress] = useState(dienstleisterOfUser.address);
	const [email, setEmail] = useState(dienstleisterOfUser.email);
	const [telefon, setTelefon] = useState(dienstleisterOfUser.telefon);
	const [website, setWebsite] = useState(dienstleisterOfUser.website);
	const [description, setDescription] = useState(
		dienstleisterOfUser.description
	);

	const [lat, setLat] = useState(dienstleisterOfUser.lat);
	const [long, setLong] = useState(dienstleisterOfUser.long);

	const [showError, setShowError] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function editDienstleister() {
		const body = {
			editedEntry: {
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
			},
		};

		const fetchURL = "/dlr/entry/" + dienstleisterOfUser.id;

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
				.then(data => {
					if (data.ok) {
						setShowEditConfirmation(true);
					} else {
						setShowEditConfirmation(false);
					}
				})
				.catch(error => console.log(error));
		});
	}

	function deleteDienstleister() {
		const fetchURL = "/dlr/entry/" + dienstleisterOfUser.id;

		user?.getIdToken().then(token => {
			const requestOptions = {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL, requestOptions)
				.then(data => {
					if (data.ok) getDienstleisterOfUser();
				})
				.catch(error => console.log(error));
		});
	}

	function checkEditConfirmation() {
		if (showEditConfirmation) {
			return (
				<Dialog
					title={"Bearbeitung erfolgreich!"}
					defaultOpen={false}
					open={showEditConfirmation}
					onOpenChange={open => {
						setShowEditConfirmation(open);
						if (open === false) {
							getDienstleisterOfUser();
						}
					}}
				>
					<span>
						Die Änderungen an <b>{company}</b> wurden erfolgreich übernommen!
					</span>
				</Dialog>
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
				<form
					className={s.editForm}
					onSubmit={e => {
						e.preventDefault();
						if (lat != "") {
							editDienstleister();
							setShowError(false);
						} else {
							setShowError(true);
						}
					}}
				>
					<label className={s.label_editForm}>
						Firmenname*
						<input
							type='text'
							className={s.textinput_editForm}
							defaultValue={company}
							onChange={e => setCompany(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_editForm}>
						Dienstleistung*
						<select
							name='Dienstleistungen'
							className={s.joboption_editForm}
							defaultValue={jobname}
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
						<AddressField
							setAddress={address => {
								setShowError(false);
								setAddress(address);
							}}
							setLat={setLat}
							setLong={setLong}
							defaultValue={address}
						/>
					</label>
					<label className={s.label_editForm}>
						E-Mail Adresse*
						<input
							type='email'
							className={s.textinput_editForm}
							defaultValue={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className={s.label_editForm}>
						Telefon
						<input
							type='tel'
							className={s.textinput_editForm}
							defaultValue={telefon}
							onChange={e => setTelefon(e.target.value)}
						/>
					</label>
					<label className={s.label_editForm}>
						Website
						<input
							type='text'
							className={s.textinput_editForm}
							defaultValue={website}
							onChange={e => setWebsite(e.target.value)}
						/>
					</label>
					<label className={s.label_editForm}>
						Beschreibung
						<textarea
							onChange={e => setDescription(e.target.value)}
							defaultValue={description}
						></textarea>
					</label>
					<div className={s.divforthat}>
						<div>
							<Button>Änderungen speichern</Button>
						</div>
						<AlertDialog
							defaultOpen={false}
							title={"Bist du sicher?"}
							trigger={<div className={s.deleteDLButton}>Löschen</div>}
							cancel={
								<div className={s.modalCancelButton}>
									<Button>Abbrechen</Button>
								</div>
							}
							action={
								<span
									className={s.deleteModalButton}
									onClick={deleteDienstleister}
								>
									Löschen
								</span>
							}
						>
							<span className={s.deleteModalText}>
								Möchtest du deine Dienstleistereintragung <b>{company}</b>{" "}
								wirklich löschen? Diese Änderung kann nicht rückgängig gemacht
								werden!
							</span>
						</AlertDialog>
					</div>
					{showError ? (
						<p className={s.addressWarning}>
							Bitte wähle eine vollständige Adresse aus!
						</p>
					) : null}
				</form>
			</div>
			{checkEditConfirmation()}
		</>
	);
};

export default EditDeleteDienstleister;
