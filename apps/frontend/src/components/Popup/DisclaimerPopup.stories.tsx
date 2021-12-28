import React from "react";

import { Meta } from "@storybook/react";

import DisclaimerPopup from "./DisclaimerPopup";

export default {
	component: DisclaimerPopup,
	title: "Components/DisclaimerPopup",
} as Meta;

export const Primary: React.VFC<{}> = () => <DisclaimerPopup />;
