import React, { FunctionComponent, forwardRef } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
	children?: React.ReactNode;
	variant?: "primary" | "secondary" | "tertiary";
	width?: "auto" | "fullwidth";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, width = "auto", variant = "primary" }, ref) => {
		return (
			<button
				ref={ref}
				className={s.default_btn}
				data-variant={variant}
				data-width={width}
			>
				{children}
			</button>
		);
	}
);

export default Button;
