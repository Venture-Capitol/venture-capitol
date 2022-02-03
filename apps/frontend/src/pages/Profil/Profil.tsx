import s from "./Profil.module.scss";
import GPFProfileContent from "@vc/frontend/component/ProfileContent/GPFProfileContent";
import { useState } from "react";
import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import { Link, useParams } from "react-router-dom";
import DienstleisterProfil from "./subcomponents/DienstleisterProfil";

export interface ProfileParams {
	platform: string;
}

export default function () {
	const { platform } = useParams<ProfileParams>();
	const [GPF_DLR, switchProfile] = useState(platform);

	return (
		<div
			style={{
				height: "100%",
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
								pathname: "/profil/gpf",
							}}
							onClick={() => switchProfile("gpf")}
							className={`${GPF_DLR == "gpf" && s.active} ${s.navLink}`}
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
				{GPF_DLR == "gpf" && <GPFProfileContent />}
				{GPF_DLR == "dienstleister" && <DienstleisterProfil />}
			</div>
		</div>
	);
}
