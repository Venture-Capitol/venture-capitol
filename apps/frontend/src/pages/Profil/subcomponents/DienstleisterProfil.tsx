import { useEffect, useState } from "react";
import { useAuthContext } from "@vc/auth/src/AuthContext";

import CreateDienstleister from "./CreateDienstleister";
import EditDeleteDienstleister from "./EditDeleteDienstleister";
import { Link } from "react-router-dom";

export default function DienstleisterProfil() {
	const { user } = useAuthContext();

	const [dienstleisterOfUser, setDienstleisterOfUser] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		getDienstleisterOfUser();
	}, [user || dienstleisterOfUser === ""]);

	async function getDienstleisterOfUser() {
		let idTokenResult = await user?.getIdTokenResult();

		if (idTokenResult?.claims.role == "admin") {
			setIsAdmin(true);
		} else {
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
		}
	}

	if (isAdmin) {
		return (
			<p>
				Hey, du bist Admin, wenn du eine Firma anlegen willst, musst du das über
				das <Link to='/dienstleister/admin'>Admin Panel</Link> machen.
			</p>
		);
	}

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
}
