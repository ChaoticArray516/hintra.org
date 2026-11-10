import path from 'node:path';
import { attr, distRoot, expectedRoutes, jsonLd, origin, result, routeFromFile, tags } from './helpers.mjs';

const expectedAlternates = [
  ['en', `${origin}/krillion-unlimited/`],
  ['es', `${origin}/es/krillion-unlimited/`],
  ['pt', `${origin}/pt/krillion-unlimited/`],
  ['x-default', `${origin}/krillion-unlimited/`],
];
const unlimitedRoutes = new Set(['/krillion-unlimited/', '/es/krillion-unlimited/', '/pt/krillion-unlimited/']);

async function optionalRead(context, file) {
  try {
    return await context.read(file);
  } catch {
    return null;
  }
}

export async function checkRender(context) {
  const results = [];
  const actualRoutes = Object.keys(context.pages).sort();
  const expectedSorted = [...expectedRoutes].sort();
  results.push(result('R-01', JSON.stringify(actualRoutes) === JSON.stringify(expectedSorted), `index routes: ${actualRoutes.join(', ') || 'none'}`));

  const canonicalFailures = expectedRoutes.filter((route) => {
    const html = context.pages[route];
    if (!html) return true;
    const canonical = tags(html, 'link').filter((tag) => attr(tag, 'rel') === 'canonical');
    return canonical.length !== 1 || attr(canonical[0], 'href') !== origin + route;
  });
  results.push(result('R-02', canonicalFailures.length === 0, canonicalFailures.length ? `canonical failures: ${canonicalFailures.join(', ')}` : `${expectedRoutes.length} self-referencing canonical URLs`));

  const langFailures = expectedRoutes.filter((route) => {
    const expected = route.startsWith('/es/') ? 'es' : route.startsWith('/pt/') ? 'pt' : 'en';
    const htmlTag = context.pages[route] && tags(context.pages[route], 'html')[0];
    return !htmlTag || attr(htmlTag, 'lang') !== expected;
  });
  results.push(result('R-03', langFailures.length === 0, langFailures.length ? `lang failures: ${langFailures.join(', ')}` : 'html lang matches every route'));

  const alternateFailures = expectedRoutes.filter((route) => {
    const html = context.pages[route];
    if (!html) return true;
    const actual = tags(html, 'link')
      .filter((tag) => attr(tag, 'rel') === 'alternate')
      .map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]);
    const expected = unlimitedRoutes.has(route) ? expectedAlternates : [];
    return JSON.stringify(actual) !== JSON.stringify(expected);
  });
  results.push(result('R-04', alternateFailures.length === 0, alternateFailures.length ? `hreflang failures: ${alternateFailures.join(', ')}` : 'unlimited alternate sets close; other pages have none'));

  const sitemap = await optionalRead(context, 'sitemap-0.xml');
  const sitemapIndex = await optionalRead(context, 'sitemap-index.xml');
  const robots = await optionalRead(context, 'robots.txt');
  const locations = [...(sitemap ?? '').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedLocations = expectedRoutes.map((route) => origin + route);
  const sitemapPass = sitemap !== null && sitemapIndex !== null && robots?.includes(`Sitemap: ${origin}/sitemap-index.xml`)
    && JSON.stringify([...locations].sort()) === JSON.stringify([...expectedLocations].sort())
    && !sitemap.includes('<lastmod>') && sitemapIndex.includes(`${origin}/sitemap-0.xml`);
  results.push(result('R-05', sitemapPass, `sitemap URLs=${locations.length}; index=${sitemapIndex !== null}; robots=${robots !== null}; lastmod=${sitemap?.includes('<lastmod>') ?? false}`));

  const scriptFailures = [];
  for (const [route, html] of Object.entries(context.pages)) {
    const scripts = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? [];
    if (scripts.length !== 1 || scripts.some((script) => attr(tags(script, 'script')[0], 'type') !== 'application/ld+json')) scriptFailures.push(route);
    if (/astro-(?:script|island)|data-astro-|client:(?:load|idle|visible|media|only)/i.test(html)) scriptFailures.push(`${route} hydration`);
  }
  const notFound = await optionalRead(context, '404.html');
  if (notFound && /<script\b(?![^>]*type="application\/ld\+json")/i.test(notFound)) scriptFailures.push('404.html');
  results.push(result('R-06', scriptFailures.length === 0, scriptFailures.length ? scriptFailures.join(', ') : 'one JSON-LD per indexable page; no executable scripts or hydration'));

  const schemaFailures = [];
  for (const route of expectedRoutes) {
    try {
      const documents = jsonLd(context.pages[route]);
      if (documents.length !== 1 || !Array.isArray(documents[0]['@graph'])) throw new Error('expected one @graph');
      const graph = documents[0]['@graph'];
      const ids = graph.map((node) => node['@id']).filter(Boolean);
      if (new Set(ids).size !== ids.length) throw new Error('duplicate @id');
      if (/"(?:aggregateRating|ratingValue|reviewCount|price)"|"(?:HowTo|SearchAction|Offer)"/.test(JSON.stringify(graph))) throw new Error('forbidden Schema field');
      if (route !== '/' && graph.some((node) => ['#org', '#site'].some((suffix) => node['@id']?.endsWith(suffix)) && node['@type'])) throw new Error('site entity redefined');
    } catch (error) {
      schemaFailures.push(`${route}: ${error.message}`);
    }
  }
  results.push(result('R-07', schemaFailures.length === 0, schemaFailures.length ? schemaFailures.join(' | ') : 'all JSON-LD parses with unique page IDs and no redlines'));

  const linkFailures = [];
  for (const [route, html] of Object.entries(context.pages)) {
    for (const anchor of tags(html, 'a')) {
      const href = attr(anchor, 'href');
      if (!href || href.startsWith('#')) {
        linkFailures.push(`${route} placeholder/empty link`);
        continue;
      }
      const url = new URL(href, origin);
      if (url.origin === origin && !expectedRoutes.includes(url.pathname)) linkFailures.push(`${route} -> ${url.pathname}`);
    }
  }
  results.push(result('R-08', linkFailures.length === 0, linkFailures.length ? linkFailures.join(', ') : 'every internal anchor resolves to a real indexable route'));

  const forbiddenMarkup = context.htmlFiles.filter((file) => {
    const html = routeFromFile(file) ? context.pages[routeFromFile(file)] : null;
    return html && /<iframe\b|<meta\b[^>]*http-equiv="refresh"|\bon[a-z]+\s*=|document\.title|>\s*Loading\s*</i.test(html);
  });
  results.push(result('R-09', forbiddenMarkup.length === 0, forbiddenMarkup.length ? forbiddenMarkup.map((file) => path.relative(distRoot, file)).join(', ') : 'no iframe, refresh, event handlers, client SEO, or loading shell'));

  const banned = /hintra\.(?:net|com)|krillion\.to|Endless Pop|319 numbered|700 points|3 games a day|\bdelve\b|\bleverage\b|\bseamless\b|\brobust\b|in today's fast-paced world|warmly welcome|\bbest\b|\bfastest\b|\bguaranteed\b|100%|\bfree\b|\$5|€3\.50/i;
  const bannedRoutes = Object.entries(context.pages).filter(([, html]) => banned.test(html)).map(([route]) => route);
  results.push(result('R-11', bannedRoutes.length === 0, bannedRoutes.length ? `forbidden text: ${bannedRoutes.join(', ')}` : 'old domains, competitor figures, prices, Free, and banned phrases absent'));

  const notFoundLinks = notFound ? tags(notFound, 'a') : [];
  const notFoundPass = notFound !== null && notFoundLinks.length === 1 && attr(notFoundLinks[0], 'href') === '/'
    && attr(tags(notFound, 'a')[0], 'href') === '/' && /<meta name="robots" content="noindex">/.test(notFound)
    && !/<header\b|<footer\b|http-equiv="refresh"/i.test(notFound);
  results.push(result('R-12', notFoundPass, 'custom 404 has no chrome and exactly one Hintra home link; HTTP status checked separately'));

  return results;
}
