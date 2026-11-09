import { routes } from '../site';
import type { PageData } from '../types';

export const unlimitedPt = {
  path: routes.unlimitedPt,
  locale: 'pt',
  title: 'Krillion Unlimited: THE ENDLESS DIVE explicado',
  description: 'Os jogadores dizem Krillion Unlimited; o jogo chama THE ENDLESS DIVE. O que é o modo e onde fica a entrada oficial em krillion.io.',
  h1: 'Krillion Unlimited é o nome que os jogadores usam para THE ENDLESS DIVE',
  lead: 'Dois nomes descrevem o mesmo modo de Krillion. O jogo o apresenta como THE ENDLESS DIVE; em buscas e fóruns, os jogadores escrevem Krillion Unlimited. Esta página explica essa diferença.',
  breadcrumbName: 'Krillion Unlimited',
  officialLabel: 'Abrir o Krillion Unlimited no krillion.io',
  aboutDescription: 'Um jogo de quebra-cabeça diário do krillion.io. Esta página cobre o seu modo sem fim, que o jogo chama de THE ENDLESS DIVE.',
  sections: [
    {
      heading: 'Por que o nome da página difere do nome que os jogadores usam',
      paragraphs: [
        'Krillion chama este modo de THE ENDLESS DIVE. Os jogadores, por outro lado, costumam escrever "unlimited" ao procurá-lo. Não são dois modos: um é o nome oficial e o outro é uma forma curta de falar do mesmo. Esta página usa os dois nomes para deixar a relação clara, sem inventar regras que o jogo não publica.',
      ],
    },
    {
      heading: 'One in a Krillion e outros nomes que as pessoas buscam',
      paragraphs: [
        'One in a Krillion é o título de raridade mais alta do jogo. A frase vem de uma fala de Happy Feet Two (2011), e o jogo a usa para nomear esse nível. Nas buscas também aparecem "One in a Krillion unlimited", "One in a Krillion game" e "One in a Krillion multiplayer". Elas são apresentadas como formas que os jogadores digitam, não como prova de recursos. Esta página não verificou a existência de um modo multijogador nem uma relação entre multiplayer e THE ENDLESS DIVE.',
      ],
    },
    {
      heading: 'Onde fica a entrada oficial',
      paragraphs: [
        'O modo abre em krillion.io/unlimited/classic, no site oficial. Hintra não hospeda, não replica e não exibe o modo dentro de um quadro. Se o link não carregar, consulte o site oficial para ver a entrada atual.',
      ],
    },
  ],
} satisfies PageData;
