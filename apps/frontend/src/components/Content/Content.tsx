import React, { FC, lazy, Suspense } from "react";
import "./markdown.scss";

const content_01_content = lazy(() => import("../../steps/Content_01"));
const content_02_content = lazy(() => import("../../steps/Content_02"));
const content_03_content = lazy(() => import("../../steps/Content_03"));
const content_04_content = lazy(() => import("../../steps/Content_04"));

const Content = (props: any) => {
	const contentMap: {
		[key: string]: React.LazyExoticComponent<() => JSX.Element>;
	} = {
		content_01_content,
		content_02_content,
		content_03_content,
		content_04_content,
	};

	const id = "content_" + props.match.params.id;
	const noContent = <div>NO CONTENT</div>;
	const ContentElement = contentMap[id];

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className='markdown-body'>
				{ContentElement == undefined ? noContent : <ContentElement />}
			</div>
		</Suspense>
	);
};

export default Content;
