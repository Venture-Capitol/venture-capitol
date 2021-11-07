import React, { FC, useContext, useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { AuthContext } from "AuthContext";
import app from "./firebase";

export const AuthUI: FC = () => {
	const currentUser = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);

	const loader = <div id='loader'>Loading Sign in with Google...</div>;
	const userInfoPanel = (
		<div>{currentUser && "Hello, " + currentUser.displayName}</div>
	);

	var uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function (
				authResult: any,
				redirectUrl: any
			) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
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
		var ui = new firebaseui.auth.AuthUI(app.auth());
		ui.start("#firebaseui-auth-container", uiConfig);
		return () => {};
	}, []);

	return (
		<React.Fragment>
			{isLoading && loader}
			{currentUser ? userInfoPanel : <div id='firebaseui-auth-container'></div>}
		</React.Fragment>
	);
};
