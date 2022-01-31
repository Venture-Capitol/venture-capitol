import React from "react";
import s from "./AddressWarning.module.scss";

const AddressWarning: React.FunctionComponent = () => {
	return (
		<div className={s.maindiv_address_Warning}>
			<p className={s.address_Warning}>
				Bitte wählen Sie eine Adresse aus der Liste aus
			</p>
		</div>
	);
};

export default AddressWarning;
