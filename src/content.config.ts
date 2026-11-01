import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

/** Personen: eine Person, mehrere Rollen (Briefing 7.4) */
const personen = defineCollection({
  loader: file('src/data/personen.json', {
    parser: (text) =>
      JSON.parse(text).personen.map((p: { slug: string }, i: number) => ({ id: p.slug, reihenfolge: i, ...p })),
  }),
  schema: z.object({
    slug: z.string(),
    reihenfolge: z.number(),
    name: z.string(),
    foto: z.string(),
    foto_status: z.string().optional(),
    jahrgang: z.number().nullable().optional(),
    kinder: z.number().nullable().optional(),
    beruf: z.string().nullable().optional(),
    rollen: z.array(
      z.object({
        gremium: z.enum(['Vorstand', 'Gemeinderat', 'PBBK', 'Bildungskommission', 'EWK']),
        funktion: z.string(),
        status: z.enum(['bisher', 'neu']).optional(),
        ressort: z.string().nullable().optional(),
        wahl: z.string().optional(),
        bemerkung: z.string().optional(),
      }),
    ),
    anliegen: z.array(z.string()).default([]),
    zitat: z.string().nullable().optional(),
    aktiv: z.boolean().default(true),
    bemerkung: z.string().optional(),
  }),
});

/** Beiträge (Aktuelles) */
const aktuelles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuelles' }),
  schema: ({ image }) =>
    z.object({
      titel: z.string(),
      datum: z.coerce.date(),
      lead: z.string(),
      bild: image().optional(),
      bild_alt: z.string().optional(),
      pdf: z.string().optional(),
      entwurf: z.boolean().default(false),
    }),
});

/** Anlässe – vergangene wandern automatisch in die Rückblicke */
const anlaesse = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/anlaesse' }),
  schema: ({ image }) =>
    z.object({
      titel: z.string(),
      datum: z.coerce.date(),
      zeit_von: z.string().optional(), // «19:00»
      zeit_bis: z.string().optional(),
      ort: z.string(),
      kurz: z.string(),
      bild: image().optional(),
      bild_alt: z.string().optional(),
      anmeldung: z.boolean().default(false),
      anmeldeschluss: z.coerce.date().optional(),
      galerie: z.array(image()).default([]),
    }),
});

/** Gemeindeversammlungen mit Empfehlungen pro Traktandum */
const gemeindeversammlungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gemeindeversammlungen' }),
  schema: z.object({
    titel: z.string(),
    datum: z.coerce.date(),
    zeit: z.string().optional(),
    ort: z.string(),
    botschaft_url: z.url().optional(),
    traktanden: z
      .array(
        z.object({
          titel: z.string(),
          worum: z.string(),
          kosten: z.string().optional(),
          empfehlung: z.enum(['Ja', 'Nein', 'Stimmfreigabe', 'Kenntnisnahme']),
          begruendung: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { personen, aktuelles, anlaesse, gemeindeversammlungen };
