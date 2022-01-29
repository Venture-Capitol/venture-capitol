import React, { useState, useContext } from "react";
import s from "./GetAllResult.module.scss";
import { AuthContext, AuthUI, User } from "@vc/auth";
import Button from "@vc/ui/src/components/Button/Button";

interface Props {
	resultData: any;
}

const GetAllResult = ({ resultData }: Props) => {
	const currentUser = useContext<User | null>(AuthContext);
	const [isVerified, setIsVerified] = useState(resultData.verified);

	function verifyEntry(event: any) {
		event.preventDefault();

		const body = {
			editedEntry: {
				verified: true,
			},
		};

		const fetchURL = "http://localhost:8103/entry/" + resultData.id;

		currentUser?.getIdToken().then(token => {
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
			setIsVerified(true);
		} else {
			setIsVerified(false);
		}
	}

	function checkVerfiyButtonVariant() {
		if (isVerified === true) {
			return (
				<button className={s.isVerifiedButton}>Bereits verifiziert</button>
			);
		} else {
			return (
				<button className={s.verifyDLButton} onClick={e => verifyEntry(e)}>
					Verifizieren
				</button>
			);
		}
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
					<button className={s.editDLButton}>Bearbeiten</button>
					<button className={s.deleteDLButton}>Löschen</button>
				</div>
			</div>
		</>
	);
};

export default GetAllResult;
