import React from "react";

import { Meta } from "@storybook/react";

import TextBlock from "./TextBlock";

export default {
	component: TextBlock,
	title: "Components/TextBlock",
} as Meta;

export const Primary: React.VFC<{}> = () => (
	<TextBlock title='Storybook' arrow={false}>
		Storybook
	</TextBlock>
);
