import React from "react";
import Video from "../../assets/money-video.mp4";
import s from "./LogoVideo.module.scss";

const LogoVideo: React.FunctionComponent = () => {
	return (
		<>
			<svg
				style={{ position: "absolute" }}
				width='0'
				height='0'
				viewBox='0 0 1920 1080'
				fill='none'
			>
				<clipPath
					transform='scale(0.00052083333
            0.00092592592)'
					id='svgTextPathTwo'
					clipPathUnits='objectBoundingBox'
				>
					<rect x='405' y='776' width='218' height='263' fill='black' />
					<rect x='847' y='776' width='218' height='263' fill='black' />
					<rect x='1293' y='776' width='218' height='263' fill='black' />
					<path
						d='M625.717 579H408V318.194L734.575 40L961 40L1187.43 40L1514 318.194V579H1296.28V407.302L1113.4 257.339L961 257.339L808.598 257.339L625.717 407.302V579Z'
						fill='black'
					/>
				</clipPath>
			</svg>

			<div className={s.fill}>
				<video src={Video} muted autoPlay loop></video>
				<div className={s.video}>
					<div className={s.inner}></div>
				</div>
			</div>
		</>
	);
};

export default LogoVideo;
