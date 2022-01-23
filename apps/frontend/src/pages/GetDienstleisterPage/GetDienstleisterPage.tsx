import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";
import s from "./GetDienstleisterPage.module.scss";

import GetDienstleisterInfoList from "./subcomponents/GetDienstleisterInfoList/GetDienstleisterInfoList";

export default function CreateEntryPage() {
	return (
		<>
			<BackArrow />
			<div className={s.maindiv_headline_getEntry}>
				<p className={s.headline_companyname}>M & N Notare</p>
			</div>
			<GetDienstleisterInfoList />
		</>
	);
}
