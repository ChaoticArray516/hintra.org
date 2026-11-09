import { routes } from '../site';
import type { PageData } from '../types';

export const geographyPage = {
  path: routes.geography,
  locale: 'en',
  title: 'Krillion Geography: 30 Expeditions and Six Regions',
  description: 'Krillion Geography runs 30 Expeditions across six named regions, from THE RAINFOREST to THE ICE. Where the official entry sits and what the pack covers.',
  h1: 'Krillion Geography: 30 Expeditions across six regions',
  lead: 'Krillion Geography is a themed pack inside Krillion, built around place. Its own page gives the count and the shape: 30 Expeditions, grouped under six named regions. This page sets out what the pack is, what the six regions are called, and where the official entry sits.',
  breadcrumbName: 'Krillion Geography',
  officialLabel: 'Open Krillion Geography on krillion.io',
  aboutDescription: 'A daily puzzle game from krillion.io. This page covers its geography pack, which runs 30 Expeditions across six named regions.',
  sections: [
    {
      heading: 'What Krillion Geography is',
      paragraphs: [
        'It is one of several themed packs that sit alongside the main daily mode. Its page prints a count of 30 Expeditions and names six regions as the organising structure. The entry sits on the official site at krillion.io/geography. Treat the pack as a set in its own right rather than a filter on the daily mode. Beyond the count, the six region names and the address, the pack\'s page does not spell out per-region rules, so this page does not either.',
      ],
    },
    {
      heading: 'The six regions',
      paragraphs: [
        'The pack groups its Expeditions under six region names: THE RAINFOREST, THE ALPS, THE GREAT WALL, THE OUTBACK, THE CANYON and THE ICE. Those six are the names as the pack prints them, in capitals, and they are the only region-level facts this page will state. What each region covers in play, how many Expeditions fall under each, and whether order matters within a region are not described on the pack\'s page, so they are not described here. If you want to know what a region contains, the pack itself is the place to look.',
      ],
    },
    {
      heading: 'The Expeditions',
      paragraphs: [
        'The pack runs 30 Expeditions. That is the verified unit count used on this page. The official page presents entries such as EXPEDITION #1, but this guide does not reproduce individual prompts, a full Expedition list, or completion rules. The number describes the pack\'s structure, not a question count for any one Expedition, and this page does not infer one from the total. The count and region names are structural facts only; they do not tell you which prompts appear in a particular Expedition. For the current unit and its contents, use the official entry.',
      ],
    },
    {
      heading: 'Where the official entry is',
      paragraphs: [
        'The pack opens at krillion.io/geography, on the official site. That address is the only location this page points at. Hintra does not host it, mirror it, or frame it. If the link does not load, check the official site for the current entry.',
      ],
    },
  ],
} satisfies PageData;
