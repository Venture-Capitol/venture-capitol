import s from "./Pagination.module.scss";
import { useState } from "react";
import Button from "@vc/ui/src/components/Button/Button";
import { useAuthContext } from "@vc/auth/src/AuthContext";

interface Props {
	page: number;
	loadedPages: any[];
	weiter(): void;
	zurueck(): void;
}

const Pagination = ({ page, loadedPages, weiter, zurueck }: Props) => {
	return (
		<>
			<div className={s.pagination}>
				{page > 1 ? (
					<div onClick={zurueck} className={s.enabled}>
						<Button>{"< "}Zurück</Button>
					</div>
				) : (
					<div>
						<button className={s.disabled}>{"< "} Zurück</button>
					</div>
				)}

				{loadedPages[page]?.length > 0 ? (
					<div onClick={e => weiter()} className={s.enabled}>
						<Button>Weiter {" >"}</Button>
					</div>
				) : (
					<div>
						<button className={s.disabled}>Weiter {" >"}</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Pagination;
