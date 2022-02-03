import AlertDialog from "./AlertDialog";
import Button from "@vc/ui/src/components/Button/Button";
import { Link } from "react-router-dom";
import s from "./DisclaimerPopup.module.scss";
import { setCookie } from "../../utils/DPACK";

const DisclaimerPopup: React.FunctionComponent = () => (
	<AlertDialog
		title={"Hey du!"}
		action={
			<div className={s.action} style={{ width: "100%" }}>
				<Button
					width='fullwidth'
					onClick={() => {
						setCookie();
					}}
				>
					Alles klar!
				</Button>
			</div>
		}
		cancel={
			<div className={s.cancel} style={{ width: "100%" }}>
				<Link to='/datenschutz'>
					<Button
						width='fullwidth'
						onClick={() => {
							setCookie();
						}}
					>
						Datenschutz
					</Button>
				</Link>
			</div>
		}
		defaultOpen={true}
		preventEscape={true}
	>
		Diese Seite ersetzt keine Rechtsberatung, notarielle Beratung,
		Steuerberatung im Bedarfsfall ist immer ein Rechtsanwalt, Notar oder
		Steuerberater zu bemühen!
		<br />
		<br />
		Wir benutzen keine externen Cookies und versuchen datensparsam zu arbeiten.
		Mehr dazu findest du in unserer Datenschutzerklärung.
		<br />
		<br />
	</AlertDialog>
);

export default DisclaimerPopup;
