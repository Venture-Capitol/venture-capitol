import SearchForm from "./subcomponents/SearchFormDLR/SearchForm";
import s from "./DLRSearch.module.scss";
// import SearchForm from "@vc/frontend/page/Search/subcomponents/SearchFormUTR/SearchForm"; // why does this work?
import Headline from "./subcomponents/HeadlineDLR/Headline";
import Instruction from "./subcomponents/InstructionDLR/Instruction";
import SearchResultsList from "./subcomponents/SearchResultsListDLR/SearchResultsList";
import Pagination from "@vc/frontend/component/PaginationDLR/Pagination";
import React, { useState } from "react";

export default function UTRSearch() {
	const [searchResponse, setSearchResponse] = useState(false);
	const [chosenJob, setChosenJob] = useState();
	const [chosenAddress, setChosenAddress] = useState();
	const [searchRequest, setSearchRequest] = useState();
	const [currentPage, setCurrentPage] = useState();

	const passSearchResponse = (data: any, job: any, address: any) => {
		console.log("passed search response to parent");
		setChosenJob(job);
		setChosenAddress(address);
		setSearchResponse(data);
	};

	const passSearchRequest = (request: any) => {
		setSearchRequest(request);
	};

	const passPageOfRequest = (page: any) => {
		setCurrentPage(page);
	};

	if (searchResponse) {
		return (
			<>
				<Headline />
				<SearchForm
					passSearchResponse={passSearchResponse}
					passSearchRequest={passSearchRequest}
					passPageOfRequest={passPageOfRequest}
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
					responseOfParent={searchResponse}
					page={currentPage}
				/>
			</>
		);
	} else {
		return (
			<>
				<Headline />
				<SearchForm
					passSearchResponse={passSearchResponse}
					passSearchRequest={passSearchRequest}
					passPageOfRequest={passPageOfRequest}
				/>
				<Instruction />
			</>
		);
	}
}
