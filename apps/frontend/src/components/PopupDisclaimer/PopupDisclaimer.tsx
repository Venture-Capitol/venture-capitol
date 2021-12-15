//import { FunctionComponent, useState } from "react";
import s from "./PopupDisclaimer.module.scss";
import TextAbsatz from "@vc/frontend/component/TextBlock/TextAbsatz";
import Button from "@vc/frontend/component/Button/Button";

const PopupDisclaimer: React.FunctionComponent = () => {
	return (
		<div className={s.overlay} id='PopupDisclaimer'>
			<div className={s.popup}>
				<TextAbsatz title='Hey du!'>
					Diese Seite ersetzt keine Rechtsberatung, notarielle Beratung,
					Steuerberatung im Bedarfsfall ist immer ein Rechtsanwalt, Notar oder
					Steuerberater zu bemühen!
				</TextAbsatz>
				<div className={s.link_container}>
					<Button>Alles klar!</Button>
					<span className={s.legal_links}>
						<a href='/textpages/impressum'>Impressum</a> |{" "}
						<a href='textpages/datenschutz'>Datenschutz</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default PopupDisclaimer;
