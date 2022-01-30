import React, { useState } from "react";
import s from "./AddressField.module.scss";
import { Loader } from "@googlemaps/js-api-loader";

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
let autocomplete: any;
loader
	.load()
	.then(google => {
		autocomplete = new google.maps.places.Autocomplete(
			document.getElementById("autocomplete"),
			autocompleteOptions
		);
		console.log(document.getElementById("autocomplete"));
		autocomplete.addListener("place_changed", onPlaceChanged);
	})
	.catch(e => {
		console.log("Error in loader: " + e);
	});

function onPlaceChanged() {
	var place = autocomplete.getPlace();
	console.log("here: " + place);
	if (place.geometry) {
		console.log("Address: " + place.formatted_address);
		console.log("Lat: " + place.geometry.location.lat());
		console.log("Long: " + place.geometry.location.lng());
		// Write Address and location to Props
		/* let adressResult = document.getElementById("adressResult");
		let cordsResult = document.getElementById("cordsResult");
		if (adressResult != null && place != undefined) {
			adressResult.innerHTML = "Adresse: " + place.formatted_address;
			console.log(place.formatted_address);
		}
		if (cordsResult != null && place != undefined) {
			cordsResult.innerHTML =
				"Koordinaten: lat: " +
				place.geometry.location.lat() +
				" lng: " +
				place.geometry.location.lng();
		} */
	}
}

const AddressField: React.FunctionComponent = () => {
	const [address, setAddress] = useState("");
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");

	return (
		<input
			type='text'
			id='autocomplete'
			name='address'
			placeholder=''
			className={s.textInput}
		/>
	);
};

export default AddressField;
