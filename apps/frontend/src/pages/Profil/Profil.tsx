import s from "./Profil.module.scss";
import GPFProfileContent from "@vc/frontend/component/ProfileContent/GPFProfileContent";
import { useState } from "react";
import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import { Link, useParams } from "react-router-dom";
import DienstleisterProfil from "./subcomponents/DienstleisterProfil";
import { useAuthContext } from "@vc/auth/src/AuthContext";
/* import { AuthUI } from "@vc/auth"; */

export interface ProfileParams {
	platform: string;
}

export default function () {
	const { user: currentUser } = useAuthContext();
	const { platform } = useParams<ProfileParams>();
	const [GPF_DLR, switchProfile] = useState(platform);

	if (!currentUser && GPF_DLR == "dienstleister") {
		return (
			<div
				style={{
					minHeight: "100%",
					display: "flex",
					justifyContent: "center",
					background:
						"radial-gradient(95.33% 88.77% at 100% 25.99%, #F3EAE4 0%, #F5EBDF 11.12%, #F6F5F8 33.47%)",
					overflowY: "scroll",
				}}
				className={s.profilContainer}
			>
				<div className={s.logInMessageWrapper}>
					<div className={s.logInMessageContainer}>
						<p>Jetzt anmelden, um dich als Dienstleister zu registrieren</p>
						{/* <div className={s.authWrapper}>
							<AuthUI />
						</div> */}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				minHeight: "100%",
				display: "flex",
				justifyContent: "center",
				background:
					"radial-gradient(95.33% 88.77% at 100% 25.99%, #F3EAE4 0%, #F5EBDF 11.12%, #F6F5F8 33.47%)",
				overflowY: "scroll",
			}}
			className={s.profilContainer}
		>
			<div className={s.profileContainer}>
				<div className={s.profileNav}>
					<BackArrow />
					<div className={s.navContainer}>
						<Link
							to={{
								pathname: "/profil/gruender",
							}}
							onClick={() => switchProfile("gruender")}
							className={`${GPF_DLR == "gruender" && s.active} ${s.navLink}`}
							replace
						>
							Mein Gründerprofil
						</Link>
						<Link
							to={{
								pathname: "/profil/dienstleister",
							}}
							onClick={() => switchProfile("dienstleister")}
							className={`${GPF_DLR == "dienstleister" && s.active} ${
								s.navLink
							}`}
							replace
						>
							Mein Dienstleisterprofil
						</Link>
					</div>
				</div>
				{GPF_DLR == "gruender" && <GPFProfileContent />}
				{GPF_DLR == "dienstleister" && <DienstleisterProfil />}
			</div>
		</div>
	);
}
