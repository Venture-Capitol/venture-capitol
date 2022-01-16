import React from "react";
import s from "./SearchResultsList.module.scss";
import SearchResult from "./SearchResult";

const SearchResultsList: React.FunctionComponent = () => {
	return (
		<div className={s.flex}>
			<SearchResult />
			<SearchResult />
			<SearchResult />
			<SearchResult />
			<SearchResult />
			<SearchResult />
			<SearchResult />
			<SearchResult />
		</div>
	);
};

export default SearchResultsList;
