import { attr, copyText, expectedHomeEntryRoutes, expectedRoutes, jsonLd, origin, result, tags, textOf } from './helpers.mjs';

const krillionGameRoute = '/krillion-game/';
const oneInAKrillionRoute = '/one-in-a-krillion/';
const krillionGameH2 = [
  'What Krillion is',
  'The modes and themed packs',
  'Where each official entry sits',
  'What this page does not cover',
];
const oneInAKrillionH2 = [
  'Which movie the line is from',
  'How the joke is built',
  'How much is a krillion',
  'Why the game uses it',
];
const krillionGameAboutDescription = 'Krillion is a daily puzzle game at krillion.io. This page covers the game\'s naming and structure: its main mode, its themed packs, and the official entry for each, without reproducing game content.';
const krillionGameOfficialEntries = [
  { title: 'THE ENDLESS DIVE', label: 'Main mode on krillion.io', href: 'https://krillion.io/unlimited/classic' },
  { title: 'Geography', label: 'Geography pack on krillion.io', href: 'https://krillion.io/geography' },
  { title: 'Sports', label: 'Sports pack on krillion.io', href: 'https://krillion.io/sports' },
];
const homeEntriesFollowup = 'Krillion Game covers the game itself. Krillion Unlimited is one mode inside it, the one the game labels THE ENDLESS DIVE. Krillion Geography is one themed pack inside the same game. One in a Krillion is not a mode: it is a line from Happy Feet Two (2011) that Krillion also uses as its top rarity title. Noillirk is separate: a different daily game, on its own site.';
const multiplayerDisclaimer = 'This page has not verified that any multiplayer option exists, and nothing in the game\'s own labels ties multiplayer to THE ENDLESS DIVE.';
const unlimitedBlockA = '"One in a Krillion" is the game\'s top rarity title. The phrase is older than the game: it comes from a line in Happy Feet Two (2011), and the full movie and meaning story is on the One in a Krillion page. Because the phrase now names both a film line and a game tier, it also appears as a loose way of naming the game. Related searches take forms like "One in a Krillion unlimited", "One in a Krillion game" and "One in a Krillion multiplayer". Those are recorded here as phrases people type, not as descriptions of features. This page has not verified that any multiplayer option exists, and nothing in the game\'s own labels ties multiplayer to THE ENDLESS DIVE.';
const unlimitedBlockCHeading = 'Is Krillion Unlimited the same as Krillion Geography';
const unlimitedBlockC = 'No. Krillion Unlimited is a mode, and the official site labels it THE ENDLESS DIVE. Krillion Geography is a separate themed pack with its own address. This site keeps a separate guide for the geography pack.';
const unlimitedFaq3 = 'No. It is the game\'s top rarity title, and the phrase itself comes from a line in Happy Feet Two (2011). The modes and packs are separate, and each has its own page on the official site.';
const officialEntryHeadings = {
  '/krillion-unlimited/': 'Where the official entry is',
  '/es/krillion-unlimited/': 'Dónde está la entrada oficial',
  '/pt/krillion-unlimited/': 'Onde fica a entrada oficial',
};
const englishRelatedRoutes = new Set([
  '/krillion-game/',
  '/krillion-unlimited/',
  '/one-in-a-krillion/',
  '/noillirk/',
  '/krillion-geography/',
]);
const translatedRoutes = new Set(['/es/krillion-unlimited/', '/pt/krillion-unlimited/']);
const numberWord = '(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)';
const krillionGameTimingPattern = new RegExp(`\\b(?:\\d+|${numberWord})(?:[-\\s]+${numberWord})*[-\\s]+seconds?\\b|\\b(?:timer|timed|countdown)\\b`, 'i');

