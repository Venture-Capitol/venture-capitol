import { useState, useContext, FC } from "react";
import { AuthContext, AuthUI, User } from "@vc/auth";
import AddressField from "../../../../components/AddressField/AddressField";
import s from "./SearchForm.module.scss";

interface Props {
	passSearchResponse: (data: any, job: string, address: string) => void;
	passValidAddress: (valid: boolean) => void;
}

const SearchForm: FC<Props> = ({ passSearchResponse, passValidAddress }) => {
	const currentUser = useContext<User | null>(AuthContext);
	const [chosenJobname, setChosenJobname] = useState("Notar");
	const [validAddress, setValidAddress] = useState(false);
	const [address, setAddress] = useState("");
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");

	function handleSubmit(eventtarget: React.FormEvent<HTMLFormElement>) {
		eventtarget.preventDefault();

		if (validAddress) {
			currentUser?.getIdToken().then(token => {
				const fetchURL =
					"http://localhost:8103/entry/search?jobname=" +
					chosenJobname +
					"&latitude=" +
					lat +
					"&longitude=" +
					long +
					"&page=1";

				const requestOptions = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + token,
					},
				};

				return fetch(fetchURL, requestOptions)
					.then(data => data.json())
					.then(parseddata => checkResponse(parseddata))
					.then(() => passValidAddress(validAddress))
					.catch(error => console.log(error));
			});
		} else {
			passValidAddress(validAddress);
		}
	}

	function checkResponse(data: any) {
		passSearchResponse(data, chosenJobname, address);
	}

	return (
		<div className={s.maindiv}>
			<form
				className={s.form}
				onKeyPress={e => {
					e.key === "Enter" && e.preventDefault();
				}}
				onSubmit={event => handleSubmit(event)}
			>
				<label className={s.input_block}>
					Dienstleistung
					<select
						name='Dienstleistungen'
						className={s.joboption}
						onChange={event => setChosenJobname(event.target.value)}
					>
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
						setAddress={setAddress}
						setLat={setLat}
						setLong={setLong}
					/>
				</label>
				<input type='submit' value='Suchen' className={s.submit} />
			</form>
		</div>
	);
};

export default SearchForm;
