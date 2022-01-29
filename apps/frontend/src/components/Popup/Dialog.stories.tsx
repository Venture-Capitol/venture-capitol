import React from "react";

import { Meta } from "@storybook/react";

import Dialog from "./Dialog";
import Button from "@vc/ui/src/components/Button/Button";

export default {
	component: Dialog,
	title: "Components/Dialog",
} as Meta;

export const Primary: React.VFC<{}> = () => (
	<Dialog
		title={"Hey du!"}
		children={"Test"}
		defaultOpen={true}
		close={
			<div style={{ width: "100%" }}>
				<Button width='fullwidth'>Alles klar!</Button>
			</div>
		}
	/>
);
