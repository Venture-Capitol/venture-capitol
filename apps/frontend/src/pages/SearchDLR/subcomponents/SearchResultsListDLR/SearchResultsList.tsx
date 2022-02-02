import React, { useState } from "react";
import s from "./SearchResultsList.module.scss";
import SearchResult from "./SearchResult";

interface Props {
	searchResponse: any;
}

const SearchResultsList = ({ searchResponse }: Props) => {
	const postListComponents: JSX.Element = searchResponse.map(
		(currentResult: any, index: any) => {
			return <SearchResult resultData={currentResult} key={currentResult.id} />;
		}
	);

	return <div className={s.flex}>{postListComponents}</div>;
};

export default SearchResultsList;
