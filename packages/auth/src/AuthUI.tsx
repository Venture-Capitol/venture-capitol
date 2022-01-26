import React, { FC, useContext, useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "./firebaseui.css";
import "./firebase.scss";
import { AuthContext } from "./AuthContext";
import { app } from "./firebase";

export const AuthUI: FC = () => {
	const currentUser = useContext(AuthContext);
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
		const ui = new firebaseui.auth.AuthUI(app.auth());
		ui.start("#firebaseui-auth-container", uiConfig);
		return () => {
			ui.delete();
		};
	}, []);

	return (
		<React.Fragment>
			{isLoading && loader}
			{!currentUser && <div id='firebaseui-auth-container'></div>}
		</React.Fragment>
	);
};
