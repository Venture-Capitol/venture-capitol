import React, { FunctionComponent, forwardRef } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
	variant?: "primary" | "secondary" | "tertiary";
	width?: "auto" | "fullwidth";
	children: React.ReactNode;
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
