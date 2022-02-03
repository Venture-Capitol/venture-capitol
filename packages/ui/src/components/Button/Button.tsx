import React, { FunctionComponent, forwardRef } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
	variant?: "primary" | "secondary" | "tertiary";
	width?: "auto" | "fullwidth" | "max-content";
	children: React.ReactNode;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			width = "auto",
			variant = "primary",
			disabled = "false",
			onClick,
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				className={s.default_btn}
				data-variant={variant}
				data-width={width}
				data-disabled={disabled}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}
);

export default Button;
