import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { BASIS_URL } from '../../lib/site';

// «In Kalender eintragen»: eine .ics-Datei pro Anlass (Briefing 7.7)
export const getStaticPaths = (async () =>
  (await getCollection('anlaesse')).map((a) => ({ params: { slug: a.id }, props: { anlass: a } }))) satisfies GetStaticPaths;

const tz = 'Europe/Zurich';
const VTIMEZONE = [
  'BEGIN:VTIMEZONE', `TZID:${tz}`,
  'BEGIN:DAYLIGHT', 'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0200', 'TZNAME:CEST', 'DTSTART:19700329T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'END:DAYLIGHT',
  'BEGIN:STANDARD', 'TZOFFSETFROM:+0200', 'TZOFFSETTO:+0100', 'TZNAME:CET', 'DTSTART:19701025T030000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'END:STANDARD',
  'END:VTIMEZONE',
];

const esc = (t: string) => t.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
/** Lange Zeilen falten (RFC 5545: max. 75 Bytes, Umlaute zählen doppelt) */
const falte = (zeile: string) => zeile.match(/.{1,60}/gu)?.join('\r\n ') ?? zeile;
const tag = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, '');

export const GET: APIRoute = ({ props }) => {
  const { anlass } = props as { anlass: CollectionEntry<'anlaesse'> };
  const a = anlass.data;
  const url = new URL(`/anlaesse/${anlass.id}/`, BASIS_URL).href;
  let zeit: string[];
  if (a.zeit_von) {
    const von = a.zeit_von.replace(':', '');
    const [h, m] = a.zeit_von.split(':').map(Number);
    const bis = a.zeit_bis
      ? a.zeit_bis.replace(':', '')
      : `${String(Math.min(h + 2, 23)).padStart(2, '0')}${String(m).padStart(2, '0')}`; // ohne Endzeit: 2 Stunden
    zeit = [`DTSTART;TZID=${tz}:${tag(a.datum)}T${von}00`, `DTEND;TZID=${tz}:${tag(a.datum)}T${bis}00`];
  } else {
    const folgetag = new Date(a.datum.getTime() + 86_400_000);
    zeit = [`DTSTART;VALUE=DATE:${tag(a.datum)}`, `DTEND;VALUE=DATE:${tag(folgetag)}`];
  }
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//IG Diessbach//Website//DE', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    ...(a.zeit_von ? VTIMEZONE : []),
    'BEGIN:VEVENT',
    `UID:${anlass.id}@igdiessbach.ch`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    ...zeit,
    `SUMMARY:${esc(a.titel)} (IG Diessbach)`,
    `LOCATION:${esc(a.ort)}`,
    `DESCRIPTION:${esc(`${a.kurz}\n\n${url}`)}`,
    `URL:${url}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].map(falte).join('\r\n');
  return new Response(ics + '\r\n', {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': `attachment; filename="${anlass.id}.ics"` },
  });
};
