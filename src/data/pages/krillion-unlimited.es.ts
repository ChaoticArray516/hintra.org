import { routes } from '../site';
import type { PageData } from '../types';

export const unlimitedEs = {
  path: routes.unlimitedEs,
  locale: 'es',
  title: 'Krillion Unlimited: THE ENDLESS DIVE explicado',
  description: 'Los jugadores dicen Krillion Unlimited; el juego lo llama THE ENDLESS DIVE. Qué es el modo y dónde está la entrada oficial en krillion.io.',
  h1: 'Krillion Unlimited es el nombre que usan los jugadores para THE ENDLESS DIVE',
  lead: 'Dos nombres describen el mismo modo de Krillion. El juego lo presenta como THE ENDLESS DIVE; en buscadores y foros, los jugadores escriben Krillion Unlimited. Esta página explica esa diferencia.',
  breadcrumbName: 'Krillion Unlimited',
  officialLabel: 'Abrir Krillion Unlimited en krillion.io',
  aboutDescription: 'Un juego de puzles diario de krillion.io. Esta página cubre su modo sin fin, que el juego etiqueta como THE ENDLESS DIVE.',
  sections: [
    {
      heading: 'Por qué el nombre de la página no coincide con el de los jugadores',
      paragraphs: [
        'Krillion etiqueta este modo como THE ENDLESS DIVE. Los jugadores, en cambio, suelen escribir "unlimited" al buscarlo. No son dos modos: uno es el nombre oficial y el otro es una forma abreviada de referirse al mismo. Esta página usa ambos nombres para dejar clara la relación, sin inventar reglas que el juego no publica.',
      ],
    },
    {
      heading: 'One in a Krillion y otros nombres que la gente busca',
      paragraphs: [
        'One in a Krillion es el título de rareza más alta del juego. La frase procede de una línea de Happy Feet Two (2011) y el juego la usa para nombrar ese nivel. En búsquedas también aparecen "One in a Krillion unlimited", "One in a Krillion game" y "One in a Krillion multiplayer". Se incluyen como formas que escriben los jugadores, no como prueba de funciones. Esta página no ha verificado que exista un modo multijugador ni una relación entre multiplayer y THE ENDLESS DIVE.',
      ],
    },
    {
      heading: 'Dónde está la entrada oficial',
      paragraphs: [
        'El modo se abre en krillion.io/unlimited/classic, dentro del sitio oficial. Hintra no lo aloja, no lo replica y no lo muestra dentro de un marco. Si el enlace no carga, consulta el sitio oficial para ver la entrada actual.',
      ],
    },
  ],
} satisfies PageData;
