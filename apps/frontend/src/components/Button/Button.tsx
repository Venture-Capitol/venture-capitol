import { FunctionComponent } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
	children?: React.ReactNode;
	variant?: string;
	href?: string;
};

const Button: FunctionComponent<ButtonProps> = ({
	children,
	variant,
	href,
}: ButtonProps) => {
	return (
		<a href={href} className={s.default_btn}>
			{children}
		</a>
	);
};

export default Button;
