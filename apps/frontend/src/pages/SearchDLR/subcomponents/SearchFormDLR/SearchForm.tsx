import AddressField from "../../../../components/AddressField/AddressField";
import s from "./SearchForm.module.scss";
import Button from "@vc/ui/src/components/Button/Button";
import { useState } from "react";
import AddressWarning from "../AddressWarning/AddressWarning";
import DienstleisterRadioTiles from "@vc/frontend/component/DienstleisterRadioTiles/DienstleisterRadioTiles";

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
	const [showSelectError, setShowSelectError] = useState(false);

	return (
		<div className={s.maindiv}>
			<form
				className={s.form}
				onKeyPress={e => {
					e.key === "Enter" && e.preventDefault();
				}}
				onSubmit={e => {
					e.preventDefault();
					if (lat == "") {
						setShowError(true);
					}
					if (chosenJob == "") {
						setShowSelectError(true);
					}
					if (lat != "" && chosenJob != "") {
						setShowError(false);
						setShowSelectError(false);
						startSearchRequest();
					}
				}}
			>
				<DienstleisterRadioTiles
					chosenJob={chosenJob}
					setJobAndError={(job: string) => {
						setChosenJob(job);
						setShowSelectError(false);
					}}
				/>
				{showSelectError ? (
					<p className={s.selectError}>
						Bitte wähle eine Dienstleistung zum Suchen aus!
					</p>
				) : null}
				<div className={s.addressAndSearch}>
					<label className={s.input_block}>
						Deine Adresse
						<AddressField
							setAddress={address => {
								setShowError(false);
								setChosenAddress(address);
							}}
							setLat={setLat}
							setLong={setLong}
						/>
					</label>
					<Button>
						<div className={s.IconAndText}>
							<svg
								width='18'
								height='18'
								viewBox='0 0 18 18'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className={s.searchIcon}
							>
								<path
									d='M15.75 15.75L11.25 11.25L15.75 15.75ZM12.75 7.5C12.75 8.18944 12.6142 8.87213 12.3504 9.50909C12.0865 10.146 11.6998 10.7248 11.2123 11.2123C10.7248 11.6998 10.146 12.0865 9.50909 12.3504C8.87213 12.6142 8.18944 12.75 7.5 12.75C6.81056 12.75 6.12787 12.6142 5.49091 12.3504C4.85395 12.0865 4.2752 11.6998 3.78769 11.2123C3.30018 10.7248 2.91347 10.146 2.64963 9.50909C2.3858 8.87213 2.25 8.18944 2.25 7.5C2.25 6.10761 2.80312 4.77226 3.78769 3.78769C4.77226 2.80312 6.10761 2.25 7.5 2.25C8.89239 2.25 10.2277 2.80312 11.2123 3.78769C12.1969 4.77226 12.75 6.10761 12.75 7.5Z'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							Suchen
						</div>
					</Button>
				</div>
			</form>
			{showError ? <AddressWarning /> : null}
		</div>
	);
};

export default SearchForm;
