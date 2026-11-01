// Erzeugt public/og-standard.png (1200×630), das Vorschaubild beim Teilen via WhatsApp.
// Aufruf (nach «npm run build» und mit laufendem «npm run preview»): node scripts/og-bild.cjs
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('http://localhost:4321/og-vorlage/', { waitUntil: 'networkidle' });
  await p.screenshot({ path: 'public/og-standard.png' });
  await b.close();
  console.log('public/og-standard.png erstellt');
})();
