import { FunctionComponent } from "react";
import s from "./TextBlock.module.scss";
import BackArrow from "@vc/frontend/component/BackArrow/BackArrow";

type TextProps = {
	title?: string;
	children: React.ReactNode;
	arrow: boolean;
};

const TextBlock: FunctionComponent<TextProps> = ({
	title,
	children,
	arrow,
}: TextProps) => {
	return (
		<div className={`${s.text_block} content`}>
			{arrow && <BackArrow />}
			<h1>{title}</h1>
			<div className={s.page_content}>{children}</div>
			<div className={s.bot_gradient}></div>
		</div>
	);
};

export default TextBlock;
