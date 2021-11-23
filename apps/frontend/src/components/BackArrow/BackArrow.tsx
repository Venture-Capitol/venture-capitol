import React from "react";
import { useHistory } from "react-router-dom";
import s from "./BackArrow.module.scss";

const BackArrow: React.FunctionComponent = () => {
	let history = useHistory();

	return (
		<>
			<div className={s.back} onClick={() => history.push("/demo")}>
				<svg
					style={{ position: "absolute" }}
					width='27'
					height='30'
					viewBox='0 0 27 30'
					fill='none'
				>
					<path
						d='M0.585787 13.5858C-0.195263 14.3668 -0.195263 15.6332 0.585787 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768156 14.0948 0.0768156 13.3137 0.857864L0.585787 13.5858ZM27 13L2 13V17L27 17V13Z'
						fill='#343434'
					></path>
				</svg>
			</div>
		</>
	);
};

export default BackArrow;
