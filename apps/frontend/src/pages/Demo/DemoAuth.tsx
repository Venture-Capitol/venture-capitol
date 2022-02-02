import React, { FC } from "react";
import { useAuthContext } from "@vc/auth/src/AuthContext";

const DemoAuth: FC = () => {
	const { user } = useAuthContext();

	console.log(user?.getIdToken().then(token => console.log(token)));
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
		></div>
	);
};

export default DemoAuth;
