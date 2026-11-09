import { site } from '../data/site';
import type { FaqItem, LocaleCode } from '../data/types';
import { absolute, asset } from './url';

interface Breadcrumb {
  name: string;
  path: string;
}

interface AboutGame {
  name: string;
  officialSite: string;
  description: string;
}

interface GraphInput {
  path: string;
  title: string;
  description: string;
  inLanguage: LocaleCode;
  isHome?: boolean;
  breadcrumbs?: Breadcrumb[];
  faq?: FaqItem[];
  aboutGame?: AboutGame;
}

export function buildGraph(input: GraphInput) {
  const pageUrl = absolute(input.path);
  const organizationId = absolute('/') + '#org';
  const websiteId = absolute('/') + '#site';
  const pageId = pageUrl + '#webpage';
  const graph: Record<string, unknown>[] = [];

  if (input.isHome) {
    graph.push(
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.siteName,
        url: absolute('/'),
        logo: asset('/logo-512.png'),
        description: 'Independent explanations of daily puzzle game modes, official entries and player-facing names.',
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: absolute('/'),
        name: site.siteName,
        inLanguage: site.defaultLocale,
        publisher: { '@id': organizationId },
      },
    );
  }

  const page: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: input.title,
    description: input.description,
    isPartOf: { '@id': websiteId },
    publisher: { '@id': organizationId },
    inLanguage: input.inLanguage,
  };

  if (input.isHome) {
    page.about = { '@id': organizationId };
  }

  if (input.breadcrumbs?.length) {
    const breadcrumbId = pageUrl + '#breadcrumb';
    page.breadcrumb = { '@id': breadcrumbId };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: input.breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: absolute(breadcrumb.path),
      })),
    });
  }

  if (input.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': pageUrl + '#faq',
      mainEntity: input.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
  }

  if (input.aboutGame) {
    const gameId = input.aboutGame.officialSite + '#videogame';
    page.about = { '@id': gameId };
    graph.push({
      '@type': 'VideoGame',
      '@id': gameId,
      name: input.aboutGame.name,
      url: input.aboutGame.officialSite,
      description: input.aboutGame.description,
    });
  }

  graph.splice(input.isHome ? 2 : 0, 0, page);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
