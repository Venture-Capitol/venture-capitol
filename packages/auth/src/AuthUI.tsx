import React, { FC, useContext, useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "./firebase.scss";
import { useAuthContext } from "./AuthContext";
import { app } from "./firebase";

export const AuthUI: FC = () => {
	const { user, instances, setInstances } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);

	const loader = <div id='loader' style={{ height: "72px" }}></div>;

	const uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function (
				authResult: any,
				redirectUrl: any
			) {
				return false;
			},
			uiShown: function () {
				setIsLoading(false);
			},
		},
		signInFlow: "popup",
		signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
	};

	useEffect(() => {
		const ui =
			firebaseui.auth.AuthUI.getInstance() ||
			new firebaseui.auth.AuthUI(app.auth());
		if (user !== undefined) {
			ui.start("#firebaseui-auth-container", uiConfig);
			setInstances(instances + 1);
		}

		return () => {
			if (instances == 1) ui.delete();
			setInstances(instances - 1);
		};
	}, [user]);

	return (
		<React.Fragment>
			{isLoading && loader}
			{!user && <div id='firebaseui-auth-container'></div>}
		</React.Fragment>
	);
};
