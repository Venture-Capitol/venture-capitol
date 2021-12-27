import s from "./DisclaimerPopup.module.scss";
import TextParagraph from "@vc/frontend/component/TextBlock/TextParagraph";
import Button from "@vc/frontend/component/Button/Button";

const DisclaimerPopup: React.FunctionComponent = () => {
	return (
		<div className={s.overlay} id='DisclaimerPopup'>
			<div className={s.popup}>
				<TextParagraph title='Hey du!'>
					Diese Seite ersetzt keine Rechtsberatung, notarielle Beratung,
					Steuerberatung im Bedarfsfall ist immer ein Rechtsanwalt, Notar oder
					Steuerberater zu bemühen!
				</TextParagraph>
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

export default DisclaimerPopup;
