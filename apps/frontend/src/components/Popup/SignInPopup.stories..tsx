import React from "react";

import { Meta } from "@storybook/react";

import SignInPopup from "./SignInPopup";

export default {
	component: SignInPopup,
	title: "Components/SignInPopup",
} as Meta;

export const Primary: React.VFC<{}> = () => <SignInPopup trigger={null} />;
