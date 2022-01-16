import Dialog from "@vc/frontend/component/Popup/Dialog";
import Button from "@vc/ui/src/components/Button/Button";
import { Link } from "react-router-dom";

const DisclaimerPopup: React.FunctionComponent = () => (
	<Dialog
		title={"Hey du!"}
		close={
			<div style={{ width: "100%" }}>
				<Button width='fullwidth'>Alles klar!</Button>
			</div>
		}
		defaultOpen={true}
		preventEscape={true}
	>
		Diese Seite ersetzt keine Rechtsberatung, notarielle Beratung,
		Steuerberatung im Bedarfsfall ist immer ein Rechtsanwalt, Notar oder
		Steuerberater zu bemühen!
		<br />
		<span>
			<Link to='/legalpages/impressum'>Impressum</Link> |{" "}
			<Link to='/legalpages/datenschutz'>Datenschutz</Link>
		</span>
	</Dialog>
);

export default DisclaimerPopup;
