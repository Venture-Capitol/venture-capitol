import SearchForm from "./subcomponents/SearchFormDLR/SearchForm";
import s from "./DLRSearch.module.scss";
// import SearchForm from "@vc/frontend/page/Search/subcomponents/SearchFormUTR/SearchForm"; // why does this work?
import Headline from "./subcomponents/HeadlineDLR/Headline";
import Instruction from "./subcomponents/InstructionDLR/Instruction";
import SearchResultsList from "./subcomponents/SearchResultsListDLR/SearchResultsList";
import React, { useState } from "react";

export default function UTRSearch() {
	const [searchResponse, setSearchResponse] = useState(false);
	const [chosenJob, setChosenJob] = useState();
	const [chosenAddress, setChosenAddress] = useState();

	const passSearchResponse = (data: any, job: any, address: any) => {
		console.log("passed search response to parent");
		setChosenJob(job);
		setChosenAddress(address);
		setSearchResponse(data);
	};

	if (searchResponse) {
		return (
			<>
				<Headline />
				<SearchForm passSearchResponse={passSearchResponse} />
				<div className={s.maindiv_resulttext}>
					<p className={s.resulttext}>
						Suche nach <span className={s.greenSpan}>{chosenJob}</span> in{" "}
						<span className={s.greenSpan}>{chosenAddress}</span>
					</p>
				</div>
				<SearchResultsList searchResponse={searchResponse} />
			</>
		);
	} else {
		return (
			<>
				<Headline />
				<SearchForm passSearchResponse={passSearchResponse} />
				<Instruction />
			</>
		);
	}
}
