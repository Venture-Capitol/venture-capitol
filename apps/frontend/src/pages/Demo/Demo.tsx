import TaskList from "@vc/frontend/component/TaskList/TaskList";
import React, { useEffect, useState } from "react";

export default function Demo() {
	let [text, setText] = useState("");

	function updateFromStorage() {
		let text = window.localStorage.getItem("text");
		setText(text || "");
	}

	useEffect(() => updateFromStorage(), []);

	useEffect(() => {
		let l = window.addEventListener("storage", updateFromStorage);
		return () => window.removeEventListener("storage", updateFromStorage);
	});

	useEffect(() => {
		window.localStorage.setItem("text", text);
	}, [text]);

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
			<h1>Hello</h1>
			{/* synchronize input with t  */}
			<input
				type='text'
				placeholder={"schreib was..."}
				value={text}
				onChange={e => setText(e.target.value)}
			/>

			{/* <TaskList /> */}
		</div>
	);
}
