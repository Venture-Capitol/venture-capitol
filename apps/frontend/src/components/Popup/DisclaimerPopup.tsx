import Dialog from "./Dialog";
import Button from "@vc/ui/src/components/Button/Button";
import { BrowserRouter, Link } from "react-router-dom";
import s from "./DisclaimerPopup.module.scss";

const DisclaimerPopup: React.FunctionComponent = () => (
	<Dialog
		title={"Hey du!"}
		close={
			<div style={{ width: "100%" }}>
				<Button width='fullwidth'>Alles klar!</Button>
			</div>
		}
		defaultOpen={true}
		preventEscape={false}
	>
		Diese Seite ersetzt keine Rechtsberatung, notarielle Beratung,
		Steuerberatung im Bedarfsfall ist immer ein Rechtsanwalt, Notar oder
		Steuerberater zu bemühen!
		<br />
		<span className={s.legals}>
			<BrowserRouter>
				<Link to='/legalpages/impressum'>Impressum</Link> |{" "}
				<Link to='/legalpages/datenschutz'>Datenschutz</Link>
			</BrowserRouter>
		</span>
	</Dialog>
);

export default DisclaimerPopup;
