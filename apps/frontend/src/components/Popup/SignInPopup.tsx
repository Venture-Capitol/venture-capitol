import Popup from "@vc/frontend/component/Popup/Popup";
import { AuthUI } from "@vc/auth";

type SignInPopupProps = {
	trigger: React.ReactNode;
};

const SignInPopup: React.FunctionComponent<SignInPopupProps> = ({
	trigger,
}) => (
	<Popup
		title={"Hey!"}
		action={<AuthUI />}
		cancel={"Nein danke"}
		legal={false}
		open={true}
		trigger={trigger}
	>
		Um dich als Dienstleister für unser Unternehmensregister zu registrieren
		musst du angemeldet sein.
	</Popup>
);

export default SignInPopup;
