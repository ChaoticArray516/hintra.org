import { routes } from '../site';
import type { PageData } from '../types';

export const noillirkPage = {
  path: routes.noillirk,
  locale: 'en',
  title: 'Noillirk: An Independent Daily Game, Explained',
  description: 'Noillirk is its own game: ten questions, a top-ten board after each one, and a public statement that it is not affiliated with any other game or site.',
  h1: 'Noillirk is a separate game, not a Krillion mode',
  lead: 'Noillirk gets filed under Krillion a lot, and that filing is wrong. It is a daily guessing game with its own site, its own board and its own scoring direction. Krillion appears in the picture for one reason: the people who made Noillirk said so themselves, in one line, publicly.',
  breadcrumbName: 'Noillirk',
  officialLabel: 'Play Noillirk on noillirk.com',
  aboutDescription: 'An independent daily game at noillirk.com. Its own site states that it is not affiliated with any other game or site and that it was inspired by Krillion.',
  sections: [
    {
      heading: 'What Noillirk is',
      paragraphs: [
        "Noillirk is a daily question game played at noillirk.com. A round is ten questions, each on a timer, and each scored against a board of the ten answers other players gave most often. The game has published its position: Noillirk is an independent game we made. It isn't affiliated with any other game or site. It also states the inspiration in three words — Inspired by Krillion. Both statements are short, public, and worth reading before assuming who runs what.",
      ],
    },
    {
      heading: 'How a round works',
      paragraphs: [
        'A round is ten questions, and every question runs on a thirty-second timer. Thirty seconds is Noillirk\'s own number: it belongs to this game and to no other, so do not carry it over to anything else you play. You are asked to name something, not to calculate it, and when the timer ends your answer is placed against a board of the ten most common answers given to that same question. The board is the point. A reasonable answer nobody else thought of lands low. Ten questions, ten boards.',
      ],
    },
    {
      heading: 'How Noillirk differs from Krillion',
      paragraphs: [
        'The two games point in opposite directions, and that is the whole difference. Noillirk scores you for converging: the more common your answer, the better it places, and the board rewards thinking like everyone else. Krillion\'s scoring runs the other way, with rarer answers rated higher. Same basic act — name something under time, get a number back — with the reward flipped. On identity, the public record is what it is: Noillirk describes itself as independent and not affiliated with any other game or site, and names Krillion as an inspiration. This page repeats that rather than expanding it. Noillirk\'s site also keeps Krillion-style pages of its own.',
      ],
    },
    {
      heading: 'Where the official entry is',
      paragraphs: [
        'Noillirk opens at noillirk.com. That is the address to use, and the link below goes there. Hintra does not host the game, embed it, or keep a copy; this page writes about the game, it does not serve it. If you arrived expecting a Krillion mode, it will not behave the way you assume.',
      ],
    },
  ],
} satisfies PageData;
