import s from "./Pagination.module.scss";
import React, { useState, useContext } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import { AuthContext, AuthUI, User } from "@vc/auth";
import { useAuthContext } from "@vc/auth/src/AuthContext";

interface Props {
	requestOfParent: any;
	responseOfParent: any;
	page: any;
}

const Pagination = ({ requestOfParent, responseOfParent, page }: Props) => {
	const { user } = useAuthContext();
	const [enableZurueckButton, setEnableZurueckButton] = useState(
		page == "page=1" && responseOfParent.ok
	);
	const [enableWeiterButton, setEnableWeiterButton] = useState(false);

	function checkZurueckButton() {
		if (enableZurueckButton) {
			return (
				<div>
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

			const parsedPage = Number(page.replaceAll("page=", "")) + 1;

			return fetch(requestOfParent + "page=" + parsedPage, requestOptions)
				.then(data => data.json())
				.then(parsedData => {
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
				<div>
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

export default Pagination;
