import React from "react";
import { action } from "@storybook/addon-actions";

import Button from "../lib/button";

export default {
	title: "Global Button",
	component: Button,
};

export const Text = () => (
	<Button onClick={action("clicked")}>Global Button</Button>
);

export const Emoji = () => (
	<Button onClick={action("clicked")}>
		<span role='img' aria-label='so cool'>
			😀 😎 👍 💯
		</span>
	</Button>
);
