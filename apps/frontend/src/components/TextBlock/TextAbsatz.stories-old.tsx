import React from "react";

import { Meta } from "@storybook/react";

import TextAbsatz from "./TextAbsatz";

export default {
	component: TextAbsatz,
	title: "Components/TextAbsatz",
} as Meta;

export const Primary: React.VFC<{}> = () => (
	<TextAbsatz title='Storybook'>Storybook</TextAbsatz>
);
