import React, { useState } from "react";
import s from "./GetDienstleisterInfoList.module.scss";

const CreateForm: React.FunctionComponent = () => {
	const [company, setCompany] = useState("");
	const [jobname, setJobname] = useState("Notar");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [telefon, setTelefon] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");

	return (
		<div className={s.maindiv_getEntryInfos}>
			<div className={s.listOfInfos}>
				<div className={s.divOfAttributeAndValue}>
					<p className={s.nameOfAttribute}>Dienstleistung</p>
					<p className={s.attributeValue}>Notar</p>
				</div>
				<div className={s.divOfAttributeAndValue}>
					<p className={s.nameOfAttribute}>Adresse / PLZ / Ort</p>
					<p className={s.attributeValue}>
						Neuestraße 13, 12923 Berlin, Deutschland
					</p>
				</div>
				<div className={s.divOfAttributeAndValue}>
					<p className={s.nameOfAttribute}>E-Mail Adresse</p>
					<p className={s.attributeValue}>mundn@notare.de</p>
				</div>
				<div className={s.divOfAttributeAndValue}>
					<p className={s.nameOfAttribute}>Telefon</p>
					<p className={s.attributeValue}>030 12923 023 0221</p>
				</div>
				<div className={s.divOfAttributeAndValue}>
					<p className={s.nameOfAttribute}>Website</p>
					<p className={s.attributeValue}>mn-notare.de</p>
				</div>
				<div className={s.divOfAttributeAndValue}>
					<p className={s.nameOfAttribute}>Beschreibung</p>
					<p className={s.attributeValue}>
						Wir sind eine Notarfirma in Deutschland
					</p>
				</div>
			</div>
		</div>
	);
};

export default CreateForm;
