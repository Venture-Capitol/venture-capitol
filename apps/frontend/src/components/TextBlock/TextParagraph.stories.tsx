import React from "react";

import { Meta } from "@storybook/react";

import TextParagraph from "./TextParagraph";

export default {
	component: TextParagraph,
	title: "Components/TextParagraph",
} as Meta;

export const Primary: React.VFC<{}> = () => (
	<TextParagraph title='Storybook'>Storybook</TextParagraph>
);
