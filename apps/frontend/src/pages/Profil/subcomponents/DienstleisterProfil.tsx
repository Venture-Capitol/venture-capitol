import { useEffect, useState } from "react";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import s from "./DienstleisterProfil.module.scss";

import CreateDienstleister from "./CreateDienstleister";
import EditDeleteDienstleister from "./EditDeleteDienstleister";
import { Link } from "react-router-dom";

export default function DienstleisterProfil() {
	const { user } = useAuthContext();

	const [loadingState, setLoadingState] = useState<
		undefined | "loading" | "finished" | "error"
	>();
	const [dienstleisterOfUser, setDienstleisterOfUser] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		setLoadingState("loading");
		getDienstleisterOfUser();
	}, [user || dienstleisterOfUser === ""]);

	async function getDienstleisterOfUser() {
		let idTokenResult = await user?.getIdTokenResult();

		if (idTokenResult?.claims.role == "user") {
			setIsAdmin(false);
			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + idTokenResult?.token,
				},
			};
			let fetchData = await fetch("/dlr/entry/user", requestOptions);
			if (fetchData.ok) {
				let parsedData = await fetchData.json();
				setDienstleisterOfUser(parsedData);
			} else {
				setDienstleisterOfUser("");
			}
		} else {
			setIsAdmin(true);
		}
		setLoadingState("finished");
	}

	if (isAdmin) {
		return (
			<p>
				Hey, du bist Admin, wenn du eine Firma anlegen willst, musst du das über
				das <Link to='/dienstleister/admin'>Admin Panel</Link> machen.
			</p>
		);
	}

	return (
		<>
			{loadingState == "loading" && (
				<div className={s.loadingIndicator}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
			{loadingState == "finished" && dienstleisterOfUser == "" && (
				<CreateDienstleister getDienstleisterOfUser={getDienstleisterOfUser} />
			)}
			{loadingState == "finished" && dienstleisterOfUser != "" && (
				<EditDeleteDienstleister
					dienstleisterOfUser={dienstleisterOfUser}
					getDienstleisterOfUser={getDienstleisterOfUser}
				/>
			)}
		</>
	);
}
