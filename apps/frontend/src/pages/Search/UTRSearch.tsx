import SearchForm from "./subcomponents/SearchFormUTR/SearchForm";
// import SearchForm from "@vc/frontend/page/Search/subcomponents/SearchFormUTR/SearchForm"; // why does this work?
import Headline from "./subcomponents/HeadlineUTR/Headline";
import Instruction from "./subcomponents/InstructionUTR/Instruction";
import SearchResultsList from "./subcomponents/SearchResultsListUTR/SearchResultsList";
import React from "react";

export default function UTRSearch() {
	return (
		<>
			<Headline />
			<SearchForm />
			<Instruction />
			<SearchResultsList />
		</>
	);
}
