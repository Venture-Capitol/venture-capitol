import React, { useState, useContext } from "react";
import s from "./SearchResult.module.scss";
import { AuthContext, AuthUI, User } from "@vc/auth";

interface Props {
	resultData: any;
}

const SearchResult = ({ resultData }: Props) => {
	const currentUser = useContext<User | null>(AuthContext);
	const [showInfoModal, setShowInfoModal] = useState(false);

	function openMoreInfo(event: any) {
		event.preventDefault();

		const fetchURL = "http://localhost:8103/entry/" + resultData.id;

		currentUser?.getIdToken().then(token => {
			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL, requestOptions)
				.then(data => checkGetResponse(data))
				.catch(error => console.log(error));
		});
	}

	function checkGetResponse(data: any) {
		if (data.ok) {
			setShowInfoModal(true);
		} else {
			setShowInfoModal(false);
		}
	}

	if (resultData.description.split(" ").length > 20) {
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
				<p className={s.result_description}>
					{resultData.description.split(" ").slice(0, 20).join(" ") + "[...]"}
				</p>
				<br></br>
				<p className={s.result_moreinfo} onClick={e => openMoreInfo(e)}>
					Mehr Informationen
				</p>
			</div>
		);
	} else {
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
				<p className={s.result_moreinfo} onClick={e => openMoreInfo(e)}>
					Mehr Informationen
				</p>
			</div>
		);
	}
};

export default SearchResult;
