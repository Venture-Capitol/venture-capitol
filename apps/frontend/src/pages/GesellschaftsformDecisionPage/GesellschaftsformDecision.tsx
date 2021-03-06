import { useHistory } from "react-router-dom";
import TextParagraph from "@vc/frontend/component/TextBlock/TextParagraph";
import Button from "@vc/ui/src/components/Button/Button";
import s from "./GesellschaftsformDecision.module.scss";
import { useGruendungContext } from "contexts/Gruendung/Gruendung";
import Footer from "@vc/frontend/component/Footer/Footer";

export default function Gesellschaftsform() {
	const history = useHistory();
	const { nodes, initialNodeId, createCompany } = useGruendungContext();

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

	return (
		<div className={s.ctaPage}>
			<div className={s.header + " content"}>
				<h1>Weißt du schon, welche Gesellschaftsform du brauchst?</h1>

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
			</div>

			<main className='content'>
				<TextParagraph title='Noch nicht? kein Problem.'>
					Ganz am Anfang deiner Gründung ist es wichtig zu wissen, wie du deine
					Firma rein rechtlich organisieren willst. Im Folgenden wollen wir dir
					bei dieser Entscheidung unter die Arme greifen.
					<br />
					<br />
					Relevante Kriterien für die Wahl einer Rechtsform sind:
				</TextParagraph>

				<ul>
					<li>Anzahl der Gründer</li>
					<li>Haftungsfragen</li>
					<li>Stammkapital + Gründungskosten</li>
					<li>Aufwand bei der Buchhaltung</li>
					<li>Welche Steuern fallen an</li>
					<li>Für Investoren geeignet</li>
				</ul>
				<br />

				<TextParagraph title='Gängige Rechtsformen'>
					Wir beschränken uns auf dieser Seite auf die gängigsten Rechtsformen
					für Gründer. Unser Anspruch ist es nicht, jeden kleinen Sonderfall zu
					beleuchten, sondern erstmal alle Informationen zu reduzieren, damit
					dir die Gründung leichter fällt und du dich auf das Wesentliche
					konzentrieren kannst.
					<br />
					<br />
					Im Folgenden zeigen wir dir die haftungsbeschränkten Gesellschaften UG
					und GmbH für größere Gründungen, zeigen dir die Vorteile von
					Katalogberufen nach § 18 EStG (Freiberufler und PartG) und
					thematisieren zuletzt die Gründung als Einzelunternehmer und GbR, zwei
					Gesellschaftsformen die sich für Freelancer und kleinere Projekte
					besonders gut eignen.
					<br />
					<br />
				</TextParagraph>

				<TextParagraph title='GmbH und UG'>
					Wir starten mit dem Klassiker: GmbH und UG sind haftungsbeschränkte
					Gesellschaften, was für dich als Gründer mit vielen Vorteilen
					verbunden ist. Dafür musst du hier vor der Existenzgründung
					Stammkapital einzahlen. Das hindert jedoch wenige. Die GmbH ist nach
					wie vor die mit Abstand die beliebteste Rechtsform. Außerdem kann man
					mit einer UG auch mit weniger Stammkapital starten.
					<br />
					<br />
					Vorteile einer haftungsbeschränkten Gesellschaft:
					<br />
				</TextParagraph>

				<ul>
					<li>Du als Gesellschafter haftest nicht mit deinem Privatvermögen</li>
					<li>
						Gründung mit einer Person möglich, denn der Gesellschafter der das
						Unternehmen besitzt kann gleichzeitig auch Geschäftsführer sein und
						das Unternehmen führen
					</li>
					<li>
						Es gibt hier große Vorteile bei Vererbung und Verkauf der Firma,
						gegenüber allen anderen Rechtsformen
					</li>
					<li>
						Komplexere Geschäfte können abgeschlossen werden, z.B. der
						Anteilerwerb an anderen Unternehmen
					</li>
					<li>
						Bei der UG reicht für eine Gründung bereits ein Stammkapital von 1€
						aus. Ist ein Kapital von 25.000 Euro aus den Gewinnen angespart,
						kann dieses in Stammkapital umgewandelt und die UG zu einer GmbH
						umgewandelt werden
					</li>
					<li>
						Du als Gesellschafter haftest in der Regel nicht mit deinem
						Privatvermögen
					</li>
				</ul>

				<TextParagraph>
					Nachteile einer haftungsbeschränkten Gesellschaft:
				</TextParagraph>

				<ul>
					<li>
						Vor allem ein Punkt: Bei der GmbH muss ein Stammkapital von 25.000€
						bzw. 12.500€ vor der Unternehmensgründung hinterlegt werden
					</li>
					<li>
						Volle Bilanzierungspflicht, Buchhaltung und Jahresabschluss sind
						etwas aufwändiger
					</li>
					<li>
						Bei der UG dürfen Gewinne nicht sofort ausgeschüttet werden, es
						müssen mindestens 25% Prozent des Jahresüberschusses als
						Eigenkapitalrücklage in der Firma verbleiben, die Gesellschafter
						müssen also eine gesetzliche Rücklage bilden
					</li>
				</ul>

				<TextParagraph>
					Aber passt jetzt die UG oder die GmbH besser für dich? Naja,
					letztendlich ist es quasi die selbe Rechtsform, nur dass du bei der UG
					noch darauf hinarbeitest sie zu einer GmbH umzuwandeln sobald dein
					Unternehmen die entsprechende Größe erreicht. Solltest du also die
					Möglichkeit haben direkt das Stammkapital für eine GmbH zu stellen,
					dann ist das vermutlich die beste Wahl und spart dir langfristig Zeit
					und Papierkram. Es ist aber auch keine Schande zunächst mit einer UG
					zu starten, nur dass du eben hier aufpassen musst, dass du nicht die
					gesamten Erlöse deiner Firma auszahlst und immer etwas Geld im
					Unternehmen lässt sofern es dir möglich ist, damit es wachsen kann.
					<br />
					<br />
				</TextParagraph>

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
						<div className={s.buttonDescription}>Gründung</div>
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
						<div className={s.buttonDescription}>Gründung</div>
					</Button>
				</div>
				<br />
				<br />

				<TextParagraph title='Freiberufler und PartG'>
					Wenn irgendwie möglich versucht man hier rein zu kommen. Denn
					Freiberufler haben sehr viel weniger Pflichten, vereinfachte
					Buchführung und man spart sich einen haufen Gebühren.
					<br />
					<br />
					Aber wer ist denn jetzt Freiberufler? In diese Kategorie fällst du,
					wenn du eine wissenschaftliche, künstlerische, schriftstellerische,
					unterrichtende oder erzieherische Tätigkeit ausüben willst. Außerdem
					zählt man zu den Freiberuflern die Berufstätigkeit der Ärzte,
					Zahnärzte, Tierärzte, Rechtsanwälte, Notare, Patentanwälte,
					Vermessungsingenieure, Ingenieure, Architekten und viele weitere
					sogenannte Katalogberufe. Solltest du dir unsicher sein ob du als
					Freiberufler praktizieren darfst, ruf am Besten mal bei deinem
					Gewerbe- oder Finanzamt an.
					<br />
					<br />
					In der PartG, der sogenannten Partnerschaftsgesellschaft können sich
					dann wiederum ausschließlich Angehörige freier Berufe zur Ausübung
					ihrer Berufe zusammenschließen. Das greift beispielsweise bei der
					Gründung einer Arztpraxis. Diese Gründung beruht im Wesentlichen auf
					den Grundlagen der Gesellschaft bürgerlichen Rechts (GbR). Es gibt
					allerdings einige Unterschiede. So bietet die
					Partnerschaftsgesellschaft zum Beispiel die Möglichkeit einer
					Haftungsbeschränkung.
					<br />
					<br />
					Vorteile der Katalogberufe nach § 18 EStG:
					<br />
				</TextParagraph>

				<ul>
					<li>Keine Gewerbeanmeldung notwendig</li>
					<li>Keine Gewerbesteuer</li>
					<li>
						Keine doppelte Buchführung. Eine einfache
						Einnahmen-Überschuss-Rechnung (EÜR) zum Jahresende reicht aus.
					</li>
					<li>
						Keine Zwangsmitgliedschaft bei der Industrie- und Handelskammer
						(IHK) oder Handwerkskammer – dementsprechend keine Zahlung des
						Mitgliedsbeitrags
					</li>
					<li>Unternehmensgründung ohne Startkapital möglich</li>
				</ul>

				<TextParagraph>
					<br />
					Da sich unsere Gründungsplattform noch im Aufbau befindet, sind leider
					noch nicht alle Entscheidungsrouten für die Gründung als Freiberufler
					fertiggestellt. Diese findest du allerdings zeitnah auf dieser Seite
					und kannst dann auch diese Gründungsform über Venture Capitol
					abwickeln.
					<br />
					<br />
				</TextParagraph>

				<div className={s.buttons}>
					<Button variant='secondary'>
						<div className={s.buttonTitle} data-color='blue'>
							Freiberufler
						</div>
						<div className={s.buttonDescription}>Gründung (folgt)</div>
					</Button>
					<Button variant='secondary'>
						<div className={s.buttonTitle} data-color='purple'>
							PartG
						</div>
						<div className={s.buttonDescription}>Gründung (folgt)</div>
					</Button>
				</div>
				<br />
				<br />

				<TextParagraph title='Einzelunternehmer und GbR'>
					Ein Einzelunternehmen wird immer von einer einzelnen Person gegründet.
					Eine GbR ist eine Gesellschaft bürgerlichen Rechts, zu der sich
					mindestens zwei Gründer zusammenschließen.
					<br />
					<br />
					Diese beiden Rechtsformen bieten leider nicht die Vorteile der
					Haftungsbeschränkung und diese Unternehmen sind auch weniger dazu
					geeignet Investoren zu beteiligen, man kann diese Firmen schwerer
					verkaufen und so weiter. Dafür ist hier die Gründung und auch später
					die Buchhaltung im Verhältnis simplistisch.
					<br />
					<br />
					Vorteile von Einzelunternehmung und GbR:
					<br />
				</TextParagraph>

				<ul>
					<li>
						Prozess der Unternehmensgründung sehr einfach und kostengünstig
					</li>
					<li>Kein Stammkapital notwendig</li>
					<li>Kein Gesellschaftsvertrag erforderlich</li>
					<li>Gewinne gehören komplett dem Unternehmer</li>
					<li>
						Keine Publizitätspflichten z. B. Offenlegung der Jahresabschlüsse
					</li>
					<li>
						Sehr einfache Vorgehensweise, kein Erfordernis besonderer
						Formalitäten
					</li>
				</ul>

				<TextParagraph>Nachteile von Einzelunternehmung und GbR:</TextParagraph>

				<ul>
					<li>Der Unternehmer haftet komplett mit seinem Privatvermögen</li>
					<li>
						Die Erweiterung des Eigenkapitals muss der Inhaber aus eigener Kraft
						stemmen (keine Investoren etc.)
					</li>
					<li>
						Die Aufnahme weiterer Gesellschafter ist nicht möglich (nur nach
						Änderung der Rechtsform)
					</li>
					<li>
						Der Name des Inhabers muss in der Unternehmensbezeichnung vorkommen,
						ein Firmenname ist also nicht frei von dir wählbar
					</li>
				</ul>

				<TextParagraph>
					Auch hier stehen noch nicht alle Entscheidungsrouten für die Gründung
					final zur Verfügung. Willst du als Einzelunnternehmer oder als GbR
					gründen musst du dich also noch ein bisschen gedulden. Wir arbeiten
					aber mit Vollgas an deiner Gründungsroute, versprochen.
					<br />
					<br />
				</TextParagraph>

				<div className={s.buttons}>
					<Button variant='secondary'>
						<div className={s.buttonTitle} data-color='blue'>
							Einzelunternehmen
						</div>
						<div className={s.buttonDescription}>Gründung (folgt)</div>
					</Button>
					<Button variant='secondary'>
						<div className={s.buttonTitle} data-color='purple'>
							GbR
						</div>
						<div className={s.buttonDescription}>Gründung (folgt)</div>
					</Button>
				</div>
				<br />
				<br />
			</main>
			<Footer />
		</div>
	);
}
