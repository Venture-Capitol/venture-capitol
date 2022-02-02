import s from "./PaginationAdminpannel.module.scss";
import React, { useState, useContext, useEffect } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import { AuthContext, AuthUI, User } from "@vc/auth";
import { useAuthContext } from "@vc/auth/src/AuthContext";

interface Props {
	page: any;
	startGetallRequest: any;
	setCurrentPage: any;
	requestURL: any;
}

const PaginationAdminpannel = ({
	page,
	startGetallRequest,
	setCurrentPage,
	requestURL,
}: Props) => {
	const { user } = useAuthContext();
	const [enableZurueckButton, setEnableZurueckButton] = useState(false);
	const [enableWeiterButton, setEnableWeiterButton] = useState(false);

	function weiter() {
		if (enableZurueckButton == false) {
			setEnableZurueckButton(true);
		}
		startGetallRequest(page + 1);
		console.log(page + 1);
		setCurrentPage(page + 1);
		console.log(page + 1);
	}

	function zurück() {
		if (page - 1 <= 0) {
			setEnableZurueckButton(false);
		}
		startGetallRequest(page - 1);
		console.log(page - 1);
		setCurrentPage(page - 1);
		console.log(page - 1);
	}

	function checkZurueckButton() {
		console.log("checkzurueck");
		if (page - 1 >= 0) {
			return (
				<div onClick={e => zurück()}>
					<Button>{"< "}Zurück</Button>
				</div>
			);
		} else {
			return (
				<div>
					<button className={s.disabled}>{"< "} Zurück</button>
				</div>
			);
		}
	}

	function checkWeiterButton() {
		user?.getIdToken().then(token => {
			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			return fetch(requestURL + (page + 1), requestOptions)
				.then(data => data.json())
				.then(parsedData => {
					console.log(parsedData.length);
					if (parsedData.length == 0) {
						setEnableWeiterButton(false);
					} else {
						setEnableWeiterButton(true);
					}
				})
				.catch(error => console.log(error));
		});

		if (enableWeiterButton) {
			return (
				<div onClick={e => weiter()}>
					<Button>Weiter {" >"}</Button>
				</div>
			);
		} else {
			return (
				<div>
					<button className={s.disabled}>Weiter {" >"}</button>
				</div>
			);
		}
	}

	return (
		<>
			<div className={s.pagination}>
				{checkZurueckButton()}
				{checkWeiterButton()}
			</div>
		</>
	);
};

export default PaginationAdminpannel;
