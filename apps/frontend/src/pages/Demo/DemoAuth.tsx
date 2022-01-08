import React, { FC, useContext } from "react";
import { AuthContext, AuthUI, User } from "@vc/auth";
import { signOut } from "@vc/auth";

const DemoAuth: FC = () => {
	const currentUser = useContext<User | null>(AuthContext);

	console.log(currentUser?.getIdToken().then(token => console.log(token)));

	const userInfoPanel = (
		<div>
			{currentUser && "Hello, " + currentUser.displayName}
			<button onClick={signOut}>Logout</button>
		</div>
	);
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background:
					"radial-gradient(95.33% 88.77% at 100% 25.99%, #F3EAE4 0%, #F5EBDF 11.12%, #F6F5F8 33.47%)",
			}}
		>
			{currentUser ? userInfoPanel : <AuthUI />}
		</div>
	);
};

export default DemoAuth;
