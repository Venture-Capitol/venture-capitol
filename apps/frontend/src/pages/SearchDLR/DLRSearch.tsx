import SearchForm from "./subcomponents/SearchFormDLR/SearchForm";
import s from "./DLRSearch.module.scss";
import Headline from "./subcomponents/HeadlineDLR/Headline";
import SearchResultsList from "./subcomponents/SearchResultsListDLR/SearchResultsList";
import Pagination from "@vc/frontend/page/SearchDLR/subcomponents/PaginationDLR/Pagination";
import React, { useState } from "react";

export default function DLRSearch() {
	const [loadedPages, setLoadedPages] = useState<any>([]);
	const [loadingState, setLoadingState] = useState<
		undefined | "loading" | "finished" | "error"
	>();
	const [chosenJob, setChosenJob] = useState("");
	const [displayJob, setDisplayJob] = useState("");
	const [chosenAddress, setChosenAddress] = useState("");
	const [displayAddress, setDisplayAddress] = useState("");
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	async function startSearchRequest() {
		setDisplayJob(chosenJob);
		setDisplayAddress(chosenAddress);
		setLoadingState("loading");
		let pageOne = await getSearchResult(1);
		let pageTwo = await getSearchResult(2);

		setLoadedPages([pageOne, pageTwo]);
		setCurrentPage(1);
		setLoadingState("finished");
	}

	async function weiter() {
		setCurrentPage(currentPage + 1);
		if (loadedPages[currentPage + 1] == undefined) {
			let newSearchResult = await getSearchResult(currentPage + 2);
			setLoadedPages([...loadedPages, newSearchResult]);
		}
	}

	async function getSearchResult(page: number) {
		const fetchURL =
			"/dlr/entry/search?jobname=" +
			chosenJob +
			"&latitude=" +
			lat +
			"&longitude=" +
			long +
			"&page=";

		let fetchData = await fetch(fetchURL + page);
		return fetchData.json();
	}

	if (loadingState == undefined) {
		return (
			<div className={s.wrapper}>
				<Headline />
				<SearchForm
					startSearchRequest={startSearchRequest}
					chosenJob={chosenJob}
					setChosenJob={setChosenJob}
					setChosenAddress={setChosenAddress}
					lat={lat}
					setLat={setLat}
					setLong={setLong}
				/>
			</div>
		);
	} else {
		return (
			<div className={s.wrapper}>
				<Headline />
				<SearchForm
					startSearchRequest={startSearchRequest}
					chosenJob={chosenJob}
					setChosenJob={setChosenJob}
					setChosenAddress={setChosenAddress}
					lat={lat}
					setLat={setLat}
					setLong={setLong}
				/>
				<div className={s.maindiv_resulttext}>
					<p className={s.resulttext}>
						Suche nach <span className={s.greenSpan}>{displayJob}</span> in{" "}
						<span className={s.greenSpan}>{displayAddress}</span>
					</p>
				</div>
				{loadingState == "loading" && (
					<div className={s.loadingIndicator}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				)}
				{loadingState == "finished" && (
					<>
						<SearchResultsList searchResponse={loadedPages[currentPage - 1]} />
						<Pagination
							page={currentPage}
							loadedPages={loadedPages}
							weiter={weiter}
							zurueck={() => setCurrentPage(currentPage - 1)}
						/>
					</>
				)}
			</div>
		);
	}
}
