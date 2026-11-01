# Briefing: Relaunch Website IG Diessbach (igdiessbach.ch)

> **Für Claude Code.** Dieses Dokument enthält Analyse, Entscheide und die vollständige Umsetzungsvorgabe für den Neuaufbau der Website der Interessengemeinschaft Diessbach (IGD). Auftraggeber: Lorenz Gerber (Vorstand IGD, ab 2027 Mitglied PBBK). Lorenz ist kein IT-Spezialist: Erklärungen an ihn bitte einfach halten, Befehle copy-paste-fertig liefern.

---

## 0. Start-Prompt für Claude Code

```
Lies das Briefing IGD-Website-Relaunch-Briefing.md vollständig. Baue danach die neue Website der IG Diessbach gemäss Kapitel 5–9 als Astro-Projekt für Netlify. Gehe in den Phasen aus Kapitel 11 vor. Frage mich zu Beginn nach dem Ordner mit den Bildern der Wahlkampagne 2026 (Porträts, Gruppenfoto, Logo als Vektor) und nach den offenen Punkten aus Kapitel 12, soweit du sie für die aktuelle Phase brauchst. Erkläre mir jeden Schritt, bei dem ich etwas tun muss (z.B. Netlify-Konto, GitHub, Domain), in einfachen Worten.
```

---

## 1. Ausgangslage

| Punkt | Ist-Zustand (Analyse vom 1. Nov. 2026) |
|---|---|
| Plattform | Jimdo Creator (alte Version), Footer-Hinweis „www.printwebmedia.ch“ – Betreuer/Zugang unbekannt |
| Layout | Festes 3-Spalten-Layout (~950 px), Titelbild von 2011 (950 × 164 px) |
| Mobile | **Nicht responsive** – kein Viewport-Meta-Tag, horizontales Scrollen am Handy |
| Inhalte Startseite | 14 Bilder (Plakate, Flyer, Fotocollagen) ohne Text, alle `alt=""` |
| Aktuelles | Neuester Beitrag von 2021/2022 |
| Gästebuch | 2 Einträge (2010, Spam 2011) |
| Impressum | Leer |
| Datenschutz | Jimdo-Standardtext, nicht auf revDSG angepasst |
| Vorstand | Nur Namensliste, keine Fotos |
| Vertretung in Behörden | Fehlt komplett |
| Kontakt | Jimdo-Formular mit Captcha; private Mail/Telefon öffentlich |
| Agenda | Seitenleiste, enthält vergangene Anlässe, Titel „2025/26“ |

**Fazit:** Inhaltlich lebendig (Anlässe, Wahlkampagne aktuell), technisch und strukturell veraltet. Wähler erfahren nicht, *wer* die IGD ist, *was* sie erreicht hat und *wofür* sie steht.

### Bestehende URLs (für Weiterleitungen)
```
/                       Startseite
/aktuelles/
/portrait/
/portrait/organisation/
/portrait/statuten/
/archiv/
/kontakt/
/g%C3%A4stebuch/        (Gästebuch)
/about/                 (Impressum)
/sitemap/
/j/privacy              (Datenschutz)
```

---

## 2. Entscheide (vom Auftraggeber bestätigt)

1. **Neuaufbau** mit **Netlify** als Hosting, Umsetzung durch Claude Code.
2. **Personen und Bilder** stammen aus den Unterlagen der Wahlkampagne 2026 (Lorenz stellt den Ordner bereit).
3. Die IGD will **öffentlich Stellung zu Gemeindegeschäften** nehmen (Empfehlungen zur Gemeindeversammlung).
4. **Logo als Vektor** und **Kampagnen-Originaldateien** sind vorhanden.
5. **Relaunch-Termin: 20. Hauptversammlung, Do. 13. Mai 2027** (= 20 Jahre IGD).
6. Wer die Seite heute betreut und wem Domain/Jimdo-Konto gehören, ist **unbekannt** → muss vor dem Domainwechsel geklärt werden (siehe Kap. 10).

---

## 3. Ziele

1. **Handytauglich** – die meisten Besucher kommen über WhatsApp-Links aufs Handy.
2. **Vertrauen schaffen** – Gesichter, Leistungsbilanz, Transparenz.
3. **Mehrwert für die Bevölkerung** – Gemeindeversammlung verständlich erklärt, Anlässe mit Online-Anmeldung.
4. **Mitglieder gewinnen** – „Mitglied werden“ mit einem Klick.
5. **Einfache Pflege** durch den Vorstand ohne IT-Kenntnisse.
6. **Rechtlich sauber** – Impressum, Datenschutz nach revDSG, Einwilligung für Fotos.

