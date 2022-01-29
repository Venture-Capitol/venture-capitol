import React, { useEffect, useState, FC, useContext } from "react";
import { app } from "./firebase";
import firebase from "firebase/compat/app";

interface AuthContext {
	user: firebase.User | null;
}

export const AuthContext = React.createContext<AuthContext>({
	user: null,
});
export function useAuthContext() {
	return useContext(AuthContext);
}

export const AuthProvider: FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

	useEffect(() => {
		const authObserver = app.auth().onAuthStateChanged(firebaseUser => {
			setCurrentUser(firebaseUser);
		});
		return authObserver;
	}, []);

	return (
		<AuthContext.Provider value={{ user: currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
