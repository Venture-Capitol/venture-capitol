import { useEffect, useState } from "react";
import { useAuthContext } from "@vc/auth/src/AuthContext";

import CreateDienstleister from "./subcomponents/CreateDienstleister";
import EditDeleteDienstleister from "./subcomponents/EditDeleteDienstleister";

export default function DienstleisterProfil() {
	const { user } = useAuthContext();

	const [dienstleisterOfUser, setDienstleisterOfUser] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
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
			let fetchData = await fetch(
				"http://localhost:8103/entry/user",
				requestOptions
			);
			if (fetchData.ok) {
				let parsedData = await fetchData.json();
				setDienstleisterOfUser(parsedData);
			} else {
				setDienstleisterOfUser("");
			}
		} else {
			setIsAdmin(true);
		}
	}

	if (isAdmin === false) {
		if (dienstleisterOfUser == "") {
			return (
				<CreateDienstleister getDienstleisterOfUser={getDienstleisterOfUser} />
			);
		} else {
			return (
				<EditDeleteDienstleister
					dienstleisterOfUser={dienstleisterOfUser}
					getDienstleisterOfUser={getDienstleisterOfUser}
				/>
			);
		}
	} else {
		return <></>;
	}
}
