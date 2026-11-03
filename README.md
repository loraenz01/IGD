# Website IG Diessbach (igdiessbach.ch)

Neue Website der Interessengemeinschaft Diessbach, gebaut mit [Astro](https://astro.build) und gehostet auf [Netlify](https://www.netlify.com).
Grundlage: [`docs/IGD-Website-Relaunch-Briefing.md`](docs/IGD-Website-Relaunch-Briefing.md).

## Stand

| Phase | Inhalt | Status |
|---|---|---|
| 1 – Grundgerüst | Astro-Projekt, Design-System, Layout, Navigation, Netlify-Konfiguration | ✅ erledigt |
| 2 – Inhalte | Alle Seiten mit Texten, Chronik aus Archiv, Impressum/Datenschutz | 🟡 grösstenteils erledigt |
| 3 – Funktionen | Formulare, Anmeldung, .ics, CMS + Logins, täglicher Rebuild | ✅ erledigt und eingerichtet |
| 4–6 | Review, Launch-Vorbereitung, Go-live an der 20. HV (13.5.2027) | offen |

Alles, was noch fehlt, ist auf der Website als orange gestrichelter Kasten **«Platzhalter»** markiert.

## Wo ist was?

| Was | Wo |
|---|---|
| Personen (Namen, Rollen, Anliegen, Zitate) | `src/data/personen.json` |
| Porträts (4:5, gleicher Dateiname wie in personen.json) | `src/assets/personen/` |
| Gruppenfoto, Kampagnenbilder | `src/assets/kampagne/` |
| Anlässe (eine Datei pro Anlass) | `src/content/anlaesse/` |
| Beiträge «Aktuelles» | `src/content/aktuelles/` |
| Gemeindeversammlungen mit Empfehlungen | `src/content/gemeindeversammlungen/` |
| Chronik | `src/data/chronik.json` |
| Statuten und weitere PDFs | `public/dokumente/` |
| Fotos der Anlässe | `src/assets/anlaesse/` |
| Vereinsadresse, E-Mail, WhatsApp-Link, Menü | `src/lib/site.ts` |
| Farben, Schrift, Grundstil | `src/styles/global.css` |
| Logo (SVG, nachgezeichnet) | `src/components/Logo.astro` |
| Logo-Original (JPG) | `design/logo/` |
| Weiterleitungen alte Jimdo-Adressen | `netlify.toml` |
| Formulare (Kontakt, Anliegen, Mitglied, Anmeldung) | `src/components/Formular.astro`, Danke-Seite `src/pages/danke.astro` |
| Kalender-Dateien (.ics) | `src/pages/anlaesse/[slug].ics.ts` |
| Pflege-Programm (Sveltia CMS) | `public/admin/config.yml`, aufrufbar unter `/admin/` |
| Täglicher Rebuild | `.github/workflows/taeglicher-rebuild.yml` |
| Kurzanleitung Pflege-Programm (für den Vorstand) | `docs/anleitung-pflege/` (Markdown und PDF) |

Vergangene Anlässe wandern automatisch in die «Rückblicke». Die Seite ist bis zum Go-live für Suchmaschinen gesperrt. Sie wird erst freigegeben, sobald sie unter `igdiessbach.ch` läuft.

## Für Entwickler

```bash
npm install
npm run dev       # lokale Vorschau auf http://localhost:4321
npm run build     # fertige Website in dist/
```

Hilfsskripte:
- `node scripts/favicons.mjs`: erzeugt die Favicons aus dem Logo-Zeichen
- `node scripts/og-bild.cjs`: erzeugt das WhatsApp-Vorschaubild `public/og-standard.png` (vorher `npm run build && npm run preview` starten)

## Einrichtung (einmalig, durch Lorenz) – ✅ erledigt am 1.11.2026

1. **Formulare:** Netlify → Projekt → *Forms* → Formularerkennung aktivieren; unter *Form notifications* E-Mail-Benachrichtigung an die gewünschte Adresse.
2. **Täglicher Rebuild:** Netlify → *Build & deploy* → *Build hooks* → Hook erstellen; URL in GitHub als Secret `NETLIFY_BUILD_HOOK` speichern.
3. **Pflege-Programm:** GitHub-OAuth-App erstellen (Redirect URI `https://api.netlify.com/auth/done`, «Expire user access tokens» aus), in Netlify unter *Access & security → OAuth* als GitHub-Provider eintragen. Pflegende brauchen ein GitHub-Konto mit Schreibrecht auf das Repo.

## To-do (offene Punkte)

- [ ] WhatsApp-Kanal eröffnen, Link in `src/lib/site.ts` eintragen
- [ ] Logo als Vektordatei (liefert Lorenz) – bis dahin nachgezeichnetes SVG
- [ ] Zitate «Darum engagiere ich mich» je Person
- [ ] Leistungsbilanz 2023–2026 (3–5 Punkte)
- [ ] Ressorts Gemeinderat 2027–2030 und Ergebnis Gemeindepräsidium (22.11.2026)
- [ ] Gemeindewappen: Erlaubnis der Gemeinde
- [ ] Hochaufgelöstes Dorffoto für die Startseite
- [ ] Zeit/Ort Apfelchüechli-Plausch 22.1.2027 und 20. HV 13.5.2027, Traktanden GV 1.12.2026
- [ ] Impressum und Datenschutz vom Vorstand prüfen lassen
- [ ] Funktionsadressen info@ / praesidium@ / anlaesse@ einrichten
- [ ] Antwortfrist bei «Ihr Anliegen» (Vorschlag: innert zwei Wochen) bestätigen
- [x] Jimdo: Empfänger des alten Kontaktformulars auf info@igdiessbach.ch umgestellt (3.11.2026)
- [ ] Jimdo: Vertragspartner auf den Verein geändert – **schriftliche Bestätigung beider Seiten ausstehend**
- [ ] Jimdo: prüfen, wer **Admin-C** der Domain ist (an diese E-Mail schickt Jimdo den AuthInfo-Code!) und auf eine Vereinsadresse ändern
- [x] Jimdo: E-Mail geprüft (3.11.2026) – keine Postfächer, keine Weiterleitungen vorhanden. Neu eingerichtet und getestet: Weiterleitung **info@igdiessbach.ch → Lorenz**
- [x] Jimdo: Kündigung geprüft – möglich «zum Ende der Vertragslaufzeit 09.07.2027». **Jetzt noch nicht kündigen, keine Zahlungsmethode hinterlegen.**
- [ ] April 2027: Anbieter für Domain und E-Mail wählen (z.B. Infomaniak/Hostpoint), Funktionsadressen einrichten – **Weiterleitung info@ identisch übernehmen**
- [ ] April 2027: Jimdo kündigen per 09.07.2027 **mit Option «Domain zu anderem Anbieter transferieren»** (NICHT «Domain löschen» – ist vorausgewählt!). AuthInfo-Code kommt an Admin-C. Domain beim neuen Anbieter übernehmen, DNS dort zuerst weiter auf Jimdo zeigen lassen, Weiterleitung info@ vorher anlegen
- [ ] 13.5.2027: DNS beim neuen Anbieter auf Netlify umstellen (Go-live); Jimdo-Seite läuft bis 9.7.2027 aus
- [ ] Vor dem Go-live: GitHub-Projekt in ein Vereinskonto verschieben
- [ ] Beim Go-live: Michaela und Helena für das Pflege-Programm freischalten (GitHub-Konto erstellen, als Collaborator einladen, Einladung annehmen)
- [ ] Beim Go-live: E-Mail-Benachrichtigung der Formulare von Lorenz auf die Funktionsadressen umstellen
- [ ] Beim Go-live: in der GitHub-OAuth-App «IG Diessbach Pflege» die Homepage-URL auf igdiessbach.ch ändern
