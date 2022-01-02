import React, { FunctionComponent } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
	children?: React.ReactNode;
	variant?: "primary" | "secondary" | "tertiary";
};

const Button: FunctionComponent<ButtonProps> = ({
	children,
	variant = "primary",
}: ButtonProps) => {
	return (
		<button className={s.default_btn} data-variant={variant}>
			{children}
		</button>
	);
};

export default Button;
