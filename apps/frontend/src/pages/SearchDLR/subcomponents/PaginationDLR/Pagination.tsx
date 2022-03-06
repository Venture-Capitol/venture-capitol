import s from "./Pagination.module.scss";
import Button from "@vc/ui/src/components/Button/Button";

interface Props {
	page: number;
	loadedPages: any[];
	weiter(): void;
	zurueck(): void;
}

const Pagination = ({ page, loadedPages, weiter, zurueck }: Props) => {
	return (
		<>
			{loadedPages.length > 1 && loadedPages[1]?.length > 0 ? (
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
			) : (
				<></>
			)}
		</>
	);
};

export default Pagination;
