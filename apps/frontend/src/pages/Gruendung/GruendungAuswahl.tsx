import { Link } from "react-router-dom";
import s from "./GruendungAuswahl.module.scss";

const GruendungAuswahl = () => {
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background:
					"radial-gradient(95.33% 88.77% at 100% 25.99%, #F3EAE4 0%, #F5EBDF 11.12%, #F6F5F8 33.47%)",
			}}
		>
			<div style={{ width: "1200px" }} className={`${s.auswahl} content`}>
				<h1 className={s.title}>Welche Gesellschaftsform willst du Gründen?</h1>
				<div className={s.container}>
					<Link to={""}>
						<div className={s.item}>GmbH</div>
					</Link>
					<Link to={""}>
						<div className={s.item}>Einzel&shy;unternehmen</div>
					</Link>
					<Link to={""}>
						<div className={s.item}>Freiberufler</div>
					</Link>
					<Link to={""}>
						<div className={s.item}>UG</div>
					</Link>
					<Link to={""}>
						<div className={s.item}>GBR</div>
					</Link>
					<Link to={""}>
						<div className={s.item}>PartG</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default GruendungAuswahl;
