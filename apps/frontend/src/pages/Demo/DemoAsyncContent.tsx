import React from "react";
import { Link } from "react-router-dom";

export default function Demo() {
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background:
					"radial-gradient(95.33% 88.77% at 100% 25.99%, #F3EAE4 0%, #F5EBDF 11.12%, #F6F5F8 33.47%)",
			}}
		>
			<Link to={"/content/01_content"}>01 Content</Link>
			<Link to={"/content/02_content"}>02 Content</Link>
			<Link to={"/content/03_content"}>03 Content</Link>
			<Link to={"/content/04_content"}>04 Content</Link>
		</div>
	);
}
