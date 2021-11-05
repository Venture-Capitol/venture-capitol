import React, { FC, useEffect } from "react";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export const FirebaseUIComponent: FC = () => {
	const firebaseConfig = {
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
		appId: import.meta.env.VITE_FIREBASE_APP_ID,
	};

	var uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function (authResult, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true;
			},
			uiShown: function () {
				// The widget is rendered.
				// Hide the loader.
				document.getElementById("loader").style.display = "none";
			},
		},
		signInFlow: "popup",
		signInSuccessUrl: "/demo",
		signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
	};

	useEffect(() => {
		const app = firebase.initializeApp(firebaseConfig);
		var ui = new firebaseui.auth.AuthUI(app.auth());
		ui.start("#firebaseui-auth-container", uiConfig);
		return () => {};
	}, []);

	return (
		<React.Fragment>
			<div id='loader'>Loading Login...</div>
			<div id='firebaseui-auth-container'></div>
		</React.Fragment>
	);
};
