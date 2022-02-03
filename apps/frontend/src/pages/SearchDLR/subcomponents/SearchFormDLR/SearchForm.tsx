import AddressField from "../../../../components/AddressField/AddressField";
import s from "./SearchForm.module.scss";
import Button from "@vc/ui/src/components/Button/Button";

interface Props {
	startSearchRequest: () => void;
	chosenJob: string;
	setChosenJob: (job: string) => void;
	setChosenAddress: (address: string) => void;
	setValidAddress: (valid: boolean) => void;
	setLat: (lat: string) => void;
	setLong: (long: string) => void;
	setShowInvalidAddress: (valid: boolean) => void;
}

const SearchForm = ({
	startSearchRequest,
	chosenJob,
	setChosenJob,
	setChosenAddress,
	setValidAddress,
	setLat,
	setLong,
	setShowInvalidAddress,
}: Props) => {
	return (
		<div className={s.maindiv}>
			<form
				className={s.form}
				onKeyPress={e => {
					e.key === "Enter" && e.preventDefault();
				}}
				onSubmit={e => {
					e.preventDefault();
					startSearchRequest();
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
						setValidAddress={setValidAddress}
						setAddress={setChosenAddress}
						setLat={setLat}
						setLong={setLong}
						setShowInvalidAddress={setShowInvalidAddress}
					/>
				</label>
				<Button>Suchen</Button>
			</form>
		</div>
	);
};

export default SearchForm;
