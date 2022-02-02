import React, { useState } from "react";
import s from "./GetAllResultList.module.scss";
import GetAllResult from "./GetAllResult";

interface Props {
	getAllResponse: any;
	searchAgain: any;
	setDataForEdit: any;
	page: any;
}

const GetAllResultList = ({
	getAllResponse,
	searchAgain,
	setDataForEdit,
	page,
}: Props) => {
	const [getResponse, setGetResponse] = useState();

	console.log(getAllResponse);

	const postListComponents: JSX.Element = getAllResponse.map(
		(currentResult: any, index: any) => {
			return (
				<GetAllResult
					resultData={currentResult}
					key={currentResult.id}
					searchAgain={searchAgain}
					setDataForEdit={setDataForEdit}
					page={page}
				/>
			);
		}
	);

	return <div className={s.flex}>{postListComponents}</div>;
};

export default GetAllResultList;