const expected = {
  '/': {
    title: 'Hintra | Daily Puzzle Game Modes and Official Entries',
    description: 'Independent coverage of daily puzzle games: Krillion Unlimited, Noillirk, and Krillion Geography. Mode names, official entries and where each game lives.',
    h1: 'Hintra, an independent hub for daily puzzle games',
    words: [235, 310],
  },
  '/krillion-game/': {
    title: 'Krillion Game: Modes, Packs and Official Entries',
    description: "Krillion Game covers the game's modes and themed packs, the player name behind THE ENDLESS DIVE, and where each official entry sits on krillion.io.",
    h1: 'Krillion Game: the modes, the packs and where each one opens',
    words: [620, 780],
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

function sameStringSet(actual, wanted) {
  return actual.length === wanted.length
    && JSON.stringify([...actual].sort()) === JSON.stringify([...wanted].sort());
}

export async function checkSeo(context) {
  const results = [];
  const counts = {};
  const wordFailures = [];
  const routeFailures = [];
  const expectedTableRoutes = Object.keys(expected);
  if (!sameStringSet(expectedRoutes, expectedTableRoutes)) routeFailures.push('expectedRoutes and expected table keys differ');
  for (const route of expectedRoutes) {
    const html = context.pages[route];
    const expectation = expected[route];
    if (!html) {
      routeFailures.push(`${route}: missing page`);
      continue;
    }
    if (!expectation) {
      routeFailures.push(`${route}: missing expected entry`);
      continue;
    }
    const count = copyText(html).split(/\s+/).filter(Boolean).length;
    counts[route] = count;
    const [min, max] = expectation.words;
    if (count < min || count > max) wordFailures.push(`${route}=${count} (${min}–${max})`);
  }
  if (!sameStringSet(Object.keys(counts), expectedTableRoutes)) routeFailures.push('copy counts and expected table keys differ');

  const structureFailures = [];
  const krillionGame = context.pages[krillionGameRoute];
  if (!krillionGame || JSON.stringify(copyH2(krillionGame)) !== JSON.stringify(krillionGameH2)) structureFailures.push('Krillion Game H2 sequence');
  if (krillionGame?.includes('class="lang-switch"')) structureFailures.push('Krillion Game LangSwitch');
  for (const entry of krillionGameOfficialEntries) {
    if (!krillionGame?.includes(`<p class="official-link__title">${entry.title}</p>`)
      || !krillionGame.includes(`href="${entry.href}"`)
      || !krillionGame.includes(entry.label)) structureFailures.push(`Krillion Game official entry=${entry.title}`);
  }
  const oneInAKrillion = context.pages[oneInAKrillionRoute];
  if (!oneInAKrillion || JSON.stringify(copyH2(oneInAKrillion)) !== JSON.stringify(oneInAKrillionH2)) structureFailures.push('One in a Krillion H2 sequence');
  if (oneInAKrillion && (!oneInAKrillion.includes('href="/krillion-unlimited/"') || !oneInAKrillion.includes('href="/krillion-geography/"'))) structureFailures.push('One in a Krillion entry-card links');
  if (oneInAKrillion?.includes('class="lang-switch"')) structureFailures.push('One in a Krillion LangSwitch');
  const home = context.pages['/'];
  const homeCopy = home ? copyText(home) : '';
  const homeCards = home?.match(/<article class="entry-card">[\s\S]*?<\/article>/gi) ?? [];
  const homeEntryRoutes = homeCards.map((card) => {
    const href = attr(tags(card, 'a')[0] ?? '', 'href');
    if (!href) return 'missing-href';
    const url = new URL(href, origin);
    return url.origin === origin ? url.pathname : href;
  });
  if (homeEntryRoutes.length !== expectedHomeEntryRoutes.length
    || homeEntryRoutes.some((route, index) => route !== expectedHomeEntryRoutes[index])) {
    structureFailures.push(`home entry routes=${homeEntryRoutes.join(',')}`);
  }
  if (!homeCopy.includes('Five places to start') || !homeCopy.includes('Five English entries are live at launch')) structureFailures.push('home Five copy');
  if (!homeCopy.includes(homeEntriesFollowup)) structureFailures.push('home entriesFollowup');
  if (/Three places to start|Four places to start|Three English entries are live at launch|Four English entries are live at launch/.test(homeCopy)
    || homeCopy.includes('The first two are separate games; the third is a themed pack inside Krillion. Take whichever one you arrived for.')
    || homeCopy.includes('The first two are separate games; the last two are a themed pack and a film phrase inside Krillion. Take whichever one you arrived for.')) {
    structureFailures.push('obsolete home copy');
  }
  const unlimitedEn = context.pages['/krillion-unlimited/'];
  const unlimitedEnCopy = unlimitedEn ? copyText(unlimitedEn) : '';
  if (!unlimitedEnCopy.includes(unlimitedBlockA)) structureFailures.push('Unlimited block A verbatim copy');
  if (!unlimitedEnCopy.includes(unlimitedBlockCHeading) || !unlimitedEnCopy.includes(unlimitedBlockC)) structureFailures.push('Unlimited block C verbatim copy');
  if (!unlimitedEnCopy.includes(unlimitedFaq3)) structureFailures.push('Unlimited FAQ-3 verbatim copy');
  if (!unlimitedEn?.includes('<a href="/one-in-a-krillion/">One in a Krillion</a>')) structureFailures.push('Unlimited block A link');
  if (!unlimitedEn?.includes('<a href="/krillion-geography/">the geography pack</a>')) structureFailures.push('Unlimited block C link');
  for (const [route, heading] of Object.entries(officialEntryHeadings)) {
    if (!context.pages[route]?.includes(`<p class="official-link__title">${heading}</p>`)) structureFailures.push(`${route} official entry heading`);
  }
  const s01Failures = [...routeFailures, ...wordFailures, ...structureFailures];
  results.push(result('S-01', s01Failures.length === 0, s01Failures.length ? s01Failures.join(', ') : `copy word counts: ${Object.entries(counts).map(([route, count]) => `${route}=${count}`).join(', ')}`));

  const tdkFailures = expectedRoutes.filter((route) => {
    const html = context.pages[route];
    const expectation = expected[route];
    return !html || !expectation || title(html) !== expectation.title || metaDescription(html) !== expectation.description || h1(html) !== expectation.h1;
  });
  const tdkRedline = expectedRoutes.filter((route) => {
    const html = context.pages[route];
    return html && /\bfree\b|\bbest\b|#1|guaranteed|\b\d+\s+seconds\b/i.test(`${title(html)} ${metaDescription(html)} ${h1(html)}`);
  });
  results.push(result('S-02', tdkFailures.length === 0 && tdkRedline.length === 0, tdkFailures.length || tdkRedline.length ? `TDK failures=${tdkFailures.join(', ')}; redlines=${tdkRedline.join(', ')}` : 'Title, Meta, and single H1 equal the final copy and avoid TDK redlines'));

  const oldCopy = /Hints and Answers for Daily Puzzle Games|What does One in a Krillion mean\?|No numbered index|itspublic|the one organised around where a thing is|An Expedition is a single set of prompts/i;
  const oldRoutes = expectedRoutes.filter((route) => context.pages[route] && oldCopy.test(context.pages[route]));
  results.push(result('S-03', oldRoutes.length === 0, oldRoutes.length ? oldRoutes.join(', ') : 'no superseded copy or old FAQ signatures'));

  const krillionRoutes = ['/', krillionGameRoute, '/krillion-unlimited/', oneInAKrillionRoute, '/krillion-geography/', '/es/krillion-unlimited/', '/pt/krillion-unlimited/'];
  const timingFailures = krillionRoutes.filter((route) => context.pages[route] && /\b(?:20|25|30|60)\s+seconds\b/i.test(context.pages[route]));
  if (krillionGame && krillionGameTimingPattern.test(copyText(krillionGame))) timingFailures.push(`${krillionGameRoute} extended timing`);
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
      if (route === krillionGameRoute && (game?.url !== 'https://krillion.io/' || game?.description !== krillionGameAboutDescription)) schemaFailures.push('Krillion Game aboutGame source');
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
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const expectedLocations = expectedRoutes.map((route) => origin + route);
    const sitemapPass = locations.length === expectedRoutes.length
      && sameStringSet(locations, expectedLocations)
      && !sitemap.includes('<lastmod>');
    results.push(result('S-09', sitemapPass, `sitemap URLs=${locations.length}; exact set=${sameStringSet(locations, expectedLocations)}; lastmod=${sitemap.includes('<lastmod>')}`));
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

  const internalLinkFailures = [];
  for (const route of expectedRoutes.filter((item) => item !== '/')) {
    const html = context.pages[route];
    const main = html?.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
    const internalRoutes = new Set();
    for (const anchor of tags(main, 'a')) {
      const href = attr(anchor, 'href');
      if (!href) continue;
      const url = new URL(href, origin);
      if (url.origin === origin && url.pathname !== route) internalRoutes.add(url.pathname);
    }
    if (internalRoutes.size < 3) internalLinkFailures.push(`${route}: main routes=${internalRoutes.size}`);

    const relatedBlocks = main.match(/<aside\b[^>]*class="related-links"[^>]*>[\s\S]*?<\/aside>/gi) ?? [];
    if (englishRelatedRoutes.has(route)) {
      if (relatedBlocks.length !== 1) internalLinkFailures.push(`${route}: related-links=${relatedBlocks.length}`);
      if (relatedBlocks.some((block) => tags(block, 'a').some((anchor) => {
        const href = attr(anchor, 'href');
        return href && new URL(href, origin).pathname === route;
      }))) internalLinkFailures.push(`${route}: related-links self-link`);
    }
    if (translatedRoutes.has(route) && relatedBlocks.length !== 0) internalLinkFailures.push(`${route}: translated related-links=${relatedBlocks.length}`);
  }
  results.push(result('S-14', internalLinkFailures.length === 0, internalLinkFailures.length ? internalLinkFailures.join(' | ') : 'main-content internal links and English RelatedLinks sets are complete, without self-links or translated blocks'));
  return results;
}
