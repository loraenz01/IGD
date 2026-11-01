// Zentrale Angaben zur Website. Hier ändern, wenn sich etwas ändert.

export const SITE = {
  name: 'IG Diessbach',
  langname: 'Interessengemeinschaft Diessbach',
  claim: 'Parteiunabhängig für unser Dorf.',
  beschreibung:
    'Die IG Diessbach betreibt seit 20 Jahren parteiunabhängige Politik für die Gemeinde Diessbach bei Büren: Köpfe, Anlässe und Empfehlungen zur Gemeindeversammlung.',
  url: 'https://www.igdiessbach.ch',
  email: 'info@igdiessbach.ch', // offen: Funktionsadresse muss noch eingerichtet werden
  adresse: {
    zusatz: 'c/o Michaela Rodrigues-Udry', // offen: Publikation der Privatadresse mit ihr klären
    strasse: 'Schmiedgasse 23',
    ort: '3264 Diessbach',
  },
  whatsappKanal: null as string | null, // offen: URL des WhatsApp-Kanals
};

export const NAV = [
  { href: '/wer-wir-sind/', label: 'Wer wir sind' },
  { href: '/koepfe/', label: 'Köpfe' },
  { href: '/aktuelles/', label: 'Aktuelles' },
  { href: '/gemeindeversammlung/', label: 'Gemeindeversammlung' },
  { href: '/anlaesse/', label: 'Anlässe' },
  { href: '/mitmachen/', label: 'Mitmachen' },
];

/**
 * Die Seite darf erst nach dem Go-live von Suchmaschinen erfasst werden.
 * Netlify setzt beim Build die Variable URL (z.B. https://igdiessbach.netlify.app).
 */
export const IST_LIVE = (process.env.URL ?? '').includes('igdiessbach.ch');

const fmtLang = new Intl.DateTimeFormat('de-CH', {
  weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Zurich',
});
const fmtKurz = new Intl.DateTimeFormat('de-CH', {
  day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Zurich',
});

/** «Fr., 22. Januar 2027» */
export const datumLang = (d: Date) => fmtLang.format(d);
/** «22.01.2027» */
export const datumKurz = (d: Date) => fmtKurz.format(d);
