import Button from "@vc/ui/src/components/Button/Button";
import React from "react";
import ButtonGrid from "./ButtonGrid/ButtonGrid";
import s from "./LegalFormFinder.module.scss";
import {
	UserIcon,
	UsersIcon,
	UserGroupIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

export default function LegalFormFinder() {
	return (
		<div className={s.content}>
			<div className={s.steps}>
				<div className={s.center}>
					{(() => {
						let a = [];
						for (let i = 1; i <= 8; i++) {
							a.push(<span key={i}>{i}</span>);
						}
						return a;
					})()}
				</div>
			</div>

			<h1 className={s.question}>
				Mit wie vielen Personen möchtest du gründen?
			</h1>

			<ButtonGrid
				options={[
					{
						id: "alone",
						name: "Alleine",
						Icon: UserIcon,
					},
					{
						id: "lt3",
						name: "Weniger als 3",
						Icon: UsersIcon,
					},
					{
						id: "lg3",
						name: "Mehr als 3",
						Icon: UserGroupIcon,
					},
					{
						id: "dontknow",
						name: "Weiß ich nicht",
						Icon: QuestionMarkCircleIcon,
					},
				]}
			/>

			<div className={s.navigationButtons}>
				<Button variant='secondary'>Weiter</Button>
				<Button>Zurück</Button>
			</div>
		</div>
	);
}
