import React from "react";
import s from "./Headline.module.scss";

const Headline: React.FunctionComponent = () => {
	return (
		<div className={s.maindiv_headline}>
			<p className={s.headline}>Unternehmensregister</p>
		</div>
	);
};

export default Headline;
