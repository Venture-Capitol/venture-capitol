import { FunctionComponent, useState } from "react";
import AlertDialog from "../Popup/AlertDialog";
import Button from "@vc/ui/src/components/Button/Button";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";
import { GPF } from "@vc/api";

import s from "./GPFProfileContent.module.scss";

const GPFProfileContent: FunctionComponent = ({}) => {
	const [companyDeleted, showNotice] = useState(false);
	const [companyDeletedError, showErrorNotice] = useState(false);

	const { currentCompany } = useGruendungContext();
	console.log(currentCompany);

	async function deleteCompany(): Promise<boolean | undefined> {
		if (currentCompany == undefined) {
			showErrorNotice(true);
			return undefined;
		}
		try {
			const company = await GPF.deleteCompany(currentCompany.id);
			showNotice(true);
			return true;
		} catch (e) {
			showErrorNotice(true);
			return undefined;
		}
	}

	return (
		<div className={s.GPFprofileContainer}>
			<div className={`${s.alertContainer} ${!currentCompany && s.disabled}`}>
				<AlertDialog
					title={"Bist du dir sicher?"}
					defaultOpen={false}
					action={
						<Button
							onClick={() => {
								deleteCompany();
							}}
						>
							Firma löschen
						</Button>
					}
					cancel={<Button>Abbrechen</Button>}
					trigger={
						<Button disabled={!currentCompany && true}>Firma löschen</Button>
					}
				>
					Das Löschen deiner Daten ist nicht rückgängig machbar.
				</AlertDialog>
			</div>
			<p className={`${s.deletionConfirmation} ${companyDeleted && s.visible}`}>
				Firma erfolgreich gelöscht.
			</p>
			<p className={`${s.deletionError} ${companyDeletedError && s.visible}`}>
				Es gab einen Fehler, bitte schick uns eine Email damit wir dir
				weiterhelfen können.
			</p>
			<p className={s.notice}>
				Hey, wir sind noch im Aufbau und hier kommt bald mehr. Wenn du deinen
				Account löschen willst, schick uns einfach eine Mail an{" "}
				<a href='mailto:info@venturecapitol.de'>info@venturecapitol.de</a>
			</p>
		</div>
	);
};

export default GPFProfileContent;
