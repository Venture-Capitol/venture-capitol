import React from "react";

import { Meta } from "@storybook/react";

import LogoVideo from "./LogoVideo";

export default {
	component: LogoVideo,
	title: "Components/LogoVideo",
} as Meta;

export const Primary: React.VFC<{}> = () => <LogoVideo />;
