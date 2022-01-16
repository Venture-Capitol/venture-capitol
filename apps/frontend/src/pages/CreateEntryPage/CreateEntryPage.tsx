import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import React from "react";
import s from "./CreateEntryPage.module.scss";

import CreateForm from "./subcomponents/CreateFormUTR/CreateForm";
import CreateSuccessPopup from "./subcomponents/CreateSuccessPopup/CreateSuccessPopup";

export default function CreateEntryPage() {
	const triggerPopup = () => {
		console.log("called the triggerPopup function in parent component");
	};

	return (
		<>
			<BackArrow />
			<div className={s.maindiv_headline_createEntry}>
				<p className={s.AlsDienstleisterEintragen}>
					Als Dienstleister eintragen
				</p>
			</div>
			<CreateForm triggerPopup={triggerPopup} />
			<CreateSuccessPopup trigger={true} />
		</>
	);
}
