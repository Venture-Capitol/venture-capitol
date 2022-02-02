import { useState } from "react";
import s from "./GetAllResult.module.scss";
import Button from "@vc/ui/src/components/Button/Button";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import AlertDialogWithFunc from "@vc/frontend/component/Popup/AlertDialogWithFunc";

interface Props {
	resultData: any;
	searchAgain: any;
	setDataForEdit: any;
	page: any;
}

const GetAllResult = ({
	resultData,
	searchAgain,
	setDataForEdit,
	page,
}: Props) => {
	const { user } = useAuthContext();
	const [isVerified, setIsVerified] = useState(resultData.verified);

	function changeVerifyEntry(event: any) {
		event.preventDefault();

		const body = {
			editedEntry: {
				verified: !isVerified,
			},
		};

		const fetchURL = "http://localhost:8103/entry/" + resultData.id;

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
				.then(data => updateVerifiedStatus(data))
				.catch(error => console.log(error));
		});
	}

	function updateVerifiedStatus(data: any) {
		if (data.ok) {
			setIsVerified(!isVerified);
		}
	}

	function checkVerfiyButtonVariant() {
		if (isVerified === true) {
			return (
				<button
					className={s.isVerifiedButton}
					onClick={e => changeVerifyEntry(e)}
				>
					Bereits verifiziert
				</button>
			);
		} else {
			return (
				<button
					className={s.verifyDLButton}
					onClick={e => changeVerifyEntry(e)}
				>
					Verifizieren
				</button>
			);
		}
	}

	function deleteEntry() {
		const fetchURL = "http://localhost:8103/entry/" + resultData.id;

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
			searchAgain(page);
		}
	}

	function passEditData() {
		setDataForEdit(resultData);
	}

	return (
		<>
			<div className={s.allResultframe}>
				<div className={s.resultContent}>
					<div className={s.row}>
						<div className={s.columnOfInfofield}>
							<div className={s.pairOfTitleInput}>
								<p className={s.allResult_title}>Firmenname</p>
								<p className={s.allResult_input}>{resultData.company}</p>
							</div>
							<div className={s.pairOfTitleInput}>
								<p className={s.allResult_title}>Adresse</p>
								<p className={s.allResult_input}>{resultData.address}</p>
							</div>
							<div className={s.pairOfTitleInput}>
								<p className={s.allResult_title}>Telefon</p>
								<p className={s.allResult_input}>{resultData.telefon}</p>
							</div>
						</div>
						<div className={s.columnOfInfofield}>
							<div className={s.pairOfTitleInput}>
								<p className={s.allResult_title}>Dienstleistung</p>
								<p className={s.allResult_input}>{resultData.job}</p>
							</div>
							<div className={s.pairOfTitleInput}>
								<p className={s.allResult_title}>E-Mail</p>
								<p className={s.allResult_input}>{resultData.email}</p>
							</div>
							<div className={s.pairOfTitleInput}>
								<p className={s.allResult_title}>Website</p>
								<p className={s.allResult_input}>{resultData.website}</p>
							</div>
						</div>
					</div>
					<div className={s.columnOfInfofield}>
						<div className={s.pairOfTitleInput}>
							<p className={s.allResult_title}>Beschreibung</p>
							<p className={s.allResult_input}>{resultData.description}</p>
						</div>
					</div>
				</div>
				<div className={s.buttonControls}>
					{checkVerfiyButtonVariant()}
					<button className={s.editDLButton} onClick={e => passEditData()}>
						Bearbeiten
					</button>
					<AlertDialogWithFunc
						defaultOpen={false}
						title={"Bist du sicher?"}
						trigger={<button className={s.deleteDLButton}>Löschen</button>}
						cancel={<Button>Abbrechen</Button>}
						action={<span className={s.deleteModalButton}>Löschen</span>}
						func={deleteEntry}
					>
						<p className={s.deleteModalText}>
							Möchtest du den Dienstleister <b>{resultData.company}</b> wirklich
							löschen? Diese Änderung kann nicht rückgängig gemacht werden!
						</p>
					</AlertDialogWithFunc>
				</div>
			</div>
		</>
	);
};

export default GetAllResult;