## 4. Zielgruppen

| Zielgruppe | Fragt sich | Die Seite muss liefern |
|---|---|---|
| Stimmberechtigte (ca. 760) | Wer sind die? Was haben sie erreicht? Wofür stehen sie? | Köpfe, Leistungsbilanz, Positionen, Empfehlungen |
| Mitglieder | Was läuft? Wann ist der nächste Anlass? | Agenda, Anmeldung, News, HV-Unterlagen |
| Neuzuzüger | Was ist die IGD? Kann ich mitmachen? | Kurzporträt, Mitglied werden, Anlässe |
| Potenzielle Kandidierende | Wie komme ich in eine Kommission? | Seite „Mitmachen“ / „Kandidieren“ |
| Gemeinde / Medien | Ansprechperson? | Kontakt, Präsidium, Impressum |

---

## 5. Design

### 5.1 Grundsatz
Die Website ist die **Fortsetzung der Wahlkampagne 2026**: Wappenrot, Anthrazit, Weiss, Gruppenfoto, Wappen. Modern, ruhig, bodenständig – kein „Konzern-Look“.

### 5.2 Farbpalette

```css
:root {
  --igd-rot:        #B73518; /* Hauptfarbe – identisch mit diessbach.ch (Wappenrot) */
  --igd-rot-hell:   #D64130; /* Akzent, Buttons-Hover – Kampagnenrot (ca., an Originaldatei abgleichen) */
  --igd-anthrazit:  #1F2523; /* Text dunkel, dunkle Flächen – Kampagnen-Hintergrund (ca.) */
  --igd-grau:       #5B6260; /* Sekundärtext */
  --igd-hell:       #F5F3EF; /* Hintergrundflächen, warmes Hellgrau */
  --igd-weiss:      #FFFFFF;
  --igd-blau:       #2541C4; /* NUR im Logo – nicht als Gestaltungsfarbe */
}
```

- **Kontraste** nach WCAG AA prüfen (Weiss auf `--igd-rot` = ok; Rot auf Hellgrau für Fliesstext vermeiden).
- Die ca.-Werte mit den Kampagnen-Originaldateien (Pipette) abgleichen.

### 5.3 Logo
- Bestehendes Logo (schwarzes „G“ + blauer Schriftzug „DIESSBACH“) beibehalten, aber **auf der Website primär einfarbig** verwenden: weiss auf Rot/Anthrazit, schwarz/anthrazit auf Hell (wie in der Kampagne).
- Farbversion nur im Footer oder wo der Hintergrund weiss ist.
- Als **SVG** aus der Vektordatei erzeugen, Favicon (SVG + 32 px PNG + Apple Touch Icon 180 px) aus dem „G“ ableiten.

### 5.4 Wappen
Gemeindewappen (rot mit weissem Schrägwellenbalken) wie in der Kampagne als Gestaltungselement verwenden. **Hinweis:** Verwendung des Gemeindewappens durch einen politischen Verein vorab bei der Gemeindeverwaltung abklären (offener Punkt).

### 5.5 Typografie
- **Fira Sans** (Google Fonts, **lokal einbinden** – nicht vom Google-CDN laden, wegen Datenschutz).
- Gewichte: 400, 600, 800. Titel 800 (wie Kampagne), Fliesstext 400, mind. 18 px Basisgrösse (ältere Zielgruppe).

### 5.6 Bildsprache
- Echte Fotos aus Diessbach und von Anlässen, keine Stockfotos.
- Hero: Dorfansicht / Landschaft (neues Foto in hoher Auflösung, Querformat; Platzhalter bis Lieferung).
- Porträts einheitlich zuschneiden (quadratisch oder 4:5, gleicher Ausschnitt).
- Plakate/Flyer nur **ergänzend** zum Text, nie als einziger Inhaltsträger.

### 5.7 Komponenten
Header mit Logo + Menü (Hamburger am Handy), Hero, Karten (News, Anlass, Person), Buttons (primär Rot, sekundär Outline), Infobox „Unsere Empfehlung“, Agenda-Liste, Footer.

---

## 6. Seitenstruktur (Sitemap)

