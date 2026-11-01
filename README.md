# Website IG Diessbach (igdiessbach.ch)

Neue Website der Interessengemeinschaft Diessbach, gebaut mit [Astro](https://astro.build) und gehostet auf [Netlify](https://www.netlify.com).
Grundlage: [`docs/IGD-Website-Relaunch-Briefing.md`](docs/IGD-Website-Relaunch-Briefing.md).

## Stand

| Phase | Inhalt | Status |
|---|---|---|
| 1 – Grundgerüst | Astro-Projekt, Design-System, Layout, Navigation, Netlify-Konfiguration | ✅ erledigt |
| 2 – Inhalte | Alle Seiten mit Texten, Chronik aus Archiv, Impressum/Datenschutz | offen |
| 3 – Funktionen | Formulare, Anmeldung, .ics, CMS + Logins, täglicher Rebuild | offen |
| 4–6 | Review, Launch-Vorbereitung, Go-live an der 20. HV (13.5.2027) | offen |

Alles, was noch fehlt, ist auf der Website als roter, gestrichelter Kasten **«Platzhalter»** markiert.

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
| Vereinsadresse, E-Mail, WhatsApp-Link, Menü | `src/lib/site.ts` |
| Farben, Schrift, Grundstil | `src/styles/global.css` |
| Logo (SVG, nachgezeichnet) | `src/components/Logo.astro` |
| Logo-Original (JPG) | `design/logo/` |
| Weiterleitungen alte Jimdo-Adressen | `netlify.toml` |

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
