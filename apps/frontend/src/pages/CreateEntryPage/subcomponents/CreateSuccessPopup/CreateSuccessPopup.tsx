import AlertDialog from "@vc/frontend/component/Popup/AlertDialog";
import Button from "@vc/ui/src/components/Button/Button";

type CreateSuccessPopupProps = {
	trigger: React.ReactNode;
};

const CreateSuccessPopup: React.FunctionComponent<CreateSuccessPopupProps> = ({
	trigger,
}) => (
	<AlertDialog
		title={"Hey du!"}
		action={
			<div style={{ width: "100%" }}>
				<Button width='fullwidth'>Alles klar!</Button>
			</div>
		}
		defaultOpen={false}
		preventEscape={true}
		trigger={trigger}
	>
		Diese Seite ersetzt keine Rechtsberatung, notarielle Beratung,
		Steuerberatung im Bedarfsfall ist immer ein Rechtsanwalt, Notar oder
		Steuerberater zu bemühen!
	</AlertDialog>
);

export default CreateSuccessPopup;
