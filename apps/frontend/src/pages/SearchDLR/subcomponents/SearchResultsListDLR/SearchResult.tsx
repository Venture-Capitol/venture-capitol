import { useState } from "react";
import s from "./SearchResult.module.scss";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import Dialog from "@vc/frontend/component/Popup/Dialog";

interface Props {
	resultData: any;
}

const SearchResult = ({ resultData }: Props) => {
	const { user } = useAuthContext();
	const [showInfoModal, setShowInfoModal] = useState(false);

	const [company, setCompany] = useState("");
	const [jobname, setJobname] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [telefon, setTelefon] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");

	function openMoreInfo() {
		const fetchURL = "http://localhost:8103/entry/" + resultData.id;

		user?.getIdToken().then(token => {
			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(fetchURL, requestOptions)
				.then(data => data.json())
				.then(parsedData => checkGetResponse(parsedData))
				.catch(error => console.log(error));
		});
	}

	function checkGetResponse(data: any) {
		setCompany(data.company);
		setJobname(data.job);
		setAddress(data.address);
		setEmail(data.email);
		setTelefon(data.telefon);
		setWebsite(data.website);
		setDescription(data.description);
		setShowInfoModal(true);
	}

	function checkDescription() {
		if (resultData.description.split(" ").length > 20) {
			return (
				<p className={s.result_description}>
					{resultData.description.split(" ").slice(0, 20).join(" ") + "[...]"}
				</p>
			);
		} else {
			return <p className={s.result_description}>{resultData.description}</p>;
		}
	}

	function checkDialog() {
		if (showInfoModal) {
			return (
				<Dialog
					title={company}
					defaultOpen={false}
					open={showInfoModal}
					onOpenChange={open => setShowInfoModal(open)}
				>
					<p className={s.modalTitle}>
						Dienstleistung: <span className={s.modalInfopoint}>{jobname}</span>
					</p>
					<p className={s.modalTitle}>
						Adresse: <span className={s.modalInfopoint}>{address}</span>
					</p>
					<p className={s.modalTitle}>
						Distanz:{" "}
						<span className={s.modalInfopoint}>
							{(resultData.distance / 1000).toFixed(1)}km entfernt
						</span>
					</p>
					<p className={s.modalTitle}>
						E-Mail: <span className={s.modalInfopoint}>{email}</span>
					</p>
					<p className={s.modalTitle}>
						Telefon: <span className={s.modalInfopoint}>{telefon}</span>
					</p>
					<p className={s.modalTitle}>
						Website: <span className={s.modalInfopoint}>{website}</span>
					</p>
					<p className={s.modalTitle}>
						Beschreibung:{" "}
						<span className={s.modalInfopoint}>{description}</span>
					</p>
				</Dialog>
			);
		} else {
			return <></>;
		}
	}

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
			{checkDescription()}
			<br></br>
			<p className={s.result_moreinfo} onClick={e => openMoreInfo()}>
				Mehr Informationen
			</p>
			{checkDialog()}
		</div>
	);
};

export default SearchResult;
