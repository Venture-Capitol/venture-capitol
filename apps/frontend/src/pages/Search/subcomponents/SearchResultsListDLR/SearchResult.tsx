import React from "react";
import s from "./SearchResult.module.scss";

interface Props {
	resultData: any;
}

const SearchResult = ({ resultData }: Props) => {
	return (
		<div className={s.resultframe}>
			<p className={s.result_company}>{resultData.company}</p>
			<p className={s.result_job}>{resultData.job}</p>
			<br></br>
			<p className={s.result_address}>{resultData.address}</p>
			<p className={s.result_distance}>
				{(resultData.distance / 1000).toFixed(1)}km entfernt
			</p>
			<br></br>
			<p className={s.result_description}>{resultData.description}</p>
			<br></br>
			<p className={s.result_moreinfo}>Mehr Informationen</p>
		</div>
	);
};

export default SearchResult;
