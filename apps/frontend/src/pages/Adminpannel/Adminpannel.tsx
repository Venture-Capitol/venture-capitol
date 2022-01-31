import s from "./Adminpannel.module.scss";
import React, { useState, useContext } from "react";
import { AuthContext, AuthUI, User } from "@vc/auth";
import Button from "@vc/ui/src/components/Button/Button";
import GetAllResultList from "./subcomponents/GetAllResultList/GetAllResultList";
import CreateFormAdmin from "./subcomponents/CreateFormAdmin/CreateFormAdmin";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import EditFormAdmin from "./subcomponents/EditFormAdmin/EditFormAdmin";

export default function Adminpannel() {
	const { user } = useAuthContext();
	const [chosenVerfified, setChosenVerified] = useState("Alle");
	const [response, setResponse] = useState("");
	const [currentlyCreating, setCurrentlyCreating] = useState(false);
	const [currentlyEditing, setCurrentlyEditing] = useState(false);
	const [editData, setEditData] = useState();

	function handleSubmit(event: any) {
		if (event) {
			event.preventDefault();
		}
		console.log("Hi");

		user?.getIdToken().then(token => {
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
		setCurrentlyEditing(false);
	}

	function checkResponse(data: any) {
		console.log(data);
		setResponse(data);
	}

	function checkResponseListRendering() {
		if (response == "") {
			return <></>;
		} else {
			return (
				<div className={s.searchResultsDiv}>
					<GetAllResultList
						getAllResponse={response}
						searchAgain={handleSubmit}
						setDataForEdit={setDataForEdit}
					/>
				</div>
			);
		}
	}

	function setDataForEdit(data: any) {
		setEditData(data);
		setCurrentlyEditing(true);
	}

	function checkSPARendering() {
		if (currentlyCreating === true) {
			return (
				<CreateFormAdmin
					returnToAdminpannel={backToAdminpannel}
					searchAgain={handleSubmit}
				/>
			);
		} else if (currentlyEditing === true) {
			return (
				<EditFormAdmin
					returnToAdminpannel={backToAdminpannel}
					searchAgain={handleSubmit}
					editData={editData}
				/>
			);
		} else {
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
		}
	}

	return checkSPARendering();
}
