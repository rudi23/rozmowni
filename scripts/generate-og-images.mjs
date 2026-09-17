// Renders the 1200×630 social preview images that getMetadata.js points at:
// public/images/og-default.jpg (every page) and og-test.jpg (the placement
// test). Run `node scripts/generate-og-images.mjs` after changing the copy or
// the photos and commit the JPEGs. Text is set in the machine's sans-serif
// (the brand webfonts are not installed locally), so regenerate on one machine
// rather than in CI to keep the output stable.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'public', 'images');

const WIDTH = 1200;
const HEIGHT = 630;
const PANEL = 660; // the navy text panel; the photo fills the rest
const MARGIN = 72;
const NAVY = '#07294d';
const ORANGE = '#ff6b35';
const CREAM = '#ffefd5';
const FONT = "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const escapeXml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function overlaySvg({ headline, sub, pill }) {
  const headlineTop = 250;
  const headlineStep = 72;
  const subTop = headlineTop + headline.length * headlineStep + 4;
  const pillTop = HEIGHT - 150;
  const pillWidth = Math.round(pill.length * 13.5 + 56);

  const headlineText = headline
    .map(
      (line, index) =>
        `<text x="${MARGIN}" y="${headlineTop + index * headlineStep}" font-family="${FONT}" font-size="60" font-weight="700" fill="#ffffff">${escapeXml(line)}</text>`,
    )
    .join('');
  const subText = sub
    .map(
      (line, index) =>
        `<text x="${MARGIN}" y="${subTop + index * 38}" font-family="${FONT}" font-size="26" fill="${CREAM}">${escapeXml(line)}</text>`,
    )
    .join('');

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <rect width="${PANEL}" height="${HEIGHT}" fill="${NAVY}"/>
      <rect x="${MARGIN}" y="64" width="300" height="88" rx="16" fill="#ffffff"/>
      ${headlineText}
      ${subText}
      <rect x="${MARGIN}" y="${pillTop}" width="${pillWidth}" height="56" rx="28" fill="${ORANGE}"/>
      <text x="${MARGIN + 28}" y="${pillTop + 37}" font-family="${FONT}" font-size="24" font-weight="700" fill="#ffffff">${escapeXml(pill)}</text>
    </svg>`,
  );
}

async function render({ file, photo, ...copy }) {
  const logo = await sharp(path.join(imagesDir, 'logo-rozmowni.png'))
    .resize({ width: 240 })
    .toBuffer();
  const picture = await sharp(path.join(imagesDir, photo))
    .resize(WIDTH - PANEL, HEIGHT, { fit: 'cover', position: 'attention' })
    .toBuffer();

  const info = await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 3, background: NAVY },
  })
    .composite([
      { input: picture, left: PANEL, top: 0 },
      { input: overlaySvg(copy), left: 0, top: 0 },
      { input: logo, left: MARGIN + 30, top: 64 + 14 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(imagesDir, file));

  console.log(
    `${file}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} kB`,
  );
}

async function main() {
  await render({
    file: 'og-default.jpg',
    photo: 'main.jpg',
    headline: ['Mów swobodnie', 'po angielsku'],
    sub: ['Kursy angielskiego online', '1:1 i w małych grupach'],
    pill: 'Bezpłatny test poziomujący w 10 minut',
  });
  await render({
    file: 'og-test.jpg',
    photo: 'conversations.jpg',
    headline: ['Sprawdź poziom', 'angielskiego'],
    sub: [
      'Bezpłatny test poziomujący online',
      '25 pytań · 10 minut · wynik A1–C2 od razu',
    ],
    pill: 'Lekcja próbna i e-book w pakiecie',
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
