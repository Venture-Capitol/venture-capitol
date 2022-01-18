import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import s from "./CreateDienstleisterPage.module.scss";
import React, { useState } from "react";

import CreateForm from "./subcomponents/CreateFormDLR/CreateForm";

export default function CreateEntryPage() {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const triggerPopup = (isOpen: boolean) => {
		console.log("called the triggerPopup function in parent component");
		setShowConfirmation(isOpen);
	};

	if (showConfirmation) {
		return (
			<>
				<div className={s.maindiv_headline_createEntry}>
					<BackArrow />
					<p className={s.AlsDienstleisterEintragen}>
						Als Dienstleister eintragen
					</p>
				</div>
				<CreateForm triggerPopup={triggerPopup} />
				<div className={s.createsuccess_div}>
					<p>
						Hinzufügen erfolgreich!<br></br> Sobald ein Admin deine Eintragung
						verifiziert hat wirst du in der Suche gelistet!
					</p>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className={s.maindiv_headline_createEntry}>
					<BackArrow />
					<p className={s.AlsDienstleisterEintragen}>
						Als Dienstleister eintragen
					</p>
				</div>
				<CreateForm triggerPopup={triggerPopup} />
			</>
		);
	}
}
