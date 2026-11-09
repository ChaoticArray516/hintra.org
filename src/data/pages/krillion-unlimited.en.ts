import { routes } from '../site';
import type { PageData } from '../types';

export const unlimitedEn = {
  path: routes.unlimited,
  locale: 'en',
  title: 'Krillion Unlimited: THE ENDLESS DIVE, Explained',
  description: 'Players call it Krillion Unlimited; the game calls it THE ENDLESS DIVE. What the mode is, where the official entry sits, and which names players search for.',
  h1: 'Krillion Unlimited is the player name for THE ENDLESS DIVE',
  lead: 'Two names describe the same Krillion mode. On the game\'s own pages the mode is printed as THE ENDLESS DIVE. In search boxes and forum posts the same thing is usually typed as Krillion Unlimited. This page is about that gap.',
  breadcrumbName: 'Krillion Unlimited',
  officialLabel: 'Open Krillion Unlimited on krillion.io',
  aboutDescription: 'A daily puzzle game from krillion.io. This page covers its endless mode, which the game labels THE ENDLESS DIVE.',
  sections: [
    {
      heading: 'Why the name on the page differs from the name players use',
      paragraphs: [
        'Krillion\'s mode labels are short and image-led inside the game, and THE ENDLESS DIVE is one of them. The word "unlimited" is what players reach for instead: it says what the mode does in one flat word, and a page built on dive imagery does not put "unlimited" anywhere you can search. The two names are not competing claims — one is the label, one is the shorthand. The shorthand spread on its own; the game\'s own pages do not explain it. This site uses the player name in the address and the game\'s label in the explanation, and never treats the shorthand as a second mode.',
      ],
    },
    {
      heading: 'One in a Krillion and the other names people search',
      paragraphs: [
        'One in a Krillion is the game\'s top rarity title, and the phrase is older than the game. It is a line from Happy Feet Two (2011), spoken by one of two krill, playing on "one in a million" by swapping the unit for the animal. The game borrowed it as the name of its rarest tier. Because the phrase now names both a film line and a game tier, it also appears as a loose way of naming the game. Related searches take forms like "One in a Krillion unlimited", "One in a Krillion game" and "One in a Krillion multiplayer". Those are recorded here as phrases people type, not as descriptions of features. This page has not verified that any multiplayer option exists, and nothing in the game\'s own labels ties multiplayer to THE ENDLESS DIVE.',
      ],
    },
    {
      heading: 'Where the official entry is',
      paragraphs: [
        'The mode opens from the official site, at krillion.io/unlimited/classic. That address is where THE ENDLESS DIVE begins, and it is the only location this page points at. Hintra does not host it, mirror it, or wrap it in a frame. If the link does not load, check the official site for the current entry rather than a copy of it.',
      ],
    },
    {
      heading: 'Krillion sports, briefly',
      paragraphs: [
        'Krillion also runs a sports pack at krillion.io/sports, and it is a separate themed set rather than part of THE ENDLESS DIVE. People searching for Krillion sports sometimes land here because the two get read as the same thing. They are not. This page does not cover the sports pack\'s own rules; look for the label printed on its page.',
      ],
    },
  ],
} satisfies PageData;
