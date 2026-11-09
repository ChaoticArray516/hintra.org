import { routes } from '../site';
import type { PageData } from '../types';

export const oneInAKrillionPage = {
  path: routes.oneInAKrillion,
  locale: 'en',
  title: 'One in a Krillion Movie: Where the Line Comes From',
  description: 'The line is from Happy Feet Two (2011), spoken by one of two krill. What "krillion" means, how much it is, and why the game borrowed it.',
  h1: 'One in a Krillion: the movie line, the meaning, the number',
  lead: '"One in a Krillion" comes from Happy Feet Two (2011), where one of two krill says the line. The joke works by swapping the unit in "one in a million" for the animal. A krillion is not a real number, and the game borrowed the phrase as the name of its rarest tier.',
  breadcrumbName: 'One in a Krillion',
  aboutDescription: 'A daily puzzle game from krillion.io. This page covers the phrase "One in a Krillion", its film origin and why the game uses it as its rarest tier.',
  entryCard: 'The game runs at krillion.io. This site keeps written guides to the modes and packs, including [the endless mode](/krillion-unlimited/) and [the geography pack](/krillion-geography/), and does not host the game itself. The game also lists a separate movies pack; its rules are on the official page.',
  sections: [
    {
      heading: 'Which movie the line is from',
      paragraphs: [
        'The phrase is spoken in Happy Feet Two, released in 2011. The speakers are two krill, the small shrimp-like animals the film follows alongside its penguins. The line is built out of the animal\'s name, which is why it lands like a figure of speech people already knew. Today the same words name two separate things: a film line, and the top rarity title in a daily trivia game. Both uses are in circulation, and readers arrive looking for one or the other.',
      ],
    },
    {
      heading: 'How the joke is built',
      paragraphs: [
        'English already had "one in a million", a phrase for something so rare that its odds are not worth calculating. The film keeps that structure and swaps the unit for the animal saying it. The sound does the work: "krillion" echoes "million" closely enough that the ear finishes the comparison on its own. That is the whole mechanism. It is an observation about how the line lands, not a definition anyone published.',
      ],
    },
    {
      heading: 'How much is a krillion',
      paragraphs: [
        'A krillion is not a number. Nothing measures it, and no dictionary assigns it a value. It belongs with "zillion" and "jillion": words that borrow the shape of a real number word to signal an amount too large to bother counting. When someone asks how much a krillion is, the answer is that the word is doing the opposite of counting. It is there to say the count does not matter. That reading comes from how English builds these words. It is not an official definition from the film or from the game.',
      ],
    },
    {
      heading: 'Why the game uses it',
      paragraphs: [
        'A daily trivia game needs a name for the answer nobody else gave. "One in a Krillion" carries exactly that meaning without inventing a new word: rare enough that finding one is the story. The phrase works as a tier name because the joke already holds the comparison, so the game did not have to explain it before borrowing it. It also means the title reads the same to a player who has never seen the film, since the "one in a million" pattern is familiar on its own.',
      ],
    },
  ],
} satisfies PageData & { entryCard: string };
