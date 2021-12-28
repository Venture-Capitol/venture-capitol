import React from "react";

import { Meta } from "@storybook/react";

import Task from "./Task";

export default {
	component: Task,
	title: "Components/Task",
} as Meta;

export const Primary: React.VFC<{}> = () => <Task />;