```
/                         Start
/wer-wir-sind/            Werte, Leistungsbilanz, Statuten
/wer-wir-sind/chronik/    20 Jahre IGD
/koepfe/                  Vorstand · Gemeinderat · Kommissionen
/koepfe/[slug]/           (optional) Einzelporträt
/aktuelles/               Beiträge (Liste)
/aktuelles/[slug]/        Beitrag
/gemeindeversammlung/     „Gemeindeversammlung verständlich erklärt“ + Empfehlungen
/anlaesse/                Kommende Anlässe + Rückblicke
/anlaesse/[slug]/         Anlass mit Anmeldeformular
/mitmachen/               Mitglied werden · Kandidieren · Anliegen
/kontakt/
/impressum/
/datenschutz/
```

Hauptmenü (max. 6 Punkte): **Wer wir sind · Köpfe · Aktuelles · Gemeindeversammlung · Anlässe · Mitmachen** – Kontakt als Button rechts.

---

## 7. Inhalte pro Seite

### 7.1 Start
1. **Hero:** Dorfbild, Logo, Claim **„Parteiunabhängig für unser Dorf.“**, Untertitel z.B. „Seit 20 Jahren setzen wir uns für Diessbach ein.“ Buttons: „Mitglied werden“ / „Ihr Anliegen“.
2. **Danke-Block Wahlen 2026** (bis ca. Feb. 2027): Gruppenfoto, „Danke für Ihr Vertrauen“, Resultat kurz (3 Sitze Gemeinderat, 3 PBBK, 2 Bildungskommission), Link zu „Köpfe“.
3. **Nächster Anlass** (automatisch aus Anlässe-Daten, vergangene ausblenden).
4. **Nächste Gemeindeversammlung** mit Link zur Erklärung/Empfehlung (sofern vorhanden).
5. **Neueste 3 Beiträge.**
6. **Unsere Werte** (5 Kacheln, kurz).
7. **WhatsApp-Kanal**-Hinweis + Link (URL offen).

### 7.2 Wer wir sind
Kurzporträt (bestehender Text, sprachlich aufgefrischt):

> Die IG Diessbach ist ein Verein, der parteiunabhängige Politik für die Gemeinde Diessbach betreibt. Wir setzen uns speziell ein für:
> - Erhaltung des ländlichen Charakters
> - Eigenständigkeit unserer Gemeinde
> - Förderung der Infrastruktur
> - Unterstützung des örtlichen Gewerbes und der Landwirtschaft
> - Unterstützung der Vereine
>
> Wir fördern eine offene Kommunikation, ein gutes Miteinander und die Wertschätzung der Bürgerinnen und Bürger. Ihre Meinung zu den aktuellen Geschäften interessiert uns. Mehrmals jährlich organisieren wir öffentliche Anlässe und Diskussionen.

Weitere Abschnitte:
- **Leistungsbilanz 2023–2026** („Was wir erreicht haben“) – Inhalte liefert der Vorstand (Platzhalter mit 3–5 Punkten anlegen).
- **So arbeiten wir:** Wie Kandidierende nominiert werden (Vereinsversammlung auf Vorschlag des Vorstands), Rolle des Vorstands.
- **Statuten** als PDF-Download (bestehendes PDF übernehmen: `/portrait/statuten/` → „Statuten IG Diessbach.pdf“).
- **Mitgliederbeitrag** (Betrag offen).

