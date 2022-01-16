import AlertDialog from "@vc/frontend/component/Popup/AlertDialog";
import Button from "@vc/ui/src/components/Button/Button";

const CreateSuccessPopup: React.FunctionComponent = () => (
	<AlertDialog
		title={"Hey du!"}
		action={
			<div style={{ width: "100%" }}>
				<Button width='fullwidth'>Alles klar!</Button>
			</div>
		}
		defaultOpen={true}
		preventEscape={false}
	>
		Du wurdest erfolgreich registriert.
	</AlertDialog>
);

export default CreateSuccessPopup;
