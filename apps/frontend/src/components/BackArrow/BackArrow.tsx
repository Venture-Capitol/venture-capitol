import { ArrowLeftIcon } from "@heroicons/react/solid/esm";
import React from "react";
import { useHistory } from "react-router-dom";
import s from "./BackArrow.module.scss";

const BackArrow: React.FunctionComponent = () => {
	let history = useHistory();

	return <ArrowLeftIcon className={s.back} onClick={history.goBack} />;
};

export default BackArrow;
