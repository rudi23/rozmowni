// Writes public/sitemap.xml from routeMap, so a route commented out in
// src/routes/index.js drops out of the sitemap by itself. Runs as `prebuild`
// and `predev` (package.json). <lastmod> is the last commit that touched the
// page file or one of the files it imports directly; CI therefore checks out
// the full history (fetch-depth: 0), otherwise every page would report the
// date of the latest commit.
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeMap, routeNames } from '../src/routes/index.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = 'https://rozmowni.pl';

// noindex pages stay out of the sitemap.
const excluded = new Set([routeNames.PRIVACY_POLICY]);

const pageFiles = {
  [routeNames.HOME]: 'src/pages/index.js',
  [routeNames.ABOUT_US]: 'src/pages/o-nas/index.js',
  [routeNames.PRICING]: 'src/pages/cennik/index.js',
  [routeNames.INDIVIDUAL_COURSE]: 'src/pages/kursy/indywidualne.js',
  [routeNames.GROUP_COURSE]: 'src/pages/kursy/grupowe.js',
  [routeNames.HOLIDAY_COURSE]: 'src/pages/kursy/intensywne-kursy-wakacyjne.js',
  [routeNames.EXAM_8_COURSE]: 'src/pages/kursy/egzamin-8-klasisty.js',
  [routeNames.MATURA_EXAM_COURSE]: 'src/pages/kursy/egzamin-maturalny.js',
  [routeNames.CONTACT]: 'src/pages/kontakt/index.js',
  [routeNames.TEST]: 'src/pages/test-poziomujacy.js',
  [routeNames.PRIVACY_POLICY]: 'src/pages/polityka-prywatnosci/index.js',
};

function isFile(candidate) {
  try {
    return statSync(candidate).isFile();
  } catch {
    return false;
  }
}

function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith('.')) {
    return null;
  }
  const base = path.resolve(path.dirname(fromFile), specifier);

  return (
    [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js')].find(
      isFile,
    ) ?? null
  );
}

function directDependencies(file) {
  const source = readFileSync(file, 'utf8');

  return [...source.matchAll(/from\s+'([^']+)'/g)]
    .map((match) => resolveImport(file, match[1]))
    .filter(Boolean);
}

function lastCommitDate(files) {
  try {
    const output = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...files],
      { cwd: root, encoding: 'utf8' },
    ).trim();

    return output || null;
  } catch {
    return null;
  }
}

function main() {
  const buildTime = new Date().toISOString();
  const entries = Object.entries(routeMap)
    .filter(([routeName]) => !excluded.has(routeName))
    .map(([routeName, route]) => {
      const page = pageFiles[routeName];
      if (!page) {
        throw new Error(
          `generate-sitemap: no page file registered for ${routeName}`,
        );
      }
      const file = path.join(root, page);
      const lastmod =
        lastCommitDate([file, ...directDependencies(file)]) ?? buildTime;

      return `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
  writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);
  console.log(`generate-sitemap: ${entries.length} URLs -> public/sitemap.xml`);
}

main();
