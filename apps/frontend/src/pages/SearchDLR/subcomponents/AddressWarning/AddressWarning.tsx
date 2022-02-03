import React from "react";
import s from "./AddressWarning.module.scss";

const AddressWarning: React.FunctionComponent = () => {
	return (
		<div className={s.maindiv_address_Warning}>
			<p className={s.address_Warning}>
				Bitte wähle eine vollständige Adresse aus
			</p>
		</div>
	);
};

export default AddressWarning;
