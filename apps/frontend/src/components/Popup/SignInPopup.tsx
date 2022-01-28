import Dialog from "./Dialog";
import { AuthUI } from "@vc/auth";

type SignInPopupProps = {
	trigger: React.ReactNode;
	auth: boolean;
};

const SignInPopup: React.FunctionComponent<SignInPopupProps> = ({
	trigger,
	auth,
}) => (
	<Dialog
		title={"Hey!"}
		close={"Nein danke"}
		defaultOpen={true}
		trigger={trigger}
	>
		Um dich als Dienstleister für unser Unternehmensregister zu registrieren
		musst du angemeldet sein.
		{auth && <AuthUI />}
	</Dialog>
);

export default SignInPopup;
