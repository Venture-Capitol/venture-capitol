import AddressField from "../../../../components/AddressField/AddressField";
import s from "./SearchForm.module.scss";
import Button from "@vc/ui/src/components/Button/Button";
import { useState } from "react";
import AddressWarning from "../AddressWarning/AddressWarning";

interface Props {
	startSearchRequest: () => void;
	chosenJob: string;
	setChosenJob: (job: string) => void;
	setChosenAddress: (address: string) => void;
	lat: string;
	setLat: (lat: string) => void;
	setLong: (long: string) => void;
}

const SearchForm = ({
	startSearchRequest,
	chosenJob,
	setChosenJob,
	setChosenAddress,
	lat,
	setLat,
	setLong,
}: Props) => {
	const [showError, setShowError] = useState(false);
	return (
		<div className={s.maindiv}>
			<form
				className={s.form}
				onKeyPress={e => {
					e.key === "Enter" && e.preventDefault();
				}}
				onSubmit={e => {
					e.preventDefault();
					if (lat != "") {
						startSearchRequest();
						setShowError(false);
					} else {
						setShowError(true);
					}
				}}
			>
				<label className={s.input_block}>
					Dienstleistung
					<select
						name='Dienstleistungen'
						className={s.joboption}
						onChange={event => setChosenJob(event.target.value)}
						value={chosenJob}
						required
					>
						<option value='' disabled hidden className={s.disabledOption}>
							Bitte auswählen
						</option>
						<option value='Notar'>Notar</option>
						<option value='Rechtsanwalt'>Rechtsanwalt</option>
						<option value='Steuerberater'>Steuerberater</option>
						<option value='Webagentur'>Webagentur</option>
					</select>
				</label>
				<label className={s.input_block}>
					Adresse
					<AddressField
						setAddress={address => {
							setShowError(false);
							setChosenAddress(address);
						}}
						setLat={setLat}
						setLong={setLong}
					/>
				</label>
				<Button>Suchen</Button>
			</form>
			{showError ? <AddressWarning /> : null}
		</div>
	);
};

export default SearchForm;
