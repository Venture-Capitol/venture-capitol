import { FunctionComponent } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
	title?: string;
	href?: string;
	func?: (...args: any[]) => any;
};

const Button: FunctionComponent<ButtonProps> = ({
	title,
	href,
	func,
}: ButtonProps) => {
	if (title == null) title = "Click me!";
	return (
		<a href={href}>
			<button className={s.default_btn} onClick={func}>
				{title}
			</button>
		</a>
	);
};

export default Button;
