import React from "react";

import { Meta } from "@storybook/react";

import BackArrow from "./BackArrow";

export default {
	component: BackArrow,
	title: "Components/BackArrow",
} as Meta;

export const Primary: React.VFC<{}> = () => <BackArrow />;
