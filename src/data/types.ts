export type LocaleCode = 'en' | 'es' | 'pt';

export interface FaqItem {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;
  paragraphs: string[];
}

export interface OfficialEntry {
  title: string;
  label: string;
  href: string;
}

export interface PageData {
  path: string;
  locale: LocaleCode;
  title: string;
  description: string;
  h1: string;
  lead: string;
  breadcrumbName: string;
  officialLabel?: string;
  aboutDescription: string;
  entryCard?: string;
  officialEntries?: OfficialEntry[];
  sections: ContentSection[];
}
