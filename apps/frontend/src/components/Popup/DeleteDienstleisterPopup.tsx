import AlertDialog from "./AlertDialog";
import Button from "@vc/ui/src/components/Button/Button";

const DeleteDienstleisterPopup: React.FunctionComponent = () => (
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

export default DeleteDienstleisterPopup;
