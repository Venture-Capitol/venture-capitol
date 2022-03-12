import { FC } from "react";
import s from "./LoadingComponent.module.scss";

interface Props {
	animationDelay?: number;
}

const LoadingComponent: FC<Props> = ({ animationDelay }) => {
	if (animationDelay != undefined) {
		document.documentElement.style.setProperty(
			"--animation-delay",
			animationDelay + "s"
		);
	}
	return (
		<div className={s.loadingIndicator}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default LoadingComponent;
