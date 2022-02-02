import SearchForm from "./subcomponents/SearchFormDLR/SearchForm";
import s from "./DLRSearch.module.scss";
// import SearchForm from "@vc/frontend/page/Search/subcomponents/SearchFormUTR/SearchForm"; // why does this work?
import Headline from "./subcomponents/HeadlineDLR/Headline";
import Instruction from "./subcomponents/InstructionDLR/Instruction";
import SearchResultsList from "./subcomponents/SearchResultsListDLR/SearchResultsList";
import Pagination from "@vc/frontend/component/PaginationDLR/Pagination";
import React, { useState } from "react";
import { useAuthContext } from "@vc/auth/src/AuthContext";

export default function UTRSearch() {
	const { user } = useAuthContext();
	const [searchResponse, setSearchResponse] = useState();
	const [chosenJob, setChosenJob] = useState();
	const [chosenAddress, setChosenAddress] = useState();
	const [searchRequest, setSearchRequest] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	function startSearchRequest(page: any) {
		user?.getIdToken().then(token => {
			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(searchRequest + page, requestOptions)
				.then(data => data.json())
				.then(parseddata => setSearchResponse(parseddata))
				.catch(error => console.log(error));
		});
	}

	const passFormResponse = (job: any, address: any) => {
		console.log("passed form data to parent");
		setChosenJob(job);
		setChosenAddress(address);
	};

	if (searchResponse) {
		return (
			<>
				<Headline />
				<SearchForm
					passFormResponse={passFormResponse}
					setSearchRequest={setSearchRequest}
					setCurrentPage={setCurrentPage}
					startSearchRequest={startSearchRequest}
					setSearchResponse={setSearchResponse}
				/>
				<div className={s.maindiv_resulttext}>
					<p className={s.resulttext}>
						Suche nach <span className={s.greenSpan}>{chosenJob}</span> in{" "}
						<span className={s.greenSpan}>{chosenAddress}</span>
					</p>
				</div>
				<SearchResultsList searchResponse={searchResponse} />
				<Pagination
					requestOfParent={searchRequest}
					page={currentPage}
					setCurrentPage={setCurrentPage}
					startSearchRequest={startSearchRequest}
				/>
			</>
		);
	} else {
		return (
			<>
				<Headline />
				<SearchForm
					passFormResponse={passFormResponse}
					setSearchRequest={setSearchRequest}
					setCurrentPage={setCurrentPage}
					startSearchRequest={startSearchRequest}
					setSearchResponse={setSearchResponse}
				/>
				<Instruction />
			</>
		);
	}
}
