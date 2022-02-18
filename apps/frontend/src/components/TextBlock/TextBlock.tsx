import { FunctionComponent, useEffect } from "react";
import s from "./TextBlock.module.scss";
import BackArrow from "../BackArrow/BackArrow";
import Footer from "../Footer/Footer";

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
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={`${s.text_block} content`}>
			<div className={s.wrapper}>
				<h1 className={s.title}>
					{arrow && <BackArrow />} {title}
				</h1>
				<div className={s.page_content}>{children}</div>
				<div className={s.bot_gradient}></div>
			</div>
			<Footer />
		</div>
	);
};

export default TextBlock;
