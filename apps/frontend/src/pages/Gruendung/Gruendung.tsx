import Button from "@vc/ui/src/components/Button/Button";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";
import { Redirect } from "react-router-dom";
import s from "./Gruendung.module.scss";

export default function () {
	const { currentCompany, nodes, initialNodeId, createCompany } =
		useGruendungContext();

	function findNextNode() {
		let node = nodes[initialNodeId];
		while (node.checked || node.selectedPath != undefined) {
			if (node.selectedPath != undefined) {
				node = nodes[node.next[node.selectedPath]];
			}
			node = nodes[node.next[0]];
		}
		return node;
	}

	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background:
					"radial-gradient(95.33% 88.77% at 100% 25.99%, #F3EAE4 0%, #F5EBDF 11.12%, #F6F5F8 33.47%)",
			}}
		>
			<div style={{ width: "1200px" }} className={`${s.auswahl} content`}>
				{currentCompany && <Redirect to={"/gruendung/" + findNextNode().id} />}
				<h1 className={s.title}>Welche Gesellschaftsform willst du Gründen?</h1>
				<div className={s.container}>
					<div className={`${s.disabledBtn} ${s.btnContainer}`}>
						<Button
							onClick={() => {
								createCompany("GMBH");
							}}
							disabled={true}
						>
							GmbH
						</Button>
					</div>
					<div className={`${s.disabledBtn} ${s.btnContainer}`}>
						<Button
							onClick={() => {
								createCompany("EINZELUNTERNEHMEN");
							}}
							disabled={true}
						>
							Einzel&shy;unternehmen
						</Button>
					</div>
					<div className={`${s.disabledBtn} ${s.btnContainer}`}>
						<Button
							onClick={() => {
								createCompany("FREIBERUFLER");
							}}
							disabled={true}
						>
							Freiberufler
						</Button>
					</div>
					<div className={s.btnContainer}>
						<Button
							onClick={() => {
								createCompany("UG");
							}}
						>
							UG
						</Button>
					</div>
					<div className={`${s.disabledBtn} ${s.btnContainer}`}>
						<Button
							onClick={() => {
								createCompany("GBR");
							}}
							disabled={true}
						>
							GBR
						</Button>
					</div>
					<div className={`${s.disabledBtn} ${s.btnContainer}`}>
						<Button
							onClick={() => {
								createCompany("PARTG");
							}}
							disabled={true}
						>
							PartG
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
