import TextBlock from "@vc/frontend/component/TextBlock/TextBlock";
import TextParagraph from "@vc/frontend/component/TextBlock/TextParagraph";

export default function Impressum() {
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
			<div
				style={{
					width: "900px",
				}}
			>
				<TextBlock title='Impressum' arrow={true}>
					<TextParagraph title='Betreiber dieser Website'>
						<b>Spacifik UG (haftungsbeschränkt)</b>
						<br />
						<br />
						Gerichtstr. 19
						<br />
						13347 Berlin
						<br />
						Germany
						<br />
						<br />
						Telefon: <a href='tel:+493089636852'>+49 (0) 30 896 368 52</a>
						<br />
						E-mail:{" "}
						<a href='mailto:luis.rieke@spacifik.com'>luis.rieke@spacifik.com</a>
						<br />
						<br />
						Amtsgericht Berlin-Charlottenburg HRB 195740 B<br />
						Sitz der Gesellschaft: Berlin, Deutschland
						<br />
						USt-ID: DE317616086.
					</TextParagraph>

					<TextParagraph title='Geschäftsführer'>Luis Rieke</TextParagraph>

					<TextParagraph title='Inhaltlich Verantwortlicher'>
						gemäß § 55 Abs. 2 RStV
						<br />
						Luis Rieke (Anschrift wie oben)
					</TextParagraph>

					<TextParagraph title='Datenschutzbeauftragter'>
						Luis Rieke
						<br />
						<br />
						Telefon: <a href='tel:+493089636852'>+49 (0) 30 896 368 52</a>
						<br />
						E-mail:{" "}
						<a href='mailto:luis.rieke@spacifik.com'>luis.rieke@spacifik.com</a>
					</TextParagraph>

					<TextParagraph title='Schutz deiner Daten'>
						Siehe dazu unsere{" "}
						<a href='/textpages/datenschutz'>Datenschutzerklärung.</a>
					</TextParagraph>

					<TextParagraph title='Haftung für unsere Inhalte'>
						Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
						<br />
						<br />
						Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
						können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind
						wir gemäß § 18 Abs. 2 Medienstaatsvertrag für eigene Inhalte auf
						diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
						<br />
						<br />
						Weiße uns also bitte freundlich darauf hin, wenn es Inhalte gibt,
						die inhaltlich korrigiert werden müssen. Wir werden dem nachkommen.
					</TextParagraph>

					<TextParagraph title='Haftungshinweis bei externen Links'>
						Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
						Inhalte wir leider keinen Einfluss haben.
						<br />
						<br />
						Deshalb können wir für diese fremden Inhalte auch keine Gewähr
						übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
						jeweilige Anbieter oder Betreiber der Seiten verantwortlich und
						nicht wir. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
						auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
						zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
						inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
						Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
						Bekanntwerden von Rechtsverletzungen werden wir derartige Links
						natürlich umgehend entfernen.
					</TextParagraph>

					<TextParagraph title='Unser Urheberrecht und dein Urheberrecht sind uns wichtig'>
						Die durch uns erstellten Inhalte und Werke auf diesen Seiten
						unterliegen dem deutschen Urheberrecht.
						<br />
						<br />
						Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
						Verwertung außerhalb der Grenzen des Urheberrechtes brauchen eine
						explizit angeforderte, schriftliche Erlaubnis der Spacifik UG
						(haftungsbeschränkt). Downloads und Kopien dieser Seite sind nicht
						gestattet.
						<br />
						<br />
						Wenn die Inhalte auf dieser Seite nicht von uns selbst erstellt
						wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
						werden Inhalte Dritter als solche gekennzeichnet. Solltest du
						trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
						wir um einen entsprechenden Hinweis.
						<br />
						<br />
						Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
						Inhalte natürlich umgehend entfernen.
					</TextParagraph>

					<TextParagraph title='Verstöße, Kritik und Verbesserungsvorschläge'>
						Falls du dich egal aus welchem Grund ungerecht behandelt fühlst und
						Kritik äußern willst, möchten wir dich bitten zunächst mit uns
						Kontakt aufzunehmen. Über alles lässt sich reden und wir finden
						bestimmt eine Lösung auch ohne Anwalt.
						<br />
						<br />
						Über Vorschläge und Ideen freuen wir uns sowieso, also keine Scheu
						vor der Kontaktaufnahme.
						<br />
						<br />
						<a href='mailto:luis.rieke@spacifik.com'>luis.rieke@spacifik.com</a>
					</TextParagraph>
				</TextBlock>
			</div>
		</div>
	);
}
