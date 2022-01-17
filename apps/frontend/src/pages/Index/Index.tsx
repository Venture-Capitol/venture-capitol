import React from "react";
import s from "./Index.module.scss";
import useMediaQuery from "@vc/frontend/util/useMediaQuery";
import Button from "@vc/ui/src/components/Button/Button";
import { SearchIcon } from "@heroicons/react/solid/esm";

const Landing: React.FunctionComponent = () => {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	return (
		<div className={s.landingPage}>
			<section className={s.header}>
				<h1>In wenigen Schritten zu deinem eigenen Unternehmen</h1>
				<img
					className={s.skewed}
					src='https://cdn.ananaspizza.de/Entscheidung.jpg'
					alt=''
				/>
			</section>

			<section className='video'>
				{isMobile && <h1>Durchblick im Bürokratiedschungel</h1>}
				<video autoPlay={true} loop={true} muted={true}>
					<source
						src='https://cdn.ananaspizza.de/tasks_click.mp4'
						type='video/mp4'
					/>
				</video>

				<div className={s.details}>
					{!isMobile && <h1>Durchblick im Bürokratiedschungel</h1>}
					<ul className={s.description}>
						<li>Schritt für Schritt Anleitungen für deine Gesellschaftsform</li>
						<li>Den Status deiner Gründung immer im Auge behalten</li>
						<li>Immer wissen, was der nächste Schritt ist</li>
					</ul>
				</div>
			</section>

			<section className={s.reverse}>
				<div className={s.details}>
					{!isMobile && (
						<h1>Einfach bewährte Dienstleister für deine Gründung finden</h1>
					)}
					<ul className={s.description}>
						<li>
							Finde Anwälte, Steuerberater, Webdesigner und viel mehr für deine
							Gründung
						</li>
						<li>
							Lass dich von auf Gründungen spezialisierten Fachkräften beraten
						</li>
					</ul>
				</div>
				<img
					className={s.skewed}
					src='https://cdn.ananaspizza.de/Trefferseite.jpg'
					alt=''
				/>
				{isMobile && (
					<h1>Einfach bewährte Dienstleister für deine Gründung finden</h1>
				)}
			</section>

			<section>
				<h1>Weißt du schon, welche Gesellschaftsform du gründen willst? </h1>
				<div className={s.buttons}>
					<Button variant='secondary'>
						<div className={s.buttonTitle} data-color='blue'>
							UG
						</div>
						<div className={s.buttonDescription}>Gründen</div>
					</Button>
					<Button variant='secondary'>
						<div className={s.buttonTitle} data-color='purple'>
							GmbH
						</div>
						<div className={s.buttonDescription}>Gründen</div>
					</Button>
				</div>
			</section>

			<section>
				<h1>Noch nicht? Kein Problem!</h1>
				<div className={s.buttons}>
					<Button variant='secondary'>
						<div className={s.searchButtonContent}>
							<SearchIcon /> Gesellschaftsform finden
						</div>
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Landing;
