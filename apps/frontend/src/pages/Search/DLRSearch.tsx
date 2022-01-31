import SearchForm from "./subcomponents/SearchFormDLR/SearchForm";
import s from "./DLRSearch.module.scss";
import Headline from "./subcomponents/HeadlineDLR/Headline";
import Instruction from "./subcomponents/InstructionDLR/Instruction";
import AddressWarning from "./subcomponents/AddressWarning/AddressWarning";
import SearchResultsList from "./subcomponents/SearchResultsListDLR/SearchResultsList";
import { useState } from "react";

export default function UTRSearch() {
	const [searchResponse, setSearchResponse] = useState(false);
	const [chosenJob, setChosenJob] = useState();
	const [chosenAddress, setChosenAddress] = useState();
	const [validAddress, setValidAddress] = useState(true);

	const passSearchResponse = (data: any, job: any, address: any) => {
		console.log("passed search response to parent");
		setChosenJob(job);
		setChosenAddress(address);
		setSearchResponse(data);
	};

	const passValidAddress = (valid: any) => {
		setValidAddress(valid);
	};

	if (searchResponse) {
		return (
			<>
				<Headline />
				<SearchForm
					passSearchResponse={passSearchResponse}
					passValidAddress={passValidAddress}
				/>
				<div className={s.maindiv_resulttext}>
					<p className={s.resulttext}>
						Suche nach <span className={s.greenSpan}>{chosenJob}</span> in{" "}
						<span className={s.greenSpan}>{chosenAddress}</span>
					</p>
				</div>
				<SearchResultsList searchResponse={searchResponse} />
			</>
		);
	} else if (!validAddress) {
		return (
			<>
				<Headline />
				<SearchForm
					passSearchResponse={passSearchResponse}
					passValidAddress={passValidAddress}
				/>
				<AddressWarning />
			</>
		);
	} else {
		return (
			<>
				<Headline />
				<SearchForm
					passSearchResponse={passSearchResponse}
					passValidAddress={passValidAddress}
				/>
				<Instruction />
			</>
		);
	}
}
