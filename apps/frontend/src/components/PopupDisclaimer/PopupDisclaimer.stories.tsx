import React from "react";

import { Meta } from "@storybook/react";

import PopupDisclaimer from "./PopupDisclaimer";

export default {
	component: PopupDisclaimer,
	title: "Components/Button",
} as Meta;

export const Primary: React.VFC<{}> = () => <PopupDisclaimer />;
