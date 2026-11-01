import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Person = CollectionEntry<'personen'>;
export type Anlass = CollectionEntry<'anlaesse'>;

/** Porträts aus src/assets/personen/ – Dateiname = Feld «foto» in personen.json */
const portraets = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/personen/*.{jpg,jpeg,png,webp}',
  { eager: true },
);
export function portraet(foto: string): ImageMetadata | undefined {
  const datei = foto.split('/').pop();
  const treffer = Object.entries(portraets).find(([pfad]) => pfad.endsWith(`/${datei}`));
  return treffer?.[1].default;
}

export const GREMIEN = {
  Vorstand: { titel: 'Vorstand', lang: 'Vorstand der IG Diessbach' },
  Gemeinderat: { titel: 'Gemeinderat', lang: 'Gemeinderat' },
  PBBK: { titel: 'PBBK', lang: 'Planungs-, Bau- und Betriebskommission' },
  Bildungskommission: { titel: 'Bildungskommission', lang: 'Bildungskommission' },
  EWK: { titel: 'EWK', lang: 'Elektrizitäts- und Wasserkommission' },
} as const;

export async function aktivePersonen() {
  return (await getCollection('personen'))
    .filter((p) => p.data.aktiv !== false)
    .sort((a, b) => a.data.reihenfolge - b.data.reihenfolge); // Reihenfolge wie in personen.json
}

/** Heutiges Datum (Schweizer Zeit) – Grundlage für «kommend» vs. «vergangen» */
function heuteZuerich(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Zurich' }).format(new Date());
}
const tag = (d: Date) => d.toISOString().slice(0, 10);

export async function anlaesse() {
  const alle = await getCollection('anlaesse');
  const heute = heuteZuerich();
  const kommend = alle
    .filter((a) => tag(a.data.datum) >= heute)
    .sort((a, b) => +a.data.datum - +b.data.datum);
  const vergangen = alle
    .filter((a) => tag(a.data.datum) < heute)
    .sort((a, b) => +b.data.datum - +a.data.datum);
  return { kommend, vergangen };
}

export async function beitraege() {
  return (await getCollection('aktuelles', (b) => import.meta.env.DEV || !b.data.entwurf)).sort(
    (a, b) => +b.data.datum - +a.data.datum,
  );
}

export async function versammlungen() {
  const alle = (await getCollection('gemeindeversammlungen')).sort(
    (a, b) => +a.data.datum - +b.data.datum,
  );
  const heute = heuteZuerich();
  return {
    alle,
    naechste: alle.find((v) => tag(v.data.datum) >= heute),
  };
}
