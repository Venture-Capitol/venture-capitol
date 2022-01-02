import AlertDialog from "@vc/frontend/component/Popup/AlertDialog";
import { AuthUI } from "@vc/auth";

type SignInPopupProps = {
	trigger: React.ReactNode;
};

const SignInPopup: React.FunctionComponent<SignInPopupProps> = ({
	trigger,
}) => (
	<AlertDialog
		title={"Hey!"}
		action={<AuthUI />}
		cancel={"Nein danke"}
		legal={false}
		defaultOpen={true}
		trigger={trigger}
	>
		Um dich als Dienstleister für unser Unternehmensregister zu registrieren
		musst du angemeldet sein.
	</AlertDialog>
);

export default SignInPopup;
