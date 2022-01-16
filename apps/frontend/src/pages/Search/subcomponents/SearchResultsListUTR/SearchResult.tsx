import React from "react";
import s from "./SearchResult.module.scss";

const SearchResult: React.FunctionComponent = () => {
	return (
		<div className={s.resultframe}>
			<p className={s.result_company}>M & N Notare</p>
			<p className={s.result_job}>Rechtsanwalt & Notar</p>
			<br></br>
			<p className={s.result_address}>Musterweg 13 | 13786 Berlin</p>
			<p className={s.result_distance}>13,56km entfernt</p>
			<br></br>
			<p className={s.result_description}>
				Ihre Rechtsanwalt und Notarfirma in Berlin!
			</p>
			<br></br>
			<p className={s.result_moreinfo}>Mehr Informationen</p>
		</div>
	);
};

export default SearchResult;
