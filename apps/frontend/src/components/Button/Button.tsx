import { FunctionComponent } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
	children?: React.ReactNode;
	style?: string;
	href?: string;
	func?: (...args: any[]) => any;
};

const Button: FunctionComponent<ButtonProps> = ({
	children,
	style,
	href,
	func,
}: ButtonProps) => {
	return (
		<a href={href}>
			<button className={s.default_btn} onClick={func}>
				{children}
			</button>
		</a>
	);
};

export default Button;
