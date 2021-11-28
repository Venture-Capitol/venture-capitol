import { nanoid } from "nanoid";
import path from "path";
import React, { FC, ReactElement, useEffect, useState } from "react";
import DecisionNode, { DecisionNodeProps } from "../DecisionNode/DecisionNode";
import DecisionPath, { DecisionPathProps } from "../DecisionPath/DecisionPath";
import EmptyNode, { EmptyNodeProps } from "../EmptyNode/EmptyNode";
import styles from "./Decision.module.scss";

interface DecisionProps {
	children: Array<ReactElement<DecisionNodeProps | DecisionPathProps>>;
}
const Decision: FC<DecisionProps> = ({ children }) => {
	const [decisionNode, setDecisionNode] = useState<any>(null);
	const [decisionPaths, setDecisionPaths] = useState<any>(new Array());

	useEffect(() => {
		let paths = new Array();
		let maxChildrenCount = 0;
		let decisionNode: any;
		children.map(child => {
			if (child.type == DecisionNode) {
				decisionNode = child;
			} else {
				let childrenCount = React.Children.count(child.props.children);
				if (maxChildrenCount < childrenCount) {
					maxChildrenCount = childrenCount;
				}
				paths.push(child);
			}
		});

		paths.forEach((path, index, paths) => {
			let diff = maxChildrenCount - React.Children.count(path.props.children);
			if (diff > 0) {
				let parentNextNodes: string[] = [];
				decisionNode.props.next.forEach((x: any) => {
					parentNextNodes.push(x);
				});
				let parentNextNode: string;

				if (path.props.children == undefined) {
					paths.forEach(path => {
						if (path.props.children != undefined) {
							let childId = path.props.children[0].props.id;
							if (parentNextNodes.includes(childId)) {
								parentNextNodes.splice(parentNextNodes.indexOf(childId), 1);
							}
						}
					});
					parentNextNode = parentNextNodes[0];
				} else {
					parentNextNode =
						path.props.children[React.Children.count(path.props.children) - 1]
							.props.next[0];
				}

				let prevId = nanoid();
				let emptyNodes: ReactElement<EmptyNodeProps>[] = new Array();
				emptyNodes.unshift(
					<EmptyNode id={prevId} next={[parentNextNode]} key='-20' />
				);

				for (let index = 0; index < diff - 1; index++) {
					let currId = nanoid();
					emptyNodes.unshift(
						<EmptyNode id={currId} next={[prevId]} key={index} />
					);
					prevId = currId;
				}

				if (path.props.children == undefined) {
					decisionNode.props.next.splice(
						decisionNode.props.next.indexOf(parentNextNode),
						1
					);

					let dn = React.cloneElement(decisionNode, {
						id: decisionNode.props.id,
						next: decisionNode.props.next.concat(prevId),
					});
					decisionNode = dn;
				} else {
					path.props.children[
						React.Children.count(path.props.children) - 1
					].props.next[0] = prevId;
				}

				paths[index] = React.cloneElement(
					path,
					{ emptyNodes: emptyNodes, key: index },
					path.props.children
				);
			}
		});
		setDecisionNode(decisionNode);
		setDecisionPaths(paths);
		return () => {};
	}, []);

	return (
		<div className={styles.decision}>
			{decisionNode}
			<div className={styles.decision_path_container}>{decisionPaths}</div>
		</div>
	);
};

export default Decision;
