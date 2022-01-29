import { FunctionComponent, useState } from "react";
import AlertDialog from "../Popup/AlertDialog";
import Button from "@vc/ui/src/components/Button/Button";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";
//import { GPF } from "@vc/api";

import s from "./GPFProfileContent.module.scss";

const GPFProfileContent: FunctionComponent = ({}) => {
	const [companyDeleted, showNotice] = useState(false);

	const { currentCompany } = useGruendungContext();

	async function deleteCompany(): Promise<boolean | undefined> {
		try {
			const company = await GPF.deleteCompanyById(currentCompany?.id);
			showNotice(true);
			return true;
		} catch (e) {
			return undefined;
		}
	}

	return (
		<div className={s.GPFprofileContainer}>
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
				trigger={<Button>Firma löschen</Button>}
			>
				Das Löschen deiner Daten ist nicht rückgängig machbar.
			</AlertDialog>
			<p className={`${s.deletionConfirmation} ${companyDeleted && s.visible}`}>
				Firma erfolgreich gelöscht.
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
