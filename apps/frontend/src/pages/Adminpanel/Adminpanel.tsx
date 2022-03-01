import s from "./Adminpanel.module.scss";
import { useState, useEffect } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import GetAllResultList from "./subcomponents/GetAllResultList/GetAllResultList";
import CreateFormAdmin from "./subcomponents/CreateFormAdmin/CreateFormAdmin";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import EditFormAdmin from "./subcomponents/EditFormAdmin/EditFormAdmin";
import PaginationAdminpanel from "./subcomponents/PaginationAdminpanel/PaginationAdminpanel";

export default function Adminpanel() {
	const [loadedPages, setLoadedPages] = useState<any>([]);

	const { user } = useAuthContext();
	const [isAdmin, setIsAdmin] = useState(false);
	// Filter Companies by verified status
	const [chosenVerified, setChosenVerified] = useState("Alle");
	const [currentPage, setCurrentPage] = useState(0);

	const [currentlyCreating, setCurrentlyCreating] = useState(false);
	const [currentlyEditing, setCurrentlyEditing] = useState(false);

	// needed to get data of one concrete search result to the editform located here
	const [editData, setEditData] = useState();

	useEffect(() => {
		checkAdmin();
	}, [user]);

	async function checkAdmin() {
		let idTokenResult = await user?.getIdTokenResult();

		if (idTokenResult?.claims.role == "admin") {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}

	async function startGetAllRequest(event: any) {
		event.preventDefault();
		let pageOne = await fetchGetAllResult(0);
		let pageTwo = await fetchGetAllResult(1);

		setLoadedPages([pageOne, pageTwo]);
		setCurrentPage(0);
	}

	async function fetchGetAllResult(page: any) {
		let token = await user?.getIdToken();

		let fetchURL;
		if (chosenVerified == "Ja") {
			fetchURL = "/dlr/entry?verified=true&amount=10&page=";
		} else if (chosenVerified == "Nein") {
			fetchURL = "/dlr/entry?verified=false&amount=10&page=";
		} else {
			fetchURL = "/dlr/entry?amount=10&page=";
		}

		const requestOptions = {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		let fetchData = await fetch(fetchURL + page, requestOptions);
		return fetchData.json();
	}

	async function searchAgainToUpdate() {
		let loadedPagesCopy = [...loadedPages];
		let pageReloaded = await fetchGetAllResult(currentPage);

		loadedPagesCopy[currentPage] = pageReloaded;
		setLoadedPages(loadedPagesCopy);
	}

	async function weiter() {
		setCurrentPage(currentPage + 1);
		if (loadedPages[currentPage + 1] == undefined) {
			let newSearchResult = await fetchGetAllResult(currentPage + 2);
			setLoadedPages([...loadedPages, newSearchResult]);
		}
	}

	function backToAdminpanel() {
		setCurrentlyCreating(false);
		setCurrentlyEditing(false);
	}

	function checkResponseListRendering() {
		if (loadedPages.length <= 0) {
			return <></>;
		} else {
			return (
				<div>
					<div className={s.searchResultsDiv}>
						<GetAllResultList
							getAllResponse={loadedPages[currentPage]}
							searchAgain={searchAgainToUpdate}
							setEditData={setEditData}
							setCurrentlyEditing={setCurrentlyEditing}
						/>
					</div>
					<PaginationAdminpanel
						page={currentPage}
						loadedPages={loadedPages}
						weiter={weiter}
						zurueck={() => setCurrentPage(currentPage - 1)}
					/>
				</div>
			);
		}
	}

	if (isAdmin === false) {
		return <></>;
	}
	if (currentlyCreating === true) {
		return (
			<CreateFormAdmin
				returnToAdminpanel={backToAdminpanel}
				searchAgain={searchAgainToUpdate}
			/>
		);
	} else if (currentlyEditing === true) {
		return (
			<EditFormAdmin
				returnToAdminpanel={backToAdminpanel}
				searchAgain={searchAgainToUpdate}
				editData={editData}
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
						onSubmit={event => startGetAllRequest(event)}
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
