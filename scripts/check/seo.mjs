import { attr, copyText, expectedRoutes, jsonLd, origin, result, tags, textOf } from './helpers.mjs';

const oneInAKrillionRoute = '/one-in-a-krillion/';
const oneInAKrillionH2 = [
  'Which movie the line is from',
  'How the joke is built',
  'How much is a krillion',
  'Why the game uses it',
];
const multiplayerDisclaimer = 'This page has not verified that any multiplayer option exists, and nothing in the game\'s own labels ties multiplayer to THE ENDLESS DIVE.';

const expected = {
  '/': {
    title: 'Hintra | Daily Puzzle Game Modes and Official Entries',
    description: 'Independent coverage of daily puzzle games: Krillion Unlimited, Noillirk, and Krillion Geography. Mode names, official entries and where each game lives.',
    h1: 'Hintra, an independent hub for daily puzzle games',
    words: [185, 235],
  },
  '/krillion-unlimited/': {
    title: 'Krillion Unlimited: THE ENDLESS DIVE, Explained',
    description: 'Players call it Krillion Unlimited; the game calls it THE ENDLESS DIVE. What the mode is, where the official entry sits, and which names players search for.',
    h1: 'Krillion Unlimited is the player name for THE ENDLESS DIVE',
    words: [475, 615],
  },
  '/one-in-a-krillion/': {
    title: 'One in a Krillion Movie: Where the Line Comes From',
    description: 'The line is from Happy Feet Two (2011), spoken by one of two krill. What "krillion" means, how much it is, and why the game borrowed it.',
    h1: 'One in a Krillion: the movie line, the meaning, the number',
    words: [450, 620],
  },
  '/noillirk/': {
    title: 'Noillirk: An Independent Daily Game, Explained',
    description: 'Noillirk is its own game: ten questions, a top-ten board after each one, and a public statement that it is not affiliated with any other game or site.',
    h1: 'Noillirk is a separate game, not a Krillion mode',
    words: [470, 600],
  },
  '/krillion-geography/': {
    title: 'Krillion Geography: 30 Expeditions and Six Regions',
    description: 'Krillion Geography runs 30 Expeditions across six named regions, from THE RAINFOREST to THE ICE. Where the official entry sits and what the pack covers.',
    h1: 'Krillion Geography: 30 Expeditions across six regions',
    words: [445, 560],
  },
  '/es/krillion-unlimited/': {
    title: 'Krillion Unlimited: THE ENDLESS DIVE explicado',
    description: 'Los jugadores dicen Krillion Unlimited; el juego lo llama THE ENDLESS DIVE. Qué es el modo y dónde está la entrada oficial en krillion.io.',
    h1: 'Krillion Unlimited es el nombre que usan los jugadores para THE ENDLESS DIVE',
    words: [300, 380],
  },
  '/pt/krillion-unlimited/': {
    title: 'Krillion Unlimited: THE ENDLESS DIVE explicado',
    description: 'Os jogadores dizem Krillion Unlimited; o jogo chama THE ENDLESS DIVE. O que é o modo e onde fica a entrada oficial em krillion.io.',
    h1: 'Krillion Unlimited é o nome que os jogadores usam para THE ENDLESS DIVE',
    words: [300, 380],
  },
};

function metaDescription(html) {
  const tag = tags(html, 'meta').find((item) => attr(item, 'name') === 'description');
  return tag ? textOf(attr(tag, 'content') ?? '') : undefined;
}

function title(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? textOf(match[1]) : undefined;
}

function h1(html) {
  const matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.length === 1 ? textOf(matches[0][1]) : undefined;
}

function copyH2(html) {
  return [...html.matchAll(/<h2\b[^>]*data-copy[^>]*>([\s\S]*?)<\/h2>/gi)].map((match) => textOf(match[1]));
}

