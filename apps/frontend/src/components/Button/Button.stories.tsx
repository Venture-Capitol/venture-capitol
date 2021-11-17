import React from "react";

import { Meta } from "@storybook/react";

import Button from "./Button";

export default {
	component: Button,
	title: "Components/Button",
} as Meta;

export const Primary: React.VFC<{}> = () => <Button />;
