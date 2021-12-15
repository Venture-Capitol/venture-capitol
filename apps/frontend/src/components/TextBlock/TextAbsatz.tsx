import { FunctionComponent } from "react";
import s from "./TextAbsatz.module.scss";
import parse from "html-react-parser";

type AbsatzProps = {
	title?: string;
	children: React.ReactNode;
};

const TextAbsatz: FunctionComponent<AbsatzProps> = ({
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

export default TextAbsatz;
