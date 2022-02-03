import s from "./GetAllResultList.module.scss";
import GetAllResult from "./GetAllResult";

interface Props {
	getAllResponse: any;
	searchAgain: any;
	setEditData: any;
	setCurrentlyEditing: any;
}

const GetAllResultList = ({
	getAllResponse,
	searchAgain,
	setEditData,
	setCurrentlyEditing,
}: Props) => {
	const postListComponents: JSX.Element = getAllResponse.map(
		(currentResult: any, index: any) => {
			return (
				<GetAllResult
					resultData={currentResult}
					key={currentResult.id}
					searchAgain={searchAgain}
					setEditData={setEditData}
					setCurrentlyEditing={setCurrentlyEditing}
				/>
			);
		}
	);

	return <div className={s.flex}>{postListComponents}</div>;
};

export default GetAllResultList;
