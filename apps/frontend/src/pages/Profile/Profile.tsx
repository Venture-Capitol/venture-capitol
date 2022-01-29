import s from "./Profile.module.scss";
import GPFProfileContent from "@vc/frontend/component/ProfileContent/GPFProfileContent";
import { useState } from "react";
import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";

export default function () {
	const [GPF_DLR, switchProfile] = useState("GPF");

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
						<div
							onClick={() => {
								switchProfile("GPF");
							}}
							className={`${s.navLink} ${GPF_DLR == "GPF" && s.active}`}
						>
							Mein Gründerprofil
						</div>
						<div
							onClick={() => {
								switchProfile("DLR");
							}}
							className={`${s.navLink} ${GPF_DLR == "DLR" && s.active}`}
						>
							Mein Dienstleisterprofil
						</div>
					</div>
				</div>
				{GPF_DLR == "GPF" && <GPFProfileContent />}
				{GPF_DLR == "DLR" && <div>DLR coming soon...</div>}
			</div>
		</div>
	);
}
