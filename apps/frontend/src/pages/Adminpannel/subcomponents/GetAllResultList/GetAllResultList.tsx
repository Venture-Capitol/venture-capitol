import React, { useState } from "react";
import s from "./GetAllResultList.module.scss";
import GetAllResult from "./GetAllResult";

interface Props {
	getAllResponse: any;
}

const GetAllResultList = ({ getAllResponse }: Props) => {
	const [getResponse, setGetResponse] = useState();

	console.log(getAllResponse);

	const postListComponents: JSX.Element = getAllResponse.map(
		(currentResult: any, index: any) => {
			return <GetAllResult resultData={currentResult} key={currentResult.id} />;
		}
	);

	return <div className={s.flex}>{postListComponents}</div>;
};

export default GetAllResultList;
