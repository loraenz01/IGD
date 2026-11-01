// Kopiert das Pflege-Programm (Sveltia CMS) aus node_modules nach public/admin/.
// Läuft automatisch vor «npm run dev» und «npm run build».
import { copyFileSync } from 'node:fs';
copyFileSync('node_modules/@sveltia/cms/dist/sveltia-cms.js', 'public/admin/sveltia-cms.js');
