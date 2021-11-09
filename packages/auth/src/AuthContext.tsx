import React, { useEffect, useState, FC } from "react";
import { app } from "./firebase";
import firebase from "firebase/compat/app";

export const AuthContext = React.createContext<firebase.User | null>(null);

interface AuthProviderProps {
	children: any;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

	useEffect(() => {
		const authObserver = app.auth().onAuthStateChanged(firebaseUser => {
			setCurrentUser(firebaseUser);
		});
		return authObserver;
	}, []);

	return (
		<AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
	);
};
