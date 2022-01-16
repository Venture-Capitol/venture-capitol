import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import s from "./CreateEntryPage.module.scss";

import CreateForm from "./subcomponents/CreateFormUTR/CreateForm";
import CreateSuccessPopup from "./subcomponents/CreateSuccessPopup/CreateSuccessPopup";

export default function CreateEntryPage() {
	const triggerPopup = () => {
		console.log("called the triggerPopup function in parent component");
	};

	return (
		<>
			<div className={s.maindiv_headline_createEntry}>
				<BackArrow />
				<p className={s.AlsDienstleisterEintragen}>
					Als Dienstleister eintragen
				</p>
			</div>
			<CreateForm triggerPopup={triggerPopup} />
			<CreateSuccessPopup />
		</>
	);
}
