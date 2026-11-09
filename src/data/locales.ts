import { routes } from './site';
import type { LocaleCode } from './types';

export const locales: Record<LocaleCode, { code: LocaleCode; pathPrefix: string; htmlLang: string; label: string; switchLabel: string }> = {
  en: { code: 'en', pathPrefix: '', htmlLang: 'en', label: 'English', switchLabel: 'Language' },
  es: { code: 'es', pathPrefix: '/es', htmlLang: 'es', label: 'Español', switchLabel: 'Idioma' },
  pt: { code: 'pt', pathPrefix: '/pt', htmlLang: 'pt', label: 'Português', switchLabel: 'Idioma' },
};

export const unlimitedLanguages = [
  { code: 'en' as const, path: routes.unlimited },
  { code: 'es' as const, path: routes.unlimitedEs },
  { code: 'pt' as const, path: routes.unlimitedPt },
];

export const unlimitedAlternates = [
  ...unlimitedLanguages.map(({ code, path }) => ({ hreflang: code, path })),
  { hreflang: 'x-default', path: routes.unlimited },
];
