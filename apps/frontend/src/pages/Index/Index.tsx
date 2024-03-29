import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import s from "./Index.module.scss";
import useMediaQuery from "@vc/frontend/util/useMediaQuery";
import Button from "@vc/ui/src/components/Button/Button";
import { SearchIcon } from "@heroicons/react/solid/esm";
import Footer from "@vc/frontend/component/Footer/Footer";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";
import DisclaimerPopup from "@vc/frontend/component/Popup/DisclaimerPopup";
import { checkCookie } from "@vc/frontend/util/DPACK";
import * as basicScroll from "basicscroll";
import mixpanel from "mixpanel-browser";

const Landing: React.FunctionComponent = () => {
	const isMobile = useMediaQuery("(max-width: 900px)");
	const history = useHistory();
	const DP_ACK = checkCookie();
	const { nodes, initialNodeId, createCompany } = useGruendungContext();
	const headerImageRef = useRef<HTMLImageElement>(null);
	const secondImageRef = useRef<HTMLImageElement>(null);

	function findNextNode() {
		let node = nodes[initialNodeId];
		while (node.checked || node.selectedPath != undefined) {
			if (node.selectedPath != undefined) {
				node = nodes[node.next[node.selectedPath]];
			}
			node = nodes[node.next[0]];
		}
		return node;
	}

	useEffect(() => {
		if (!headerImageRef.current) return;
		const instance = basicScroll.create({
			elem: headerImageRef.current,
			from: "0px",
			to: "bottom-top",
			direct: true,
			props: {
				"--shift": {
					from: "0px",
					to: "-80px",
				},
				"--rot": {
					from: "0deg",
					to: "15deg",
				},
			},
		});
		instance.start();
		return () => instance.destroy();
	}, [headerImageRef]);

	useEffect(() => {
		if (!secondImageRef.current) return;
		const instance = basicScroll.create({
			elem: secondImageRef.current,
			from: "0px",
			to: "bottom-top",
			direct: true,
			props: {
				"--shift": {
					from: "80px",
					to: "-80px",
				},
				"--rot": {
					from: "0deg",
					to: "25deg",
				},
			},
		});
		instance.start();
		return () => instance.destroy();
	}, [secondImageRef]);

	return (
		<div className={s.landingPage}>
			{!DP_ACK && <DisclaimerPopup />}
			<section className={s.header}>
				<h1>In wenigen Schritten zu deinem eigenen Unternehmen</h1>
				<div className={s.buttons}>
					<Link
						to={"/gesellschaftsform"}
						onClick={() => mixpanel.track("CTA click")}
					>
						<Button variant='secondary'>
							<div className={s.searchButtonContent}>
								<span>Jetzt Gründung Starten</span>
							</div>
						</Button>
					</Link>
				</div>

				<picture
					className={s.skewed}
					ref={headerImageRef}
					style={{
						["--shift" as any]: "0px",
						["--rot" as any]: "0deg",
					}}
				>
					<source
						srcSet='https://venturecapitol.de/media/64fcc9b1-91a6-41ea-9356-264ce119dc6b.avif'
						type='image/avif'
					/>
					<img
						src='https://venturecapitol.de/media/64fcc9b1-91a6-41ea-9356-264ce119dc6b.jpg'
						alt='Screenshot der Venture Capitol Anwendung'
					/>
				</picture>
			</section>

			<section className={`${s.video} ${s.split}`}>
				{isMobile && <h1>Durchblick im Bürokratiedschungel</h1>}
				<video autoPlay={true} loop={true} muted={true} playsInline={true}>
					<source
						src='https://venturecapitol.de/media/eae4870d-9864-4a15-840d-99060aff2278.mp4'
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

			<section className={`${s.dlr} ${s.split}`}>
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
				<picture
					className={s.skewed}
					ref={secondImageRef}
					style={{
						["--shift" as any]: "0px",
						["--rot" as any]: "0deg",
					}}
				>
					<source
						srcSet='https://venturecapitol.de/media/6d9557c6-7ff8-4c9c-b02c-6142f7208e56.avif'
						type='image/avif'
					/>
					<img
						src='https://venturecapitol.de/media/6d9557c6-7ff8-4c9c-b02c-6142f7208e56.jpg'
						alt='Screenshot des Dienstleisterregisters'
					/>
				</picture>
				{isMobile && (
					<h1>Einfach bewährte Dienstleister für deine Gründung finden</h1>
				)}
			</section>

			<section className={s.startCompany}>
				<h1>Weißt du schon, welche Gesellschaftsform du gründen willst? </h1>
				<div className={s.buttons}>
					<Button
						variant='secondary'
						onClick={() => {
							createCompany("UG");
							history.push("/gruendung/" + findNextNode().id);
						}}
					>
						<div className={s.buttonTitle} data-color='blue'>
							UG
						</div>
						<div className={s.buttonDescription}>Gründen</div>
					</Button>
					<Button
						variant='secondary'
						onClick={() => {
							createCompany("GMBH");
							history.push("/gruendung/" + findNextNode().id);
						}}
					>
						<div className={s.buttonTitle} data-color='purple'>
							GmbH
						</div>
						<div className={s.buttonDescription}>Gründen</div>
					</Button>
				</div>
			</section>

			<section className={s.center}>
				<h1>Noch nicht? Kein Problem!</h1>
				<div className={s.buttons}>
					<Link to={"/gesellschaftsform"}>
						<Button variant='secondary'>
							<div className={s.searchButtonContent}>
								<SearchIcon /> <span>Gesellschaftsform finden</span>
							</div>
						</Button>
					</Link>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Landing;
