import s from "./Adminpannel.module.scss";
import React, { useState, useContext } from "react";
import { AuthContext, AuthUI, User } from "@vc/auth";
import Button from "@vc/ui/src/components/Button/Button";
import GetAllResultList from "./subcomponents/GetAllResultList/GetAllResultList";
import CreateFormAdmin from "./subcomponents/CreateFormAdmin/CreateFormAdmin";

export default function Adminpannel() {
	const currentUser = useContext<User | null>(AuthContext);
	const [chosenVerfified, setChosenVerified] = useState("Alle");
	const [response, setResponse] = useState("");
	const [currentlyCreating, setCurrentlyCreating] = useState(false);

	function handleSubmit(event: any) {
		event.preventDefault();
		console.log("Hi");

		currentUser?.getIdToken().then(token => {
			var fetchURL;

			if (chosenVerfified == "Ja") {
				fetchURL = "http://localhost:8103/entry?verified=true&amount=10&page=0";
			} else if (chosenVerfified == "Nein") {
				fetchURL =
					"http://localhost:8103/entry?verified=false&amount=10&page=0";
			} else {
				fetchURL = "http://localhost:8103/entry?amount=10&page=0";
			}

			console.log(fetchURL);

			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL, requestOptions)
				.then(data => data.json())
				.then(parseddata => checkResponse(parseddata))
				.catch(error => console.log(error));
		});
	}

	function backToAdminpannel() {
		setCurrentlyCreating(false);
	}

	function checkResponse(data: any) {
		console.log(data);
		setResponse(data);
	}

	function checkSPARendering() {
		if (currentlyCreating === false) {
			return (
				<>
					<div className={s.maindiv_headlineAdminpannel}>
						<p className={s.headlineAdminpannel}>Adminpannel</p>
					</div>
					<div className={s.SearchAllAndAdd}>
						<form
							className={s.searchAllForm}
							onSubmit={event => handleSubmit(event)}
						>
							<label className={s.inputblock_adminpannel}>
								Verifiziert
								<select
									name='Dienstleistungen'
									className={s.verifiedoption}
									onChange={event => setChosenVerified(event.target.value)}
									required
								>
									<option value='Alle'>Alle</option>
									<option value='Ja'>Ja</option>
									<option value='Nein'>Nein</option>
								</select>
							</label>
							<Button>Suchen</Button>
						</form>
						<div
							className={s.addButtonDiv}
							onClick={event => setCurrentlyCreating(true)}
						>
							<Button>+ Dienstleister hinzufügen</Button>
						</div>
					</div>
					{checkResponseListRendering()}
				</>
			);
		} else {
			return <CreateFormAdmin returnToAdminpannel={backToAdminpannel} />;
		}
	}

	function checkResponseListRendering() {
		if (response == "") {
			return <></>;
		} else {
			return (
				<div className={s.searchResultsDiv}>
					<GetAllResultList getAllResponse={response} />
				</div>
			);
		}
	}

	return checkSPARendering();
}
