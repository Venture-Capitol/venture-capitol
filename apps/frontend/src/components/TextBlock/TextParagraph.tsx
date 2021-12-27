import { FunctionComponent } from "react";
import s from "./TextParagraph.module.scss";

type AbsatzProps = {
	title?: string;
	children: React.ReactNode;
};

const TextParagraph: FunctionComponent<AbsatzProps> = ({
	title,
	children,
}: AbsatzProps) => {
	return (
		<div className={s.block}>
			<h2 className={s.block_title}>{title}</h2>
			<p className={s.block_content}>{children}</p>
		</div>
	);
};

export default TextParagraph;
