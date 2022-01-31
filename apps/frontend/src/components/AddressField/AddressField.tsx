import { FC, useEffect } from "react";
import s from "./AddressField.module.scss";
import { Loader } from "@googlemaps/js-api-loader";

let autocomplete: any;

const loadScript = (
	setValidAddress: React.Dispatch<React.SetStateAction<boolean>>,
	setAddress: React.Dispatch<React.SetStateAction<string>>,
	setLat: React.Dispatch<React.SetStateAction<string>>,
	setLong: React.Dispatch<React.SetStateAction<string>>
) => {
	let apiKey =
		typeof import.meta.env.VITE_FIREBASE_API_KEY == "string"
			? import.meta.env.VITE_FIREBASE_API_KEY
			: "";
	const loader = new Loader({
		apiKey: apiKey,
		libraries: ["places"],
	});

	const autocompleteOptions = {
		types: ["address"],
		componentRestrictions: { country: ["DE"] },
		fields: ["formatted_address", "geometry", "name"],
	};

	loader
		.load()
		.then(google => {
			autocomplete = new google.maps.places.Autocomplete(
				document.getElementById("autocomplete"),
				autocompleteOptions
			);
			autocomplete.addListener("place_changed", () =>
				onPlaceChanged(setValidAddress, setAddress, setLat, setLong)
			);
		})
		.catch(e => {
			console.log("Error in loader: " + e);
		});
};

function onPlaceChanged(
	setValidAddress: React.Dispatch<React.SetStateAction<boolean>>,
	setAddress: React.Dispatch<React.SetStateAction<string>>,
	setLat: React.Dispatch<React.SetStateAction<string>>,
	setLong: React.Dispatch<React.SetStateAction<string>>
) {
	var place = autocomplete.getPlace();
	if (place.geometry) {
		setValidAddress(true);
		setAddress(place.formatted_address);
		setLat(place.geometry.location.lat());
		setLong(place.geometry.location.lng());
	}
}
interface Props {
	setValidAddress: React.Dispatch<React.SetStateAction<boolean>>;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	setLat: React.Dispatch<React.SetStateAction<string>>;
	setLong: React.Dispatch<React.SetStateAction<string>>;
}

const AddressField: FC<Props> = ({
	setValidAddress,
	setAddress,
	setLat,
	setLong,
}) => {
	useEffect(() => {
		loadScript(setValidAddress, setAddress, setLat, setLong);
	}, []);

	return (
		<>
			<input
				type='text'
				id='autocomplete'
				name='address'
				placeholder=''
				className={s.textInput}
			/>
		</>
	);
};

export default AddressField;
