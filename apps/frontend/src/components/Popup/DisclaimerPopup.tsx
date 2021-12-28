import Popup from "@vc/frontend/component/Popup/Popup";
import Button from "@vc/frontend/component/Button/Button";

const DisclaimerPopup: React.FunctionComponent = () => (
	<Popup
		title={"Hey du!"}
		action={""}
		cancel={<Button>Alles klar!</Button>}
		legal={true}
		open={true}
	>
		Diese Seite ersetzt keine Rechtsberatung, notarielle Beratung,
		Steuerberatung im Bedarfsfall ist immer ein Rechtsanwalt, Notar oder
		Steuerberater zu bemühen!
	</Popup>
);

export default DisclaimerPopup;
