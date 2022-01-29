import s from "./Profil.module.scss";
import GPFProfileContent from "@vc/frontend/component/ProfileContent/GPFProfileContent";
import { useState } from "react";
import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import { Link, useParams, useLocation } from "react-router-dom";

export default function () {
	var platform = useParams();
	const [GPF_DLR, switchProfile] = useState(platform.platform);

	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background:
					"radial-gradient(95.33% 88.77% at 100% 25.99%, #F3EAE4 0%, #F5EBDF 11.12%, #F6F5F8 33.47%)",
			}}
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
								pathname: "/profil/dlr",
							}}
							onClick={() => switchProfile("dlr")}
							className={`${GPF_DLR == "dlr" && s.active} ${s.navLink}`}
							replace
						>
							Mein Dienstleisterprofil
						</Link>
					</div>
				</div>
				{GPF_DLR == "gpf" && <GPFProfileContent />}
				{GPF_DLR == "dlr" && <div>DLR coming soon...</div>}
			</div>
		</div>
	);
}
