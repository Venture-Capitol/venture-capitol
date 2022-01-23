import { Link } from "react-router-dom";
import s from "./Footer.module.scss";

export default function Footer() {
	return (
		<footer className={s.footer}>
			<p>
				&copy; 2021-{new Date().getFullYear()} Venture Capitol - Julian, Kai,
				Konstantin, <a href='https://spacifik.de'>Luis</a>,{" "}
				<a href='https://malts.me'>Malte</a> und Paul
			</p>
			<ul>
				<li>
					<Link to='/impressum'>Impressum</Link>
				</li>
				<li>
					<Link to='/datenschutz'>Datenschutzerklärung</Link>
				</li>
			</ul>
		</footer>
	);
}
