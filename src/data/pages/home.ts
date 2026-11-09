import { routes } from '../site';

export const homePage = {
  path: routes.home,
  locale: 'en',
  title: 'Hintra | Daily Puzzle Game Modes and Official Entries',
  description: 'Independent coverage of daily puzzle games: Krillion Unlimited, Noillirk, and Krillion Geography. Mode names, official entries and where each game lives.',
  h1: 'Hintra, an independent hub for daily puzzle games',
  lead: "Hintra is an independent site about daily puzzle games. It does not host, run, or copy any game. It records what players look up and cannot find on the game's own pages: what a mode is called, where the official entry sits, and how two similarly named games differ. Four English entries are live at launch.",
  entriesHeading: 'Four places to start',
  entries: [
    {
      title: 'Krillion Unlimited',
      path: routes.unlimited,
      description: 'the player name for a Krillion mode the game labels THE ENDLESS DIVE.',
    },
    {
      title: 'Noillirk',
      path: routes.noillirk,
      description: 'a separate daily game: ten questions, and a top-ten board after each one.',
    },
    {
      title: 'Krillion Geography',
      path: routes.geography,
      description: '30 Expeditions across six named regions.',
    },
    {
      title: 'One in a Krillion',
      path: routes.oneInAKrillion,
      description: 'the film line from Happy Feet Two (2011) and the game\'s top rarity title.',
    },
  ],
  entriesFollowup: 'The first two are separate games; the last two are a themed pack and a film phrase inside Krillion. Take whichever one you arrived for.',
  contentsHeading: 'What an entry contains',
  contents: 'Each page opens with a plain statement of what the game or mode is. Then the naming: the name on the page, the name players use, and why the two differ. Then where the official entry sits, written as a location rather than a promise. Where a game has a public statement about who it is and is not, that statement is quoted rather than paraphrased. Nothing here is a walkthrough or a guess about unpublished rules.',
} as const;
