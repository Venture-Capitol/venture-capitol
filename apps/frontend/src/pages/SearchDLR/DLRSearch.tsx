import SearchForm from "./subcomponents/SearchFormDLR/SearchForm";
import s from "./DLRSearch.module.scss";
import Headline from "./subcomponents/HeadlineDLR/Headline";
import Instruction from "./subcomponents/InstructionDLR/Instruction";
import SearchResultsList from "./subcomponents/SearchResultsListDLR/SearchResultsList";
import Pagination from "@vc/frontend/page/SearchDLR/subcomponents/PaginationDLR/Pagination";
import { useState } from "react";

export default function DLRSearch() {
	const [loadedPages, setLoadedPages] = useState<any>([]);

	const [chosenJob, setChosenJob] = useState("");
	const [chosenAddress, setChosenAddress] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	async function startSearchRequest() {
		let pageOne = await getSearchResult(1);
		let pageTwo = await getSearchResult(2);

		setLoadedPages([pageOne, pageTwo]);
		setCurrentPage(1);
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
			"http://localhost:8103/entry/search?jobname=" +
			chosenJob +
			"&latitude=52.516217&longitude=13.377004&page=";

		let fetchData = await fetch(fetchURL + page);
		return fetchData.json();
	}

	if (loadedPages.length > 0) {
		return (
			<>
				<Headline />
				<SearchForm
					startSearchRequest={startSearchRequest}
					chosenJob={chosenJob}
					setChosenJob={setChosenJob}
					chosenAddress={chosenAddress}
					setChosenAddress={setChosenAddress}
				/>
				<div className={s.maindiv_resulttext}>
					<p className={s.resulttext}>
						Suche nach <span className={s.greenSpan}>{chosenJob}</span> in{" "}
						<span className={s.greenSpan}>{chosenAddress}</span>
					</p>
				</div>
				<SearchResultsList searchResponse={loadedPages[currentPage - 1]} />
				<Pagination
					page={currentPage}
					loadedPages={loadedPages}
					weiter={weiter}
					zurueck={() => setCurrentPage(currentPage - 1)}
				/>
			</>
		);
	} else {
		return (
			<>
				<Headline />
				<SearchForm
					startSearchRequest={startSearchRequest}
					chosenJob={chosenJob}
					setChosenJob={setChosenJob}
					chosenAddress={chosenAddress}
					setChosenAddress={setChosenAddress}
				/>
				<Instruction />
			</>
		);
	}
}
