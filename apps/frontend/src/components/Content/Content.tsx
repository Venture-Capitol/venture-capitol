import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./markdown.scss";

const Content = (props: any) => {
	const [Component, setComponent] = useState<any>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function setMarkDownComponent() {
			try {
				const module = await import(
					"../../steps/" + props.match.params.id + ".md"
				);
				setComponent(module.ReactComponent);
			} catch (error) {
				setComponent(<Redirect to={"/content"} />);
			}
		}
		setMarkDownComponent();
		return () => {};
	}, []);

	useEffect(() => {
		if (Component == "") {
			setLoading(true);
		} else {
			setLoading(false);
		}
		return () => {};
	}, [Component]);

	const loader = <div>Loading...</div>;

	return <div className='markdown-body'>{loading ? loader : Component}</div>;
};

export default Content;
