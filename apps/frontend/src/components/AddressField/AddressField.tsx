import { FC, useEffect } from "react";
import s from "./AddressField.module.scss";
import { Loader } from "@googlemaps/js-api-loader";

let autocomplete: any;

const loadScript = (
	setAddress: (address: string) => void,
	setLat: (lat: string) => void,
	setLong: (long: string) => void
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
				onPlaceChanged(setAddress, setLat, setLong)
			);
		})
		.catch(e => {
			console.log("Error in loader: " + e);
		});
};

function onPlaceChanged(
	setAddress: (address: string) => void,
	setLat: (lat: string) => void,
	setLong: (long: string) => void
) {
	var place = autocomplete.getPlace();
	if (place.geometry) {
		setAddress(place.formatted_address);
		setLat(place.geometry.location.lat());
		setLong(place.geometry.location.lng());
	}
}

interface Props {
	setAddress: (address: string) => void;
	setLat: (lat: string) => void;
	setLong: (long: string) => void;
	defaultValue?: string;
}

const AddressField: FC<Props> = ({
	setAddress,
	setLat,
	setLong,
	defaultValue,
}) => {
	useEffect(() => {
		loadScript(setAddress, setLat, setLong);
	}, []);

	function handleChange() {
		setLat("");
		setLong("");
	}

	return (
		<>
			<input
				type='text'
				id='autocomplete'
				name='address'
				placeholder=''
				className={s.textInput}
				onChange={handleChange}
				defaultValue={defaultValue}
				required
			/>
		</>
	);
};

export default AddressField;