export async function checkSeo(context) {
  const results = [];
  const counts = {};
  const wordFailures = [];
  for (const route of expectedRoutes) {
    const html = context.pages[route];
    if (!html) continue;
    const count = copyText(html).split(/\s+/).filter(Boolean).length;
    counts[route] = count;
    const [min, max] = expected[route].words;
    if (count < min || count > max) wordFailures.push(`${route}=${count} (${min}–${max})`);
  }

  const structureFailures = [];
  const oneInAKrillion = context.pages[oneInAKrillionRoute];
  if (!oneInAKrillion || JSON.stringify(copyH2(oneInAKrillion)) !== JSON.stringify(oneInAKrillionH2)) structureFailures.push('One in a Krillion H2 sequence');
  if (oneInAKrillion && (!oneInAKrillion.includes('href="/krillion-unlimited/"') || !oneInAKrillion.includes('href="/krillion-geography/"'))) structureFailures.push('One in a Krillion entry-card links');
  if (oneInAKrillion?.includes('class="lang-switch"')) structureFailures.push('One in a Krillion LangSwitch');
  const home = context.pages['/'];
  const homeCopy = home ? copyText(home) : '';
  const homeCards = home?.match(/<article class="entry-card">/g) ?? [];
  if (homeCards.length !== 4) structureFailures.push(`home cards=${homeCards.length}`);
  if (!homeCopy.includes('Four places to start') || !homeCopy.includes('Four English entries are live at launch')) structureFailures.push('home Four copy');
  if (!homeCopy.includes('The first two are separate games; the last two are a themed pack and a film phrase inside Krillion. Take whichever one you arrived for.')) structureFailures.push('home entriesFollowup');
  if (/Three places to start|Three English entries are live at launch|the third is a themed pack inside Krillion/.test(homeCopy)) structureFailures.push('obsolete home Three copy');
  const s01Failures = [...wordFailures, ...structureFailures];
  results.push(result('S-01', s01Failures.length === 0 && Object.keys(counts).length === 7, s01Failures.length ? s01Failures.join(', ') : `copy word counts: ${Object.entries(counts).map(([route, count]) => `${route}=${count}`).join(', ')}`));

  const tdkFailures = expectedRoutes.filter((route) => {
    const html = context.pages[route];
    return !html || title(html) !== expected[route].title || metaDescription(html) !== expected[route].description || h1(html) !== expected[route].h1;
  });
  const tdkRedline = expectedRoutes.filter((route) => /\bfree\b|\bbest\b|#1|guaranteed|\b\d+\s+seconds\b/i.test(`${title(context.pages[route])} ${metaDescription(context.pages[route])} ${h1(context.pages[route])}`));
  results.push(result('S-02', tdkFailures.length === 0 && tdkRedline.length === 0, tdkFailures.length || tdkRedline.length ? `TDK failures=${tdkFailures.join(', ')}; redlines=${tdkRedline.join(', ')}` : 'Title, Meta, and single H1 equal the final copy and avoid TDK redlines'));

  const oldCopy = /Hints and Answers for Daily Puzzle Games|What does One in a Krillion mean\?|No numbered index|itspublic|the one organised around where a thing is|An Expedition is a single set of prompts/i;
  const oldRoutes = expectedRoutes.filter((route) => context.pages[route] && oldCopy.test(context.pages[route]));
  results.push(result('S-03', oldRoutes.length === 0, oldRoutes.length ? oldRoutes.join(', ') : 'no superseded copy or old FAQ signatures'));

  const krillionRoutes = ['/', '/krillion-unlimited/', oneInAKrillionRoute, '/krillion-geography/', '/es/krillion-unlimited/', '/pt/krillion-unlimited/'];
  const timingFailures = krillionRoutes.filter((route) => context.pages[route] && /\b(?:20|25|30|60)\s+seconds\b/i.test(context.pages[route]));
  const noillirkRedlines = context.pages['/noillirk/'] && /\b(?:clone|fake|scam)\b|share a style, not an owner|not the (?:technically|factually) correct answer/i.test(context.pages['/noillirk/']);
  results.push(result('S-04', timingFailures.length === 0 && !noillirkRedlines, timingFailures.length || noillirkRedlines ? `timing=${timingFailures.join(', ')}; Noillirk=${noillirkRedlines}` : 'page-scoped timing and identity redlines absent'));

  const schemaFailures = [];
  for (const route of expectedRoutes) {
    const graph = jsonLd(context.pages[route])[0]['@graph'];
    const types = graph.map((node) => node['@type']).sort();
    const wanted = route === '/' ? ['Organization', 'WebPage', 'WebSite'] : ['BreadcrumbList', 'FAQPage', 'VideoGame', 'WebPage'];
    if (JSON.stringify(types) !== JSON.stringify(wanted)) schemaFailures.push(`${route} types=${types.join(',')}`);
    const page = graph.find((node) => node['@type'] === 'WebPage');
    if (page['@id'] !== origin + route + '#webpage' || page.url !== origin + route) schemaFailures.push(`${route} page URL`);
    if (route !== '/') {
      const game = graph.find((node) => node['@type'] === 'VideoGame');
      const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList');
      if (page.about?.['@id'] !== game?.['@id'] || game?.creator || game?.publisher) schemaFailures.push(`${route} VideoGame boundary`);
      if (route === oneInAKrillionRoute && (game?.url !== 'https://krillion.io/' || game?.description !== 'A daily puzzle game from krillion.io. This page covers the phrase "One in a Krillion", its film origin and why the game uses it as its rarest tier.')) schemaFailures.push('One in a Krillion aboutGame source');
      const visibleBreadcrumb = context.pages[route].match(/<nav class="breadcrumbs"[\s\S]*?<\/nav>/i)?.[0] ?? '';
      const visibleNames = [...visibleBreadcrumb.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((match) => textOf(match[1]));
      const schemaNames = breadcrumb?.itemListElement.map((item) => item.name) ?? [];
      if (JSON.stringify(visibleNames) !== JSON.stringify(schemaNames)) schemaFailures.push(`${route} breadcrumbs differ`);
    }
  }
  results.push(result('S-05', schemaFailures.length === 0, schemaFailures.length ? schemaFailures.join(' | ') : 'Schema types, @id, about, game ownership, and breadcrumb sources are correct'));

  const linkFailures = expectedRoutes.filter((route) => route !== '/' && tags(context.pages[route], 'a').filter((anchor) => {
    const href = attr(anchor, 'href');
    return href?.startsWith('/') || href?.startsWith(origin);
  }).length < 2);
  results.push(result('S-07', linkFailures.length === 0, linkFailures.length ? `isolated: ${linkFailures.join(', ')}` : 'all content pages have at least two real internal links'));

  const unlimited = ['/krillion-unlimited/', '/es/krillion-unlimited/', '/pt/krillion-unlimited/'];
  const expectedAlternateSet = JSON.stringify(['en', 'es', 'pt', 'x-default']);
  const alternateFailures = unlimited.filter((route) => JSON.stringify(tags(context.pages[route], 'link').filter((tag) => attr(tag, 'rel') === 'alternate').map((tag) => attr(tag, 'hreflang'))) !== expectedAlternateSet);
  results.push(result('S-08', alternateFailures.length === 0, alternateFailures.length ? alternateFailures.join(', ') : 'all three translations include en/es/pt/x-default with self-reference'));

  try {
    const sitemap = await context.read('sitemap-0.xml');
    const count = (sitemap.match(/<loc>/g) ?? []).length;
    results.push(result('S-09', count === 7 && !sitemap.includes('<lastmod>'), `sitemap has ${count} URLs and no lastmod`));
  } catch {
    results.push(result('S-09', false, 'sitemap-0.xml missing'));
  }

  const aliases = ['One in a Krillion unlimited', 'One in a Krillion game', 'One in a Krillion multiplayer'];
  const aliasFailures = unlimited.filter((route) => aliases.some((alias) => !copyText(context.pages[route]).includes(alias)));
  const disclaimerPass = copyText(context.pages['/krillion-unlimited/']).includes(multiplayerDisclaimer);
  results.push(result('S-10', aliasFailures.length === 0 && disclaimerPass, aliasFailures.length || !disclaimerPass ? `aliases=${aliasFailures.join(', ')}; English disclaimer=${disclaimerPass}` : 'all three complete aliases appear in en/es/pt; English multiplayer disclaimer is intact'));

  const geography = context.pages['/krillion-geography/'];
  const regions = ['THE RAINFOREST', 'THE ALPS', 'THE GREAT WALL', 'THE OUTBACK', 'THE CANYON', 'THE ICE'];
  const geographyPass = geography && geography.includes('30 Expeditions') && geography.includes('EXPEDITION #1')
    && regions.every((region) => geography.includes(region)) && geography.includes('href="https://krillion.io/geography"')
    && !/unlimited geography/i.test(geography);
  results.push(result('S-11', geographyPass, 'Geography short intent, 30, six regions, EXPEDITION #1, and official entry verified'));

  const noillirk = context.pages['/noillirk/'];
  const noillirkPass = noillirk && h1(noillirk) === expected['/noillirk/'].h1
    && noillirk.includes('10 questions') && noillirk.includes('30 seconds') && noillirk.includes('More common answers score higher')
    && noillirk.includes('href="https://noillirk.com/"') && !/30\s+seconds/i.test(krillionRoutes.map((route) => context.pages[route]).join(''));
  results.push(result('S-12', noillirkPass, 'Noillirk independent identity and 10/30 facts verified; timing does not leak to Krillion pages'));

  const dated = Object.entries(context.pages).filter(([, html]) => /datePublished|dateModified|<lastmod>|new Date\(|Date\.now\(/.test(html)).map(([route]) => route);
  results.push(result('S-13', dated.length === 0, dated.length ? `dates: ${dated.join(', ')}` : 'no SEO dates in HTML; repeat-build hash comparison is run separately'));
  return results;
}
