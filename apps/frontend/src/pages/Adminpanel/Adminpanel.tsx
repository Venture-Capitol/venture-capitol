import s from "./Adminpanel.module.scss";
import { useState } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import GetAllResultList from "./subcomponents/GetAllResultList/GetAllResultList";
import CreateFormAdmin from "./subcomponents/CreateFormAdmin/CreateFormAdmin";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import EditFormAdmin from "./subcomponents/EditFormAdmin/EditFormAdmin";
import PaginationAdminpanel from "./subcomponents/PaginationAdminpanel/PaginationAdminpanel";

export default function Adminpanel() {
	const { user } = useAuthContext();
	// Filter Companies by verified status
	const [chosenVerified, setChosenVerified] = useState("Alle");
	const [response, setResponse] = useState("");
	const [currentlyCreating, setCurrentlyCreating] = useState(false);
	const [currentlyEditing, setCurrentlyEditing] = useState(false);
	const [editData, setEditData] = useState();

	const [requestURL, setRequestURL] = useState("");
	const [currentPage, setCurrentPage] = useState(0);

	function handleSubmit(page: any, event?: any) {
		if (event) {
			event.preventDefault();
		}

		user?.getIdToken().then(token => {
			var fetchURL;

			if (chosenVerified == "Ja") {
				fetchURL = "http://localhost:8103/entry?verified=true&amount=10&page=";
			} else if (chosenVerified == "Nein") {
				fetchURL = "http://localhost:8103/entry?verified=false&amount=10&page=";
			} else {
				fetchURL = "http://localhost:8103/entry?amount=10&page=";
			}

			setRequestURL(fetchURL);
			setCurrentPage(page);

			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL + page, requestOptions)
				.then(data => data.json())
				.then(parseddata => {
					setResponse(parseddata);
				})
				.catch(error => console.log(error));
		});
	}

	function backToAdminpanel() {
		setCurrentlyCreating(false);
		setCurrentlyEditing(false);
	}

	function checkResponseListRendering() {
		if (response == "") {
			return <></>;
		} else {
			return (
				<div>
					<div className={s.searchResultsDiv}>
						<GetAllResultList
							getAllResponse={response}
							searchAgain={handleSubmit}
							setDataForEdit={setDataForEdit}
							page={currentPage}
						/>
					</div>
					<PaginationAdminpanel
						page={currentPage}
						startGetallRequest={handleSubmit}
						setCurrentPage={setCurrentPage}
						requestURL={requestURL}
					/>
				</div>
			);
		}
	}

	function setDataForEdit(data: any) {
		setEditData(data);
		setCurrentlyEditing(true);
	}

	if (currentlyCreating === true) {
		return (
			<CreateFormAdmin
				returnToAdminpanel={backToAdminpanel}
				searchAgain={handleSubmit}
				page={currentPage}
			/>
		);
	} else if (currentlyEditing === true) {
		return (
			<EditFormAdmin
				returnToAdminpanel={backToAdminpanel}
				searchAgain={handleSubmit}
				editData={editData}
				page={currentPage}
			/>
		);
	} else {
		return (
			<>
				<div className={s.maindiv_headlineAdminpanel}>
					<p className={s.headlineAdminpanel}>Adminpanel</p>
				</div>
				<div className={s.SearchAllAndAdd}>
					<form
						className={s.searchAllForm}
						onSubmit={event => handleSubmit(0, event)}
					>
						<label className={s.inputblock_adminpanel}>
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
