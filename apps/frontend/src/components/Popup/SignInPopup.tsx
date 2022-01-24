import Dialog from "@vc/frontend/component/Popup/Dialog";
import { AuthUI } from "@vc/auth";

type SignInPopupProps = {
	trigger: React.ReactNode;
};

const SignInPopup: React.FunctionComponent<SignInPopupProps> = ({
	trigger,
}) => (
	<Dialog
		title={"Hey!"}
		close={"Nein danke"}
		defaultOpen={true}
		trigger={trigger}
	>
		Um dich als Dienstleister für unser Unternehmensregister zu registrieren
		musst du angemeldet sein.
		<AuthUI />
	</Dialog>
);

export default SignInPopup;
