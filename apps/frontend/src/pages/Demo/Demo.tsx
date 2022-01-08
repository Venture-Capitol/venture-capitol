import TaskList from "@vc/frontend/component/TaskList/TaskList";
import DisclaimerPopup from "@vc/frontend/component/Popup/DisclaimerPopup";

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
			<DisclaimerPopup />
			<TaskList />
		</div>
	);
}