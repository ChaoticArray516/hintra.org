import { krillion } from '../games/krillion';
import { routes } from '../site';
import type { OfficialEntry, PageData } from '../types';

export const krillionGamePage = {
  path: routes.krillionGame,
  locale: 'en',
  title: 'Krillion Game: Modes, Packs and Official Entries',
  description: "Krillion Game covers the game's modes and themed packs, the player name behind THE ENDLESS DIVE, and where each official entry sits on krillion.io.",
  h1: 'Krillion Game: the modes, the packs and where each one opens',
  lead: 'Krillion is a daily puzzle game at krillion.io. This page is the hub for the game itself: the main mode players call Krillion Unlimited, the Geography, Sports and Movies themed packs, and the official entry for each one. It puts those names side by side so a reader arriving from a search can tell the difference between a mode, a pack and a separate game, and then follow the link that belongs to it.',
  breadcrumbName: 'Krillion Game',
  aboutDescription: "Krillion is a daily puzzle game at krillion.io. This page covers the game's naming and structure: its main mode, its themed packs, and the official entry for each, without reproducing game content.",
  sections: [
    {
      heading: 'What Krillion is',
      paragraphs: [
        "Krillion is a daily puzzle game. The game sets a puzzle each day around a single category, and players respond within that category. It runs at krillion.io, where it publishes its modes and themed packs on the same site. This page records names and locations: what the game calls something, what players call it, and where that thing opens. It does not reproduce the game. A search for the game's name can point to the main mode, a subject pack or an unfamiliar label. Separating those destinations before the reader leaves Hintra keeps the mode name from being confused with the name of a pack. It also gives the reader a simple check before following an external link: identify the kind of entry first, then use the address attached to that entry rather than relying on the search phrase alone.",
      ],
    },
    {
      heading: 'The modes and themed packs',
      paragraphs: [
        'The official page calls Krillion\'s main mode THE ENDLESS DIVE. Players often search for it as Krillion Unlimited, so the two names describe one thing, and [the Krillion Unlimited entry](/krillion-unlimited/) takes that naming apart. Geography is a themed pack rather than a mode: the official page lists 30 Expeditions and organises them by named regions. Sports is another themed pack with its own entry on the game\'s site; that page is short and publishes no verifiable item list, so this page neither reproduces one nor guesses at it. Movies is also a themed pack. Its rules are on the official page; this guide does not reproduce them or infer how much content the pack has.',
      ],
    },
    {
      heading: 'Where each official entry sits',
      paragraphs: [
        "The entries sit on the same domain. The main mode opens under the unlimited/classic path on krillion.io, Geography opens under its own geography path, and Sports opens under sports. The entry set on this page lists the full addresses, so a reader can see the destination before leaving. Anyone who wants the pack's structure rather than its address can start with [the Geography entry](/krillion-geography/), which stays with what the official page shows.",
      ],
    },
    {
      heading: 'What this page does not cover',
      paragraphs: [
        'This guide does not publish answers, hints or walkthroughs for any mode or any pack, and it does not record pricing or per-day allowances. Those limits are deliberate: the game\'s own pages are the place to confirm how a pack behaves, and this page stays with naming and entry points. Sibling entries pick up where this one stops. Noillirk is a separate daily game rather than a Krillion mode, and [the Noillirk entry](/noillirk/) covers it. [One in a Krillion](/one-in-a-krillion/) covers the film line behind the game\'s top rarity title.',
      ],
    },
  ],
  officialEntries: [
    {
      title: 'THE ENDLESS DIVE',
      label: 'Main mode on krillion.io',
      href: krillion.unlimitedEntry,
    },
    {
      title: 'Geography',
      label: 'Geography pack on krillion.io',
      href: krillion.geographyEntry,
    },
    {
      title: 'Sports',
      label: 'Sports pack on krillion.io',
      href: krillion.sportsEntry,
    },
  ],
} satisfies PageData & { officialEntries: OfficialEntry[] };
