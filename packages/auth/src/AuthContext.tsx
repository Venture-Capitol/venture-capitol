import React, { useEffect, useState, FC, useContext } from "react";
import { app } from "./firebase";
import firebase from "firebase/compat/app";

interface AuthContext {
	user: firebase.User | null | undefined;
	instances: number;
	setInstances: (instances: number) => void;
}

export const AuthContext = React.createContext<AuthContext>({
	user: undefined,
	instances: 0,
	setInstances: () => {},
});
export function useAuthContext() {
	return useContext(AuthContext);
}

export const AuthProvider: FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<
		firebase.User | null | undefined
	>(undefined);

	const [uiInstances, setUiInstances] = useState<number>(0);

	useEffect(() => {
		const authObserver = app.auth().onAuthStateChanged(firebaseUser => {
			setCurrentUser(firebaseUser);
		});
		return authObserver;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user: currentUser,
				instances: uiInstances,
				setInstances: setUiInstances,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
