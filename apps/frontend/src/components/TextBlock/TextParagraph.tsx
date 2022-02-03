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
			{title && <h3 className={s.block_title}>{title}</h3>}
			<p className={s.block_content}>{children}</p>
		</div>
	);
};

export default TextParagraph;