### 7.3 Chronik (20 Jahre IGD)
Aus dem bestehenden Archiv übernehmen (vollständig von https://www.igdiessbach.ch/archiv/ auslesen – Seite ist länger als hier aufgeführt), als Zeitstrahl darstellen. Bekannte Einträge:

| Datum | Ereignis |
|---|---|
| ca. 2007 | Gründung IGD (**Jahr bestätigen** – 20. HV im Mai 2027) |
| 20.10.2018 | Rundgang „Alte Aare“ (Studen–Dotzigen), ca. 30 Personen |
| 22.10.2018 | Gemeindewahlen 2018 – „überragendes Wahlergebnis“, 4. Gemeinderatssitz |
| 23.11.2018 | Ausserordentliche Versammlung nominiert Reto Braun als 4. Gemeinderatsmitglied |
| 2019 | Demission Gemeinderätin Regina Estermann per 31.12.2019 |
| 14.09.2019 | Stadtbesichtigung Murten |
| 04.10.2019 | Ausserordentliche Versammlung nominiert Christian Beglinger (Gemeinderat) |
| 31.12.2020 | Demission Christian Mollet (Elektrizitäts- und Wasserkommission) |
| 02.02.2021 | Adrian Zingg vom Gemeinderat als Ersatz gewählt |
| 20.07.2021 | Rücktritt Miran Salzmann als Präsident |
| 20.08.2021 | HV: Oskar Häni Präsident a.i., Michaela Rodrigues Vizepräsidentin, Iwan Walther neu im Vorstand |
| Ende 2021 | Demission Oskar Häni (Bildungskommission), Michaela Rodrigues als Ersatz gewählt |
| 15.10.2022 | Herbstwanderung „Wegbegehung in Diessbach“ mit Gemeinderat Martin Kunz, ca. 40 Personen |
| 23.08.2025 | Herbstausflug Stedtliführung Aarberg |
| 23.01.2026 | Apfelchüechli-Plausch |
| 05.09.2026 | Dorfrundgang mit der Gruppe für Dorf- und Heimatkunde |
| 25.10.2026 | Gemeindewahlen 2026: 8 von 9 IGD-Kandidierenden gewählt |
| 13.05.2027 | 20. Hauptversammlung – 20 Jahre IGD, Lancierung neue Website |

### 7.4 Köpfe
Drei Abschnitte mit Personenkarten. **Karte:** Foto, Name, Funktion(en), Ortsteil/Beruf (optional), Zitat „Darum engagiere ich mich“ (1–2 Sätze), Kontakt nur über Funktionsadresse oder Kontaktformular (keine privaten Nummern).

**Vorstand** (Stand Website, an HV 2027 ggf. ändern):

| Name | Funktion |
|---|---|
| Michaela Rodrigues-Udry | Präsidentin |
| Iwan Walther | Vizepräsident |
| Helena Burri | Sekretärin |
| José Saez | Kassier |
| Martina Wipf | Beisitzerin |
| Lorenz Gerber | Beisitzer |

**Gemeinderat – IGD-Vertretung, Amtsperiode 1.1.2027–31.12.2030** (Quelle: Wahlergebnisse Gemeinde vom 25.10.2026):

| Name | Status | Stimmen |
|---|---|---|
| Michael Burri | bisher | 521 |
| Martina Wipf | neu | 283 |
| Christian Beglinger | bisher | 265 |

Ressorts: nach Ressortverteilung durch den Gemeinderat ergänzen (offen). Gemeindepräsidium/Vize: Urnenwahl am 22.11.2026 – Ergebnis nachtragen.

**Planungs-, Bau- und Betriebskommission (PBBK):**

| Name | Status |
|---|---|
| Iwan Walther | bisher |
| Tania Zingg | neu |
| Lorenz Gerber-Cartier | neu |

**Bildungskommission:**

| Name | Status |
|---|---|
| Michaela Rodrigues-Udry | bisher |
| Ayla Ruch | neu |

**Elektrizitäts- und Wasserkommission (EWK):** Marco Tribastone (bisher), Adrian Zingg (bisher) – in stiller Wahl gewählt für 2027–2030.

Personen, die in mehreren Gremien sind, erhalten **eine** Karte mit allen Funktionen (Daten so modellieren: eine Person, mehrere Rollen).

**Daten und Bilder liegen bereit:**
- `src/data/personen.json` – alle Personen mit Rollen, Jahrgang, Beruf und Anliegen (aus den Wahlplakaten). Diese Datei als Grundlage für die Content Collection „Personen“ verwenden.
- `src/assets/personen/*.jpg` – Platzhalter-Porträts (4:5, 480 × 600 px) aus dem Status-Kit der Kampagne; Helena Burri und José Saez mit Initialen-Platzhalter. Werden später durch echte Porträts mit gleichem Dateinamen ersetzt.
- Die Anliegen pro Person (je zwei Punkte) auf der Personenkarte anzeigen, solange kein persönliches Zitat vorliegt.

Dank an Martin Kunz (bisheriger Gemeinderat, nicht wiedergewählt) im Wahl-Danke-Beitrag erwähnen – Formulierung mit Vorstand abstimmen.

### 7.5 Aktuelles
Blog mit Datum, Titel, Lead, Text, Bildern, optional PDF-Anhang. Erste Beiträge:
1. „Danke für Ihr Vertrauen – Gemeindewahlen 2026“ (Resultate, Gruppenfoto, Dank)
2. „Unsere Vertretung ab 2027“ (Link zu Köpfe)
3. „Neue Website zum 20-Jahr-Jubiläum“ (zum Launch)
Alte Beiträge 2018–2022 nicht als News, sondern in der Chronik.

### 7.6 Gemeindeversammlung (Alleinstellungsmerkmal)
Pro Versammlung eine Seite:
- Datum, Ort, Link zur Botschaft der Gemeinde
- Jedes Traktandum: **Worum geht es?** (2–3 Sätze in einfacher Sprache) · **Was kostet es?** · **Unsere Empfehlung** (Infobox: Ja / Nein / Stimmfreigabe + kurze Begründung)
- Hinweis: „Kommen Sie an die Gemeindeversammlung – jede Stimme zählt.“
- Vorlage für den Vorstand, damit dieser vor jeder Versammlung nur noch ausfüllen muss.
Nächste Versammlung: **Di. 1. Dezember 2026** (ggf. schon vor dem Relaunch als Testfall nutzen).

### 7.7 Anlässe
- Datengesteuert (Datum, Titel, Ort, Zeit, Beschreibung, Bild, Anmeldeschluss, Anmeldung ja/nein).
- Vergangene automatisch in „Rückblicke“ verschieben (mit Fotogalerie).
- **Online-Anmeldung** über Netlify Forms (Name, Anzahl Personen, E-Mail/Telefon, Bemerkung).
- **„In Kalender eintragen“** (.ics-Download pro Anlass).
- Bekannte Anlässe: Apfelchüechli-Plausch **Fr. 22. Januar 2027**, 20. Hauptversammlung **Do. 13. Mai 2027**.
- Rückblicke: Herbstausflug Aarberg 23.08.2025, Apfelchüechli-Plausch 23.01.2026, Dorfrundgang 05.09.2026.

### 7.8 Mitmachen
- **Mitglied werden:** Formular (Name, Adresse, E-Mail, Telefon, Bemerkung, Einwilligung Datenschutz). Beitrag nennen.
- **Kandidieren:** Text „Interesse an einem Amt in Kommission oder Gemeinderat?“ + Kontakt Präsidium.
- **Ihr Anliegen:** Formular mit Hinweis, wer antwortet und innert welcher Frist.

### 7.9 Kontakt
Kontaktformular + Funktionsadressen. Postadresse des Vereins (aktuell: c/o Michaela Rodrigues-Udry, Schmiedgasse 23, 3264 Diessbach – mit ihr klären, ob die Privatadresse publiziert bleiben soll).

Vorgeschlagene Funktionsadressen (beim Mailprovider der Domain einrichten, offen):
`info@igdiessbach.ch` · `praesidium@igdiessbach.ch` · `anlaesse@igdiessbach.ch`

### 7.10 Impressum & Datenschutz
- **Impressum:** Vereinsname, Adresse, verantwortliche Person, E-Mail, Hosting (Netlify).
- **Datenschutzerklärung nach revDSG:** Verantwortlicher, welche Daten (Formulare, Server-Logs), Zweck, Empfänger/Auftragsbearbeiter (Netlify, USA → Hinweis Datenbekanntgabe ins Ausland), Aufbewahrung, Rechte der Betroffenen, keine Tracking-Cookies.
- Texte als Entwurf erstellen und klar als „vom Vorstand zu prüfen“ markieren (keine Rechtsberatung).

---

## 8. Funktionen

| Funktion | Umsetzung |
|---|---|
| Formulare (Kontakt, Anliegen, Mitglied, Anmeldung) | Netlify Forms, Honeypot statt Captcha, E-Mail-Benachrichtigung an Funktionsadresse, Danke-Seite |
| Anlässe automatisch sortieren | Build-Zeit-Logik + täglicher Rebuild (Netlify Scheduled Build Hook) |
| Kalenderexport | .ics pro Anlass |
| WhatsApp | Kanal-Link + „Teilen via WhatsApp“-Button bei Beiträgen/Anlässen |
| Social Preview | Open-Graph-Bilder pro Seite (wichtig, da Links via WhatsApp geteilt werden) |
| Suche | nicht nötig |
| Tracking | keines; falls gewünscht nur cookiefreie Statistik (z.B. Netlify Analytics) |
| Pflege durch Vorstand | Git-basiertes CMS (siehe 9.2) |

---

## 9. Technik

### 9.1 Stack
- **Astro** (statische Website, schnell, einfach), Inhalte als Markdown/JSON in Content Collections.
- **Hosting:** Netlify (Deploy aus GitHub-Repo).
- **Bilder:** Astro Image (WebP/AVIF, responsive Grössen), Originale nicht im Repo aufblähen (max. 2000 px Breite).
- Keine externen Ressourcen (Fonts lokal, keine CDNs).

### 9.2 Pflege ohne IT-Kenntnisse
- Ein **Git-basiertes Web-CMS** einrichten (z.B. Decap CMS oder Sveltia CMS) mit Login für 2–3 Vorstandsmitglieder. **Aktuellen Stand prüfen**, welche Lösung mit Netlify heute empfohlen ist und ohne Zusatzkosten läuft (Netlify Identity/Git Gateway ggf. nicht mehr verfügbar).
- Sammlungen im CMS: Beiträge, Anlässe, Personen, Gemeindeversammlungen, Seiten-Texte.
- **Kurzanleitung** (1–2 Seiten, Deutsch, mit Screenshots) für den Vorstand: „Beitrag erfassen“, „Anlass erfassen“, „Person ändern“.

### 9.3 Qualität
- Mobile first, getestet auf 375 px, 768 px, 1280 px.
- Lighthouse: Performance, Accessibility, Best Practices, SEO je ≥ 95.
- Barrierefreiheit: Alt-Texte, Kontraste AA, Tastaturbedienung, sinnvolle Überschriften.
- SEO: Titel/Beschreibung pro Seite, `sitemap.xml`, `robots.txt`, `lang="de-CH"`, strukturierte Daten (Organization, Event).

### 9.4 Weiterleitungen (`netlify.toml` / `_redirects`)
```
/aktuelles/                /aktuelles/            200
/portrait/                 /wer-wir-sind/         301
/portrait/organisation/    /koepfe/               301
/portrait/statuten/        /wer-wir-sind/#statuten 301
/archiv/                   /wer-wir-sind/chronik/ 301
/g%C3%A4stebuch/           /mitmachen/            301
/about/                    /impressum/            301
/j/privacy                 /datenschutz/          301
/sitemap/                  /sitemap.xml           301
```

---

## 10. Domain & Umstellung

1. **Klären, wer die Domain igdiessbach.ch hält** (Registrar-Abfrage via whois / switch.ch-Partner) und wer Zugang zum Jimdo-Konto hat (evtl. printwebmedia.ch).
2. Prüfen, ob E-Mail-Adressen auf der Domain laufen (MX-Einträge nicht zerstören!).
3. Neue Seite zuerst unter `*.netlify.app` aufbauen und vom Vorstand abnehmen lassen.
4. Zum Launch DNS auf Netlify umstellen, HTTPS aktivieren, Weiterleitungen testen.
5. Jimdo-Abo erst nach erfolgreicher Umstellung kündigen; vorher alle PDFs und Bilder sichern.

Lorenz jeden dieser Schritte in einfachen Worten erklären und Zugangsdaten **nie** im Repo speichern.

---

## 11. Vorgehen & Zeitplan

| Phase | Inhalt | Ziel |
|---|---|---|
| 0 – Sofort (im alten Jimdo, durch Vorstand) | Danke-Beitrag Wahlen, Gästebuch löschen, Agenda bereinigen, Impressum ausfüllen | Nov. 2026 |
| 1 – Grundgerüst | Astro-Projekt, Design-System (Farben, Fira Sans, Komponenten), Layout, Navigation, Netlify-Deploy auf Test-URL | Dez. 2026 |
| 2 – Inhalte | Alle Seiten mit Texten aus Kap. 7, Personen + Porträts aus Kampagnenordner, Chronik aus Archiv | Jan. 2027 |
| 3 – Funktionen | Formulare, Anlässe-Logik, .ics, OG-Bilder, CMS + Logins | Feb. 2027 |
| 4 – Review | Vorstand prüft, Texte Leistungsbilanz/Zitate einholen, rechtliche Texte prüfen | März 2027 |
| 5 – Launch-Vorbereitung | Domain klären, DNS, Redirects, Tests, Anleitung Vorstand | April 2027 |
| 6 – Go-live | Präsentation an der 20. HV | **Do. 13. Mai 2027** |

---

## 12. Offene Punkte (beim Auftraggeber/Vorstand abholen)

1. Ordner mit Kampagnenbildern (Porträts, Gruppenfoto) und Logo-Vektordatei.
2. Domain-Inhaber, Jimdo-Zugang, bestehende E-Mail-Adressen auf der Domain.
3. Gründungsjahr der IGD und ggf. weitere Chronik-Ereignisse.
4. Ressortverteilung Gemeinderat 2027–2030 und Ergebnis Gemeindepräsidium (22.11.2026).
5. ~~IGD-Vertretung EWK~~ – erledigt: Tribastone, Zingg (stille Wahl).
6. Elf Personen auf dem Kampagnenfoto: vollständige Liste mit Funktionen abgleichen.
7. ~~Einwilligung Personen~~ – erledigt: liegt für alle vor.
8. Zitate „Darum engagiere ich mich“ je Person.
9. Leistungsbilanz 2023–2026 (3–5 Punkte).
10. Mitgliederbeitrag und Anzahl Mitglieder (optional für „Wir sind X Mitglieder“).
11. WhatsApp-Kanal: existiert er / soll er eröffnet werden?
12. Erlaubnis zur Verwendung des Gemeindewappens.
13. Wer im Vorstand pflegt die Seite künftig (2–3 Personen für CMS-Login)?
14. Neues hochaufgelöstes Dorf-/Landschaftsfoto für den Hero.

---

## 13. Abnahmekriterien

- [ ] Seite funktioniert einwandfrei am Handy (kein horizontales Scrollen, Menü bedienbar)
- [ ] Alle Personen mit Foto, Funktion und Zitat auf „Köpfe“
- [ ] Alle Formulare senden an die richtige Adresse, Danke-Seite erscheint
- [ ] Vergangene Anlässe verschwinden automatisch aus der Agenda
- [ ] Vorstand kann ohne Hilfe einen Beitrag und einen Anlass erfassen
- [ ] Impressum und Datenschutz vorhanden und vom Vorstand freigegeben
- [ ] Lighthouse ≥ 95 in allen Kategorien (mobil)
- [ ] Alte URLs leiten korrekt weiter
- [ ] Geteilte Links zeigen in WhatsApp ein ansprechendes Vorschaubild
- [ ] Keine privaten Telefonnummern/Adressen ohne Einwilligung

---

## Quellen der Analyse
- Bestehende Website: https://www.igdiessbach.ch/ (inkl. /portrait/organisation/, /archiv/, /kontakt/, /gästebuch/, /about/)
- Einwohnergemeinde Diessbach: https://www.diessbach.ch/ (Farben, Behörden)
- Wahlergebnisse 25.10.2026: https://www.diessbach.ch/de/online-schalter/mitteilungen/meldungen/gesamterneuerungswahlen-2026-ergebinsse.php
- Kampagnensujets 2026 (auf der bestehenden Startseite)

---

## 14. Nachträge und Entscheide während der Umsetzung

| Datum | Entscheid |
|---|---|
| 1.11.2026 | **Hauptfarbe Blau statt Rot** (ersetzt Kap. 5.2). Blau aus dem Logo (`#2541C4`) ist die Vereinsfarbe und grenzt die IGD von der SP ab, die in der Schweiz traditionell rot auftritt. Rot war nur die Farbe der Wahlkampagne 2026 (abgeleitet vom Gemeindewappen). Anthrazit und Weiss bleiben. |
| 1.11.2026 | Gründung laut Statuten: **Gründungsversammlung 31.1.2006**. Das Jubiläumsthema (20 Jahre im Jahr 2026 vs. HV 2027) ist vorerst pendent. |
| 1.11.2026 | Mitgliederbeitrag **CHF 20.– pro Jahr**. Die Postadresse c/o Michaela Rodrigues-Udry darf publiziert werden. |
| 1.11.2026 | Formulare gehen bis zum Go-live an Lorenz Gerber (Adresse nur in den Netlify-Einstellungen, nicht im Code). CMS-Pflege: Lorenz, Michaela, Helena. |
| 1.11.2026 | Netlify bleibt für den Prototyp im Gratisabo (keine weiteren Team-Mitglieder). |
| 1.11.2026 | **Köpfe: jedes Gremium vollständig** (präzisiert Kap. 7.4). Wer in mehreren Gremien ist, erscheint in jedem Abschnitt; die Karte zeigt jeweils alle Funktionen, die des Abschnitts zuoberst. Kommissionen mit eigenem Untertitel und Sitzzahl. Behörden: «bisher» vor «neu». |
