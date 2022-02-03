import { FC, useEffect } from "react";
import s from "./AddressField.module.scss";
import { Loader } from "@googlemaps/js-api-loader";

let autocomplete: any;

const loadScript = (
	setValidAddress: (valid: boolean) => void,
	setAddress: (address: string) => void,
	setLat: (lat: string) => void,
	setLong: (long: string) => void,
	setShowInvalidAddress: (valid: boolean) => void
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
				onPlaceChanged(
					setValidAddress,
					setAddress,
					setLat,
					setLong,
					setShowInvalidAddress
				)
			);
		})
		.catch(e => {
			console.log("Error in loader: " + e);
		});
};

function onPlaceChanged(
	setValidAddress: (valid: boolean) => void,
	setAddress: (address: string) => void,
	setLat: (lat: string) => void,
	setLong: (long: string) => void,
	setShowInvalidAddress: (valid: boolean) => void
) {
	var place = autocomplete.getPlace();
	if (place.geometry) {
		setValidAddress(true);
		setShowInvalidAddress(false);
		setAddress(place.formatted_address);
		setLat(place.geometry.location.lat());
		setLong(place.geometry.location.lng());
	}
}

interface Props {
	setValidAddress: (valid: boolean) => void;
	setAddress: (address: string) => void;
	setLat: (lat: string) => void;
	setLong: (long: string) => void;
	setShowInvalidAddress: (valid: boolean) => void;
}

const AddressField: FC<Props> = ({
	setValidAddress,
	setAddress,
	setLat,
	setLong,
	setShowInvalidAddress,
}) => {
	useEffect(() => {
		loadScript(
			setValidAddress,
			setAddress,
			setLat,
			setLong,
			setShowInvalidAddress
		);
	}, []);

	function handleChange() {
		setValidAddress(false);
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
				required
			/>
		</>
	);
};

export default AddressField;
