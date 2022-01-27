import Button from "@vc/ui/src/components/Button/Button";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";
import { Redirect } from "react-router";

export default function () {
	const { currentCompany, nodes, initialNodeId } = useGruendungContext();

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
		<div style={{ padding: "20rem" }}>
			{currentCompany && <Redirect to={"/gruendung/" + findNextNode().id} />}

			<Button>UG erstellen</Button>
		</div>
	);
}
